import { redditConnector } from '@infrastructure/reddit/reddit.connector.js'
import { load } from './posts'
import UnrecognizedService from '@common/unrecognized-service.error'

/**
 * Abstracts the use of the different communities of the application. Tries to fetch the posts from the given
 * community with the given filters.
 *
 * @param {Object} filter Number of available minutes to read, community, subcommunity and any extra data that the
 * service needs (such as sort by options for reddit, etc.).
 * @param {() => Array} onSuccess Callback for when the content is retrieved successfully.
 * @param {(error: Error) => void} onError Callback for when there was an error retrieving the content.
 * @param {() => void} onNoResults Callback for when the result set is empty.
 */
export const loadFrom = (filter, onSuccess, onError, onNoResults) => {
    switch (filter.community) {
    case 'reddit':
        return load(
            () => redditConnector(filter),
            filter.minutes,
            onSuccess,
            onError,
            onNoResults,
        )
    default:
        return Promise.reject(new UnrecognizedService)
    }
}

export default { loadFrom }