import { subredditPosts, sortByFilters } from './reddit.api'

/**
 * Abstracts the use of the Reddit API for the service connector.
 *
 * @param {Object} filter Subreddit and sort by option to apply.
 */
export const redditConnector = (filter) => {
    return subredditPosts(filter.subcommunity, filter.options || sortByFilters.hot)
}
