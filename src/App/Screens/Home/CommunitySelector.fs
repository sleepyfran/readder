[<RequireQualifiedAccess>]
module Readder.Screens.Components.CommunitySelector

open Browser.Types
open Core.Connectors
open Core.Math
open Core.Types
open Elmish
open Lit

type State =
    {
      /// Current value of the input.
      Input: string
      /// Currently selected community to read from.
      SelectedCommunity: Community option
      /// Currently selected index in the suggestions list.
      SuggestionsSelectedIndex: int
      /// List of available suggestions.
      Suggestions: Community list }

[<RequireQualifiedAccess>]
type Command =
    | OnInput of input: string
    | OnArrowUp
    | OnArrowDown
    | OnEnter
    | OnBackspace of input: string
    | OnHover of index: int
    | SuggestionsChanged of suggestions: Community list
    | SuggestionSelected of suggestion: Community

let init =
    { Input = ""
      SelectedCommunity = None
      SuggestionsSelectedIndex = 0
      Suggestions = [] }

let update state cmd =
    match cmd with
    | Command.OnInput input ->
        printfn $"Entering on input with {input}"

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
            { state with SelectedCommunity = None }, Cmd.none
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
            Suggestions = [] },
        Cmd.ofMsg clearInputCmd

let private suggestionItemView dispatch selectedIndex communityIndex community =
    let classes =
        Lit.classes [ "group text-2xld text-white hover:bg-slate-800 dark:hover:bg-slate-500 w-full text-start p-2 rounded-md",
                      true
                      "bg-slate-800 dark:bg-slate-500",
                      selectedIndex = communityIndex ]

    html
        $"""
        <button
            class={classes}
            @mouseover={fun () -> Command.OnHover communityIndex |> dispatch}
            @click={Ev(fun _ -> Command.SuggestionSelected community |> dispatch)}>
            <span class="font-bold">{keywordOf community}</span>
            <span class="font-light">{nameOf community}</span>
        </button>
        """

let private suggestionsView state dispatch =
    if List.isEmpty state.Suggestions
       || state.SelectedCommunity.IsSome then
        Lit.nothing
    else
        html
            $"""
            <div class="flex flex-col items-start bg-slate-400 rounded-xl p-4 mt-1 dark:bg-slate-800" role="menu">
                <p class="text-gray-200">Suggestions:</p>
                {state.Suggestions
                 |> List.mapi (fun index community ->
                     suggestionItemView dispatch state.SuggestionsSelectedIndex index community)}
            </div>
            """

[<HookComponent>]
let view state dispatch =
    let selectedCommunity =
        match state.SelectedCommunity with
        | Some community ->
            html
                $"""
                <div class="inline-block border-2 border-teal-600 rounded-full px-5">
                    {keywordOf community}
                </div>
                """
        | None -> Lit.nothing

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
        <div>
            <div class="w-full border-b-2 border-slate-900 dark:border-white text-2xl">
                {selectedCommunity}
                <input
                    class="appearance-none bg-transparent focus:outline-none placeholder-slate-400 py-2 dark:ring-white w-40 md:w-64"
                    type="text"
                    autocorrect="off"
                    autocomplete="off"
                    placeholder={placeholder}
                    {Lit.refValue inputRef}
                    @keyup={Ev onKeyUp} />
            </div>

            {suggestionsView state dispatch}
        </div>
        """
