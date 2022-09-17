module Readder.Core.Connectors

open Readder.Core.Types
open Readder.Core.Apis
open Readder.Core.ReadingTime

/// Returns the name of the given community.
let nameOf community =
    match community with
    | Reddit -> "reddit"

/// Returns the keyword associated with a given community.
let keywordOf community =
    match community with
    | Reddit -> "r/"

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

/// Retrieves the posts that match the given options.
let fetchPosts (options: Options) =
    let apiRequest =
        match options.Community with
        | Reddit -> Reddit.fetchPosts options.Subcommunity

    async {
        let! postsResult = apiRequest

        return
            match postsResult with
            | Ok posts ->
                let possiblePosts =
                    posts
                    |> List.filter (fun post ->
                        post.Content <> ""
                        && minutesToRead post <= options.AvailableMinutes)

                if List.isEmpty possiblePosts then
                    Error PostLoadError.NoResults
                else
                    Ok possiblePosts
            | Error err -> PostLoadError.RequestError err |> Error
    }
