module Readder.Main

open Elmish
open Lit.Elmish

Fable.Core.JsInterop.importSideEffects "./styles.css"

Program.mkProgram App.init App.update App.view
|> Program.withLit "elmish-lit"
|> Program.run
