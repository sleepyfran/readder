module Readder.AppTypes

open Readder.Screens
open Readder.Screens.Root

/// Defines the common, global app state.
type AppState =
    {
      (* Global state. *)
      CurrentScreen: Screen

      (* Screen states. *)
      HomeState: Home.State }

/// Defines all available commands in the whole app, namespaced by the
/// originating screen.
type AppCommand = HomeCommand of Home.Command
