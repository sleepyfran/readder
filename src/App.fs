module Readder.App

open Elmish
open Readder.AppTypes
open Readder.Screens
open Readder.Screens.Root

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
    match state.CurrentScreen with
    | Screen.Home -> Home.render state.HomeState (HomeCommand >> dispatch)
