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
        <div class="flex justify-center">
            <p class="mx-10 text-2xl place-content-center">
                I have
                <input 
                    class="inline-block w-12 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none bg-transparent placeholder-slate-400 rounded-md py-2 pl-1"
                    placeholder="5"
                    type="number"
                    value={state.SelectedMinutes}
                    @input={EvVal(HomeCommand.ChangeSelectedMinutes >> dispatch)} />
                minutes to read from
            </p>
        </div>
        """
