module Readder.Core.Connectors

open Readder.Core.Types

/// Returns the name of the given community.
let nameOf community =
    match community with
    | Reddit -> "reddit"
    | DevTo -> "dev.to"

/// Returns the keyword associated with a given community.
let keywordOf community =
    match community with
    | Reddit -> "r/"
    | DevTo -> "dev#"

/// Retrieves all matching communities given either a name or a keyword.
let suggestionsFor (query: string) =
    if query = "" then
        []
    else
        communities
        |> List.filter (fun community ->
            let lowercaseQuery = query.ToLower()

            (nameOf community).Contains(lowercaseQuery)
            || (keywordOf community).Contains(lowercaseQuery))
