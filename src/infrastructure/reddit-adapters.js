import { isEmpty } from 'lodash'

const MALFORMED_ERROR = 'The provided JSON is not a valid object'

/**
 * Transforms the JSON data into an array of posts.
 *
 * @param {string} json data to transform.
 */
export const postsFromJson = (json) => {
    if (!json) throw MALFORMED_ERROR
    if (!json.data) throw MALFORMED_ERROR
    if (!json.data.children) throw MALFORMED_ERROR

    const results = json.data.children
    if (isEmpty(results)) return []

    return results
        .map(postInfo => {
            const post = postInfo.data
            if (!post) throw MALFORMED_ERROR

            return {
                title: post['title'],
                content: post['selftext'],
                htmlContent: post['selftext_html'],
                url: post['url'],
                subreddit: post['subreddit'],
                subredditUrl: `https://reddit.com/r/${post['subreddit']}`
            }
        })
}

export default { postsFromJson }