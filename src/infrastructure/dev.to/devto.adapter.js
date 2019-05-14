import { isEmpty } from 'lodash'
import Post from '@common/post.model'
import MalformedData from '@common/malformed-data.error'
import { checkKeys } from '@infrastructure/adapter.utils'

const MALFORMED_ERROR = 'The provided JSON is not a valid object'

const formatTagName = tagName => {
    return `#${tagName}`
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

    return posts.map(post => {
        const containsErrors = checkKeys(post, ['body_html', 'title', 'url'])
        if (containsErrors) throw new MalformedData(MALFORMED_ERROR)

        const htmlBody = post['body_html']
        return Post.create(post['title'], formatTagName(tag), htmlBody, htmlBody, post['url'], generateTagUrl(tag))
    })
}

export default { transform }
