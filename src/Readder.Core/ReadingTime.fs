module Readder.Core.ReadingTime

open Readder.Core.Types

let private countWords post = post.Content.Split(' ').Length

let private averageWordsPerMinute = 200

/// Calculates an estimate of how much it would take to read the given post
/// based on the average person's words per minute.
let minutesToRead post = countWords post / averageWordsPerMinute
