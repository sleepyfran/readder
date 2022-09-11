module Main

Fable.Core.JsInterop.importSideEffects "./styles.css"

open Elmish

open Lit
open Lit.Elmish

type State = { counter: int; name: string }

type Msg =
    | Increment
    | Decrement
    | Reset

let private init _ = { counter = 0; name = "World" }

let private update msg state =
    match msg with
    | Increment ->
        { state with
              counter = state.counter + 1 }
    | Decrement ->
        { state with
              counter = state.counter - 1 }
    | Reset -> init state


let private counter
    (props: {| counter: int
               decrement: unit -> unit
               reset: unit -> unit
               increment: unit -> unit |})
    =
    html
        $"""
        <button @click={fun _ -> props.decrement ()}>-</button>
        <button @click={fun _ -> props.reset ()}>Reset</button>
        <button @click={fun _ -> props.increment ()}>+</button>
        <div>{props.counter}</div>
        """

let view state dispatch =
    let counterEl =
        counter
            {| counter = state.counter
               decrement = fun _ -> dispatch Decrement
               increment = fun _ -> dispatch Increment
               reset = fun _ -> dispatch Reset |}

    html
        $"""
        <div>Hello {state.name}!</div>
        {counterEl}
        """


Program.mkSimple init update view
|> Program.withLit "elmish-lit"
|> Program.run
