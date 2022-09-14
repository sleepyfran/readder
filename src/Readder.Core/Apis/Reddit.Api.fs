module Readder.Core.Apis.Reddit

open Fable.SimpleHttp
open Readder.Core.Types

module Endpoints =
    let baseUrl = "https://www.reddit.com"

    let subredditUrl name = $"{baseUrl}/r/{name}"

    let subredditPostsUrl name limit =
        $"{subredditUrl name}/hot/.json?limit={limit}"

[<Literal>]
let private REDDIT_API_SAMPLE =
    "https://reddit.com/r/nosleep/hot/.json?limit=5"

type private ApiResponse = Fable.JsonProvider.Generator<REDDIT_API_SAMPLE>

let private parsePosts subreddit response =
    let parsedResponse = ApiResponse(response)

    match parsedResponse.data with
    | data when Array.isEmpty data.children -> Error RequestError.EmptyResponse
    | data ->
        data.children
        |> Array.map (fun child ->
            let post = child.data

            { Title = post.title
              Community = Reddit
              Content = post.selftext
              Html = post.selftext_html :?> string
              Url = post.url
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
