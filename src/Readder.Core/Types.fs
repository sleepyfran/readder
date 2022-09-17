module Readder.Core.Types

/// Defines all available communities that we support.
type Community = | Reddit

/// Defines all communities available.
let communities = [ Reddit ]

/// Options that are asked to the user to customize the reading experience.
type Options =
    { Community: Community
      Subcommunity: string
      AvailableMinutes: int }

/// Errors that can happen while trying to get to a service.
[<RequireQualifiedAccess>]
type RequestError =
    | EmptyResponse
    | NotReachable

/// Errors that can happen while trying to fetch posts.
[<RequireQualifiedAccess>]
type PostLoadError =
    | NoResults
    | RequestError of RequestError

/// Defines a post that can be shown to the user.
type Post =
    { Title: string
      Community: Community
      Content: string
      Html: string
      Url: string
      CommunityUrl: string }
