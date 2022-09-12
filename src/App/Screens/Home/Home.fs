[<RequireQualifiedAccess>]
module Readder.Screens.Home

open Elmish
open Lit
open Readder.Screens.Home.Components
open Readder.Screens.Home.Components.CommonTypes

type State =
    { SelectedMinutes: int
      CommunityChoiceState: CommunitySelector.State }

[<RequireQualifiedAccess>]
type Command =
    | ChangeSelectedMinutes of input: string
    | CommunityChoiceCommand of CommunitySelector.Command

let init =
    { SelectedMinutes = 5
      (* Sub-component states. *)
      CommunityChoiceState = CommunitySelector.init }

let update state cmd =
    match cmd with
    | Command.ChangeSelectedMinutes mins ->
        match System.Int32.TryParse mins with
        | true, mins -> { state with SelectedMinutes = mins }, Cmd.none
        | _ -> state, Cmd.none
    | Command.CommunityChoiceCommand cmd ->
        let nextState, nextCmd =
            CommunitySelector.update state.CommunityChoiceState cmd

        let selectorState =
            { state with CommunityChoiceState = nextState }

        let selectorCmd =
            Cmd.map Command.CommunityChoiceCommand nextCmd

        selectorState, selectorCmd

let render state dispatch =
    html
        $"""
        <div class="flex flex-col m-10 sm:m-0 sm:items-center">
            <p class="text-2xl place-content-center">
                I have
                <input
                    class="inline-block w-12 border-b-2 border-gray-900 dark:border-white text-center focus:outline-none appearance-none bg-transparent placeholder-slate-400 pl-1"
                    placeholder="5"
                    type="number"
                    value={state.SelectedMinutes}
                    @input={EvVal(Command.ChangeSelectedMinutes >> dispatch)} />
                minutes to read from
            </p>
            <div class="mt-5 w-60 sm:w-96">
                {CommunitySelector.view
                     state.CommunityChoiceState
                     (Command.CommunityChoiceCommand >> dispatch)}
            </div>
        </div>
        """
