[<RequireQualifiedAccess>]
module Readder.UI.Screens.Reader

open Lit
open Readder.Core.Types
open System.Text.RegularExpressions

type State = { Posts: Post list }

let init = { Posts = [] }

let render state dispatch =
    let post = state.Posts |> List.head

    let newLines = Regex("\n")

    (* Replace new lines with br tags and generate HTML from it. *)
    let postContent =
        newLines.Replace(post.Content, "<br/>")
        |> LitBindings.unsafeHTML

    (* TODO: Allow to navigate posts. *)
    html
        $"""
        <div class="flex flex-col mx-5 lg:mx-32 xl:mx-49 2xl:mx-96 mb-10">
            <h1 class="text-2xl font-bold">{post.Title}</h1>
            <div class="flex gap-x-5">
                <a target="_blank" href={post.Url}>Open post</a>
                <a target="_blank" href={post.CommunityUrl}>Open community</a>
            </div>

            <p class="mt-10">{postContent}</p>
        </div>
        """
