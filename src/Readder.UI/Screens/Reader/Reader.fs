[<RequireQualifiedAccess>]
module Readder.UI.Screens.Reader

open Elmish
open Lit
open Readder.Core.Types
open Readder.UI.Screens.Components
open System.Text.RegularExpressions

type State =
    { Posts: Post list
      CurrentPostIndex: int }

[<RequireQualifiedAccess>]
type Command =
    | PreviousPost
    | NextPost

let init = { Posts = []; CurrentPostIndex = 0 }

let private scrollToTop () = Browser.Dom.window.scrollTo (0.0, 0.0)

let update state cmd =
    match cmd with
    | Command.PreviousPost ->
        { state with CurrentPostIndex = state.CurrentPostIndex - 1 }, Cmd.none
    | Command.NextPost ->
        { state with CurrentPostIndex = state.CurrentPostIndex + 1 }, Cmd.none

let private render' state dispatch post =
    let newLines = Regex("\n")

    (* Replace new lines with br tags and generate HTML from it. *)
    let postContent =
        newLines.Replace(post.Content, "<br/>")
        |> LitBindings.unsafeHTML

    let postCountText =
        $"{state.CurrentPostIndex + 1} out of {state.Posts.Length}"

    let nextPost =
        state.Posts
        |> List.tryItem (state.CurrentPostIndex + 1)

    let previousPost =
        state.Posts
        |> List.tryItem (state.CurrentPostIndex - 1)

    let previousPostButtonDisabled = previousPost.IsNone
    let nextPostButtonDisabled = nextPost.IsNone

    html
        $"""
        <div class="flex flex-col mx-5 lg:mx-32 xl:mx-49 2xl:mx-96 mb-10">
            <h1 class="text-2xl font-bold">{post.Title}</h1>
            <div class="flex gap-x-5">
                <a target="_blank" href={post.Url}>Open post</a>
                <a target="_blank" href={post.CommunityUrl}>Open community</a>
            </div>

            <p class="mt-10 mb-5">{postContent}</p>

            <div class="flex gap-5 items-center">
                {Button.view'
                     "Previous post"
                     (fun _ -> Command.PreviousPost |> dispatch)
                     previousPostButtonDisabled}
                <p>{postCountText}</p>
                {Button.view'
                     "Next post"
                     (fun _ -> Command.NextPost |> dispatch)
                     nextPostButtonDisabled}
            </div>
        </div>
        """

let render state dispatch =
    let post =
        state.Posts |> List.tryItem state.CurrentPostIndex

    match post with
    | Some post ->
        scrollToTop ()
        render' state dispatch post
    | None ->
        html
            $"""
            <p class="text-red">Hmm, how did you get here? There's nothing to see.</p>
            """
