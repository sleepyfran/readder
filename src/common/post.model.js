/**
 * Creates a post object model.
 *
 * @param {string} title Title of the post.
 * @param {string} community Community in which the post was posted.
 * @param {string} content Content of the post in plain text.
 * @param {string} html Content of the post in HTML.
 * @param {string} url Url to the post.
 * @param {string} communityUrl Url to the community in which the post was posted.
 */
export const create = (title, community, content, html, url, communityUrl) => {
    return {
        title,
        community,
        content,
        html,
        url,
        communityUrl
    }
}

export default { create }