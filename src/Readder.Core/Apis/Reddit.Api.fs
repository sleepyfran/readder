module Readder.Core.Apis.Reddit

open Fable.SimpleHttp
open FSharp.Data
open Readder.Core.Types

module Endpoints =
    let baseUrl = "https://www.reddit.com"

    let subredditUrl name = $"{baseUrl}/r/{name}"

    let subredditPostsUrl name limit =
        $"{subredditUrl name}/hot/.json?limit={limit}"

[<Literal>]
let private REDDIT_API_SAMPLE =
    "https://reddit.com/r/nosleep/hot/.json?limit=10"

type private ApiResponse = JsonProvider<REDDIT_API_SAMPLE, RootName="project">

let private parsePosts subreddit response =
    let parsedResponse = ApiResponse.Parse response

    match parsedResponse.Data with
    | data when Array.isEmpty data.Children -> Error RequestError.EmptyResponse
    | data ->
        data.Children
        |> Array.map (fun child ->
            let post = child.Data

            { Title = post.Title
              Community = Reddit
              Content = post.Selftext |> Option.defaultValue ""
              Html = post.SelftextHtml |> Option.defaultValue ""
              Url = post.Url
              CommunityUrl = Endpoints.subredditUrl subreddit })
        |> List.ofArray
        |> Ok

let fetchPosts subreddit =
    async {
        let! (statusCode, response) =
            Endpoints.subredditPostsUrl subreddit 25
            |> Http.get

        return
            match statusCode with
            | 200 -> parsePosts subreddit response
            | _ -> Error RequestError.NotReachable
    }
