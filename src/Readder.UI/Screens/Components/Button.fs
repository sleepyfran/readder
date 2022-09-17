[<RequireQualifiedAccess>]
module Readder.UI.Screens.Components.Button

open Lit

let view' text onClick disabled =
    html
        $"""
        <button
            ?disabled={disabled}
            class="px-6 h-12 font-semibold border-2 border-black dark:border-white rounded-md bg-teal-400 hover:bg-teal-500 active:bg-teal-200 disabled:text-gray-200 disabled:bg-gray-400 text-black"
            @click={Ev onClick}>
            {text}
        </button>
        """

let view text onClick =
    view' text onClick false
