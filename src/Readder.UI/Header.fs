module Readder.UI.Header

open Lit

let view =
    html
        $"""
        <div class="text-4xl p-10 text-center sm:text-left font-medium underline underline-offset-4">
            <a href="./">Readder</a>
        </div>
        """
