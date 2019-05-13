import { redditConnector } from '@infrastructure/reddit/reddit.connector.js'
import { devtoConnector } from '@infrastructure/dev.to/devto.connector'
import { load } from './posts'
import UnrecognizedService from '@common/unrecognized-service.error'

/**
 * List of services available right now in the app. This will be matched in the getConnectorForCommunity method.
 */
export const services = [
    {
        keyword: 'r/',
        name: 'reddit',
        connector: redditConnector,
    },
    {
        keyword: 'dev#',
        name: 'dev.to',
        connector: devtoConnector,
    },
]

/**
 * Retrieves the connector function for the specified community.
 *
 * @param {Object} filter Number of available minutes to read, community, subcommunity and any extra data that the
 * service needs (such as sort by options for reddit, etc.).
 */
const getConnectorForCommunity = filter => {
    const matchingService = services.find(s => s.name === filter.community)
    if (!matchingService) return () => Promise.reject(new UnrecognizedService())

    return matchingService.connector
}

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
    const connector = getConnectorForCommunity(filter)

    return load(async () => await connector(filter), filter.minutes, onSuccess, onError, onNoResults)
}

export default { services, loadFrom }
