import { minutesToRead } from '@services/reading-time'
import { orderBy, isEmpty } from 'lodash'

/**
 * Queries the specified subreddit for posts and filters by the number of minutes that the user can read.
 *
 * @param {() => Promise)} connector Connector to call when retrieving the posts.
 * @param Number availableMinutes Number of available minutes specified by the user.
 * @param {(posts: []) => void} onSuccess Callback for when the posts are retrieved successfully.
 * @param {(error) => void} onError Callback for when the posts could not be retrieved.
 * @param {() => void} onNoResults Callback for when the result set is empty.
 */
export const load = (connector, availableMinutes, onSuccess, onError, onNoResults) => {
    return connector()
        .then(posts => {
            const possiblePosts = posts.filter(p => !isEmpty(p.content) && minutesToRead(p.content) <= availableMinutes)
            if (isEmpty(possiblePosts)) return onNoResults()

            const postsByLength = orderBy(possiblePosts, [post => minutesToRead(post.content)], ['desc'])
            return onSuccess(postsByLength)
        })
        .catch(error => {
            return onError(error)
        })
}

export default { load }
