import { isEmpty } from 'lodash'
import Post from '@common/post.model'
import MalformedData from '@common/malformed-data.error'

const MALFORMED_ERROR = 'The provided JSON is not a valid object'

const formatTagName = tagName => {
    return `#/${tagName}`
}

const generateTagUrl = tagName => {
    return `https://dev.to/t/${tagName}`
}

/**
 * Transforms the JSON data into an array of posts.
 *
 * @param {Array} posts List of posts to transform.
 */
export const transform = (posts, tag) => {
    if (isEmpty(posts)) return []

    console.log(posts)

    return posts.map(p => {
        const htmlBody = p['body_html']
        return Post.create(p['title'], formatTagName(tag), htmlBody, htmlBody, p['url'], generateTagUrl(tag))
    })
}

export default { transform }
