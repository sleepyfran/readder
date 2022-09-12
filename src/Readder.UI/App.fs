module Readder.UI.App

open Elmish
open Lit
open Readder
open Readder.UI.AppTypes
open Readder.UI.Screens
open Readder.UI.Screens.Root

let init _ =
    { CurrentScreen = Screen.Home
      HomeState = Home.init },
    Cmd.none

let update cmd state =
    match cmd with
    | HomeCommand homeCmd ->
        let homeState, homeCmd = Home.update state.HomeState homeCmd
        let appState = { state with HomeState = homeState }
        let appCmd = Cmd.map HomeCommand homeCmd
        appState, appCmd

let view state dispatch =
    let mainView =
        match state.CurrentScreen with
        | Screen.Home -> Home.render state.HomeState (HomeCommand >> dispatch)

    html
        $"""
        <div class="h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            {Header.view}
            {mainView}
        </div>
        """
