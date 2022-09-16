[<RequireQualifiedAccess>]
module Readder.UI.Screens.Home.Components.SelectedCommunity

open Readder.Core.Connectors
open Lit
open Readder.UI.Screens.Home.Components.CommonTypes.CommunitySelector

/// Renders a block with the keyword of the currently selected community, if any.
let view state =
    match state.SelectedCommunity with
    | Some community ->
        html
            $"""
            <div class="inline-block border-2 border-teal-600 rounded-full px-5">
                {keywordOf community}
            </div>
            """
    | None -> Lit.nothing