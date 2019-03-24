import { transform } from './reddit.adapter'

const baseUrl = 'https://www.reddit.com'

/**
 * Utility functions to generate endpoints to the Reddit API.
 */
const generateUrl = {
    forSubreddit: (name, sortBy, limit) => `${baseUrl}/r/${name}/${sortBy}/.json?limit=${limit}`,
    forAutocomplete: (query) => `${baseUrl}/api/subreddit_autocomplete_v2/.json?query=${query}`
}

export const sortByFilters = {
    hot: 'hot',
    new: 'new',
    controversial: 'controversial',
    top: 'top',
    rising: 'rising'
}

/**
 * Fetches posts from the specified subreddit and applies the passed function on the raw JSON data.
 *
 * @param {string} name subreddit name to fetch the posts from.
 * @param {string} sortBy type of sorting applied to the posts.
 * @param {number} limit max number of posts to retrieve.
 */
export const subredditPosts = (name, sortBy, limit = 20) => {
    const url = generateUrl.forSubreddit(name, sortBy, limit)

    return fetch(url)
        .then(response => response.json())
        .then(json => transform(json))
}

export const subredditAutocompletion = (query) => {
    return fetch(endpoint.autocomplete(query))
}

export default { sortByFilters, subredditPosts, subredditAutocompletion }