import { sortByFilters, subredditPosts } from '@infrastructure/reddit-api'
import { postsFromJson } from '@infrastructure/reddit-adapters'
import { minutesToRead } from '@services/reading-time'
import { shuffle } from 'lodash'

/**
 * Queries the specified subreddit for posts and filters by the number of minutes that the user can read.
 *
 * @param {Object} filter contains the minutes and the subreddit specified by the user.
 * @param {(posts: []) => void} onSuccess callback for when the posts are retrieved successfully.
 * @param {(error) => void} onError callback for when the posts could not be retrieved.
 * @param {() => void} onNoResults callback for when the result set is empty.
 */
const load = (filter, onSuccess, onError, onNoResults) => {
    return subredditPosts(filter.subreddit, sortByFilters.hot, postsFromJson)
        .then(posts => {
            const possiblePosts = posts.filter(p => minutesToRead(p.content) <= filter.minutes)
            if (possiblePosts.length === 0) return onNoResults()

            const randomizedPosts = shuffle(possiblePosts)
            return onSuccess(randomizedPosts)
        })
        .catch(error => {
            return onError(error)
        })
}

export default { load }