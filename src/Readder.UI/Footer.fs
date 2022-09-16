module Readder.UI.Footer

open Lit

let view =
    html
        $"""
        <footer class="flex items-start sm:justify-center flex-col sm:flex-row p-5 text-gray-600 dark:text-gray-400">
            <div class="sm:border-r-2 border-gray-700 pr-2">
                Made with ❤️ by Fran González (<a target="_blank" href="https://github.com/sleepyfran">@sleepyfran</a>)
            </div>
            <div class="sm:ml-2">
                <a target="_blank" href="https://github.com/sleepyfran/readder">Source code</a>
            </div>
        </footer>
        """
