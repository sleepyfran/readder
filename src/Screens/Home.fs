module Readder.Screens.Home

open Elmish
open Lit

type HomeState = { SelectedMinutes: int }

[<RequireQualifiedAccess>]
type HomeCommand = ChangeSelectedMinutes of input: string

let init = { SelectedMinutes = 5 }

let update state cmd =
    match cmd with
    | HomeCommand.ChangeSelectedMinutes mins ->
        match System.Int32.TryParse mins with
        | true, mins -> { state with SelectedMinutes = mins }, Cmd.none
        | _ -> state, Cmd.none

let render state dispatch =
    html
        $"""
        <div>
            <p>I have</p>
            <input type="number" @input={EvVal(HomeCommand.ChangeSelectedMinutes >> dispatch)} />
        </div>
        """
