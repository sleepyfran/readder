import { isEmpty } from 'lodash'
import Post from '@common/post.model'

const MALFORMED_ERROR = 'The provided JSON is not a valid object'

/**
 * Transforms the JSON data into an array of posts.
 *
 * @param {string} json data to transform.
 */
export const transform = (json) => {
    if (!json) throw MALFORMED_ERROR
    if (!json.data) throw MALFORMED_ERROR
    if (!json.data.children) throw MALFORMED_ERROR

    const results = json.data.children
    if (isEmpty(results)) return []

    return results
        .map(postInfo => {
            const post = postInfo.data
            if (!post) throw MALFORMED_ERROR

            return Post.create(
                post['title'],
                `r/${post['subreddit']}`,
                post['selftext'],
                post['selftext_html'],
                post['url'],
                `https://reddit.com/r/${post['subreddit']}`,
            )
        })
}

export default { transform }