module Core.Types

/// Defines all available communities that we support.
type Community =
    | Reddit
    | DevTo

/// Defines all communities available.
let communities = [ Reddit; DevTo ]
