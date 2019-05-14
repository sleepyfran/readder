import { transform } from './devto.adapter'

const baseUrl = 'https://dev.to/api'

/**
 * Utility functions to generate endpoints to the Dev.to API.
 */
const generateUrl = {
    forArticles: tag => {
        const url = `${baseUrl}/articles`

        if (tag) return `${url}?tag=${tag}`
        return url
    },
    forArticle: id => `${baseUrl}/articles/${id}`,
}

/**
 * Transform each of the given post information into the full JSON content of the
 * real posts.
 * @param {Array} posts Posts retrieved from the articles endpoint.
 */
const loadPostsContent = posts => {
    return Promise.all(
        posts
            .filter(post => post['type_of'] === 'article') // Remove posts that are not articles.
            .map(post => generateUrl.forArticle(post.id))
            .map(url => fetch(url).then(response => response.json())),
    )
}

/**
 * Fetches posts from the specified tag and applies the transform function on the raw JSON data.
 * @param {string} tag Specific tag from which we want the posts.
 */
export const posts = tag => {
    const url = generateUrl.forArticles(tag)

    return fetch(url)
        .then(response => response.json())
        .then(posts => loadPostsContent(posts))
        .then(posts => transform(posts, tag))
}

export default { posts }
