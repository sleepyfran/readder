module Readder.UI.AppTypes

open Readder.UI.Screens
open Readder.UI.Screens.Root

/// Defines the common, global app state.
type AppState =
    {
      (* Global state. *)
      CurrentScreen: Screen

      (* Screen states. *)
      HomeState: Home.State
      ReaderState: Reader.State }

/// Defines all available commands in the whole app, namespaced by the
/// originating screen.
type AppCommand =
    | HomeCommand of Home.Command
    | ReaderCommand of Reader.Command
