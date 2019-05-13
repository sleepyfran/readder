import { posts } from './devto.api'

/**
 * Abstracts the use of the Dev.to API for the service connector.
 *
 * @param {Object} filter Object containing the subcommunity (tag) and options that are ignored for now.
 */
export const devtoConnector = filter => {
    return posts(filter.subcommunity)
}
