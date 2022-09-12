[<RequireQualifiedAccess>]
module Readder.UI.Screens.Home.Components.Suggestions

open Readder.Core.Connectors
open Lit
open Readder.UI.Screens.Home.Components.CommonTypes.CommunitySelector

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

/// Renders a list of suggestions based on the current state. Each suggestion is
/// navigable by keyboard and selectable by either pressing enter or clicking
/// the entry.
let view state dispatch =
    if List.isEmpty state.Suggestions
       || state.SelectedCommunity.IsSome then
        Lit.nothing
    else
        html
            $"""
            <div class="absolute bg-slate-400 rounded-xl p-4 mt-1 dark:bg-slate-800 w-full" role="menu">
                <p class="text-gray-200">Suggestions:</p>
                {state.Suggestions
                 |> List.mapi (fun index community ->
                     suggestionItemView dispatch state.SuggestionsSelectedIndex index community)}
            </div>
            """
