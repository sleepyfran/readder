module Readder.Core.Apis.DevTo

module Endpoints =
    let baseUrl = "https://dev.to/api"

    let articles tag = $"{baseUrl}/articles?tag={tag}"
    let article id = $"{baseUrl}/articles/${id}"
