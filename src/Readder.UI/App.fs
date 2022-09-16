module Readder.UI.App

open Elmish
open Lit
open Readder.UI.AppTypes
open Readder.UI.Screens
open Readder.UI.Screens.Root

let init _ =
    { CurrentScreen = Screen.Home
      HomeState = Home.init
      ReaderState = Reader.init },
    Cmd.none

let update cmd state =
    match cmd with
    | HomeCommand (Home.Command.PostsLoaded posts) ->
        (* Listen to home's posts loaded to know when we can show the reader screen. *)
        { state with
            CurrentScreen = Screen.Reader
            ReaderState = { state.ReaderState with Posts = posts } },
        Cmd.none
    | HomeCommand homeCmd ->
        let homeState, homeCmd = Home.update state.HomeState homeCmd
        let appState = { state with HomeState = homeState }
        let appCmd = Cmd.map HomeCommand homeCmd
        appState, appCmd

let view state dispatch =
    let mainView =
        match state.CurrentScreen with
        | Screen.Home -> Home.render state.HomeState (HomeCommand >> dispatch)
        | Screen.Reader _ -> Reader.render state.ReaderState dispatch

    html
        $"""
        <div class="flex flex-col min-h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            {Header.view}
            <main class="flex-grow">
                {mainView}
            </main>
            {Footer.view}
        </div>
        """
