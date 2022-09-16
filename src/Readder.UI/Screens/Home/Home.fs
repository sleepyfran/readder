[<RequireQualifiedAccess>]
module Readder.UI.Screens.Home

open Elmish
open Lit
open Readder.UI.Screens.HomeComponents
open Readder.UI.Screens.HomeComponents.CommonTypes
open Readder.Core.Connectors
open Readder.Core.Types

[<RequireQualifiedAccess>]
type UiState =
    | Initial
    | Loading
    | Errored of error: PostLoadError

type State =
    { UiState: UiState
      SelectedMinutes: int
      CommunityChoiceState: CommunitySelector.State }

[<RequireQualifiedAccess>]
type Command =
    | ChangeSelectedMinutes of input: string
    | CommunityChoiceCommand of CommunitySelector.Command
    | LoadPosts
    | PostsLoaded of posts: Post list
    | PostsErrored of error: PostLoadError

let init =
    { UiState = UiState.Initial
      SelectedMinutes = 5
      (* Sub-component states. *)
      CommunityChoiceState = CommunitySelector.init }

let private optionsFromState state =
    { AvailableMinutes = state.SelectedMinutes
      (* We can't execute load posts without a community selected. *)
      Community =
          state.CommunityChoiceState.SelectedCommunity
          |> Option.get
      Subcommunity = state.CommunityChoiceState.Input }

let private canShowPosts state =
    state.CommunityChoiceState.SelectedCommunity.IsSome
    && state.CommunityChoiceState.Input <> ""
    && state.UiState <> UiState.Loading

let private processCommunityChoiceCommand state cmd =
    let nextState, nextCmd =
        CommunitySelector.update state.CommunityChoiceState cmd

    let selectorState =
        { state with CommunityChoiceState = nextState }

    let selectorCmd =
        Cmd.map Command.CommunityChoiceCommand nextCmd

    selectorState, selectorCmd

let update state cmd =
    match cmd with
    | Command.ChangeSelectedMinutes mins ->
        match System.Int32.TryParse mins with
        | true, mins -> { state with SelectedMinutes = mins }, Cmd.none
        | _ -> state, Cmd.none
    | Command.CommunityChoiceCommand CommunitySelector.Command.OnEnter ->
        (*
            Presses on enter when a community and subcommunity are already
            selected means we should load the posts!
        *)
        if state |> canShowPosts then
            state, Command.LoadPosts |> Cmd.ofMsg
        else
            processCommunityChoiceCommand
                state
                CommunitySelector.Command.OnEnter
    | Command.CommunityChoiceCommand cmd ->
        processCommunityChoiceCommand state cmd
    | Command.LoadPosts ->
        let dispatchLoadedPosts dispatch =
            async {
                let! postResult = optionsFromState state |> fetchPosts

                match postResult with
                | Ok posts -> Command.PostsLoaded posts
                | Error err -> Command.PostsErrored err
                |> dispatch
            }
            |> Async.StartImmediate

        { state with UiState = UiState.Loading }, Cmd.ofSub dispatchLoadedPosts
    | Command.PostsLoaded _ ->
        (* This command will be intercepted by the app to navigate to the reader screen. *)
        { state with UiState = UiState.Initial }, Cmd.none
    | Command.PostsErrored error ->
        { state with UiState = UiState.Errored error }, Cmd.none

let private errorView state =
    match state.UiState with
    | UiState.Errored error ->
        let msg =
            match error with
            | PostLoadError.NoResults ->
                "Your selection retrieved no results. Try a different community/subcommunity combination or increase the time limit."
            | PostLoadError.RequestError _ ->
                "We were unable to contact the community you provided. Maybe try again later."

        html
            $"""
            <p class="text-red-500 font-bold">{msg}</p>
            """
    | _ -> Lit.nothing

let render state dispatch =
    let disableShowMeButton = state |> canShowPosts |> not

    let showMeButtonText =
        if state.CommunityChoiceState.SelectedCommunity.IsNone then
            "Choose a community"
        else if state.CommunityChoiceState.Input = "" then
            "Enter a subcommunity"
        else if state.UiState = UiState.Loading then
            "Loading..."
        else
            "Show me!"

    html
        $"""
        <div class="flex flex-col m-10 sm:m-0 sm:items-center">
            <p class="text-2xl place-content-center">
                I have
                <input
                    class="inline-block w-12 border-b-2 border-gray-900 dark:border-white text-center focus:outline-none appearance-none bg-transparent placeholder-slate-400 pl-1"
                    placeholder="5"
                    type="number"
                    value={state.SelectedMinutes}
                    @input={EvVal(Command.ChangeSelectedMinutes >> dispatch)} />
                minutes to read from
            </p>
            <div class="mt-5 w-60 sm:w-96">
                {CommunitySelector.view
                     state.CommunityChoiceState
                     (Command.CommunityChoiceCommand >> dispatch)}
            </div>

            <button
                ?disabled={disableShowMeButton}
                class="mt-5 px-6 h-12 font-semibold border-2 border-black dark:border-white rounded-md bg-teal-400 hover:bg-teal-500 active:bg-teal-200 disabled:text-gray-200 disabled:bg-gray-400 text-black"
                @click={Ev(fun _ -> dispatch Command.LoadPosts)}>
                {showMeButtonText}
            </button>

            <div class="mt-10">
                {errorView state}
            </div>
        """
