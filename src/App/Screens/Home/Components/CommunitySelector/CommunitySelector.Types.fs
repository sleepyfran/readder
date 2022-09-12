module Readder.Screens.Home.Components.CommonTypes

open Core.Types

module CommunitySelector =
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
