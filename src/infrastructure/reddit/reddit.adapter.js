import { isEmpty } from 'lodash'
import Post from '@common/post.model'
import MalformedData from '@common/malformed-data.error'

const MALFORMED_ERROR = 'The provided JSON is not a valid object'

const error = () => {
    throw new MalformedData(MALFORMED_ERROR)
}

const formatSubredditName = (subredditName) => {
    return `r/${subredditName}`
}

const generateSubredditUrl = (subredditName) => {
    return `https://reddit.com/r/${subredditName}`
}

/**
 * Transforms the JSON data into an array of posts.
 *
 * @param {string} json data to transform.
 */
export const transform = (json) => {
    if (!json) error()
    if (!json.data) error()
    if (!json.data.children) error()

    const results = json.data.children
    if (isEmpty(results)) return []

    return results
        .map(postInfo => {
            const post = postInfo.data
            if (!post) error()

            const subredditName = post['subreddit']
            return Post.create(
                post['title'],
                formatSubredditName(subredditName),
                post['selftext'],
                post['selftext_html'],
                post['url'],
                generateSubredditUrl(subredditName),
            )
        })
}

export default { transform }