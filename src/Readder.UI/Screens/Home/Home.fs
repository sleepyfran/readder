[<RequireQualifiedAccess>]
module Readder.UI.Screens.Home

open Elmish
open Lit
open Readder.UI.Screens.Home.Components
open Readder.UI.Screens.Home.Components.CommonTypes

type State =
    { SelectedMinutes: int
      CommunityChoiceState: CommunitySelector.State }

[<RequireQualifiedAccess>]
type Command =
    | ChangeSelectedMinutes of input: string
    | CommunityChoiceCommand of CommunitySelector.Command

let init =
    { SelectedMinutes = 5
      (* Sub-component states. *)
      CommunityChoiceState = CommunitySelector.init }

let update state cmd =
    match cmd with
    | Command.ChangeSelectedMinutes mins ->
        match System.Int32.TryParse mins with
        | true, mins -> { state with SelectedMinutes = mins }, Cmd.none
        | _ -> state, Cmd.none
    | Command.CommunityChoiceCommand cmd ->
        let nextState, nextCmd =
            CommunitySelector.update state.CommunityChoiceState cmd

        let selectorState =
            { state with CommunityChoiceState = nextState }

        let selectorCmd =
            Cmd.map Command.CommunityChoiceCommand nextCmd

        selectorState, selectorCmd

let render state dispatch =
    let disableShowMeButton =
        state.CommunityChoiceState.SelectedCommunity.IsNone
        || state.CommunityChoiceState.Input = ""

    let showMeButtonText =
        if state.CommunityChoiceState.SelectedCommunity.IsNone then
            "Choose a community"
        else if state.CommunityChoiceState.Input = "" then
            "Enter a subcommunity"
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

            <button ?disabled={disableShowMeButton} class="mt-5 px-6 h-12 font-semibold border-2 border-black dark:border-white rounded-md bg-teal-400 hover:bg-teal-500 active:bg-teal-200 disabled:text-gray-200 disabled:bg-gray-400 text-black">
                {showMeButtonText}
            </button>
        </div>
        """
