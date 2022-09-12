module Readder.Screens.Home.Components.CommunitySelector

open Browser.Types
open Core.Connectors
open Core.Math
open Readder.Screens.Home.Components.CommonTypes.CommunitySelector
open Elmish
open Lit

let init =
    { Input = ""
      SelectedCommunity = None
      SuggestionsSelectedIndex = 0
      Suggestions = [] }

let update state cmd =
    match cmd with
    | Command.OnInput input ->
        let suggestionCmd =
            match state.SelectedCommunity with
            | None ->
                suggestionsFor input
                |> Command.SuggestionsChanged
                |> Cmd.ofMsg
            | _ -> Cmd.none

        { state with Input = input }, suggestionCmd
    | Command.OnArrowUp ->
        let selectedIndex =
            state.SuggestionsSelectedIndex - 1
            |> clamp 0 (state.Suggestions.Length - 1)

        { state with SuggestionsSelectedIndex = selectedIndex }, Cmd.none
    | Command.OnEnter ->
        let selectedItem =
            state.Suggestions
            |> List.tryItem state.SuggestionsSelectedIndex

        let cmd =
            match selectedItem with
            | Some item -> Command.SuggestionSelected item |> Cmd.ofMsg
            | None -> Cmd.none

        state, cmd
    | Command.OnBackspace input ->
        (*
            Check if the previous input is empty, otherwise we'd remove the
            community in the moment we're removing the last letter.
        *)
        let canRemoveCommunity =
            state.Input = "" && state.SelectedCommunity.IsSome

        if canRemoveCommunity then
            { state with
                SelectedCommunity = None
                SuggestionsSelectedIndex = 0 },
            Cmd.none
        else
            state, Command.OnInput input |> Cmd.ofMsg
    | Command.OnHover index ->
        { state with SuggestionsSelectedIndex = index }, Cmd.none
    | Command.OnArrowDown ->
        let selectedIndex =
            state.SuggestionsSelectedIndex + 1
            |> clamp 0 (state.Suggestions.Length - 1)

        { state with SuggestionsSelectedIndex = selectedIndex }, Cmd.none
    | Command.SuggestionsChanged suggestions ->
        { state with Suggestions = suggestions }, Cmd.none
    | Command.SuggestionSelected suggestion ->
        let clearInputCmd = Command.OnInput ""

        { state with
            SelectedCommunity = Some suggestion
            SuggestionsSelectedIndex = 0
            Suggestions = [] },
        Cmd.ofMsg clearInputCmd

[<HookComponent>]
let view state dispatch =
    let placeholder =
        match state.SelectedCommunity with
        | Some _ -> "Subcommunity"
        | None -> "Community"

    let onKeyUp (event: Event) =
        let ev = event :?> KeyboardEvent
        ev.preventDefault ()

        match ev.key with
        | "ArrowUp" -> dispatch Command.OnArrowUp
        | "ArrowDown" -> dispatch Command.OnArrowDown
        | "Enter" -> dispatch Command.OnEnter
        | "Backspace" -> Command.OnBackspace ev.target.Value |> dispatch
        | _ -> Command.OnInput ev.target.Value |> dispatch

    let inputRef = Hook.useRef<HTMLInputElement> ()

    (*
        FIXME: For some reason setting the `value` property on the input element
        was not enough to update the input content based on the state's property,
        so in here we update it manually on the ref. I might revisit this later (hah).
    *)
    match inputRef.Value with
    | Some input -> input.value <- state.Input
    | None -> ()

    html
        $"""
        <div class="relative">
            <div class="w-full border-b-2 border-slate-900 dark:border-white text-2xl">
                {SelectedCommunity.view state}
                <input
                    class="appearance-none bg-transparent focus:outline-none placeholder-slate-400 py-2 dark:ring-white w-40 md:w-64"
                    type="text"
                    autocorrect="off"
                    autocomplete="off"
                    placeholder={placeholder}
                    {Lit.refValue inputRef}
                    @keyup={Ev onKeyUp} />
            </div>

            {Suggestions.view state dispatch}
        </div>
        """
