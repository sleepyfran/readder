const averageWordsPerMinute = 200

/**
 * Counts the number of words inside a given post.
 *
 * @param {*} postContent to count words from.
 */
export const countWords = postContent => {
    return postContent.split(/\W/g).filter(c => c).length
}

/**
 * Calculates the number of minutes it'd take to read the given post.
 *
 * @param {*} postContent input to calculate.
 */
export const minutesToRead = postContent => {
    return countWords(postContent) / averageWordsPerMinute
}

export default { countWords, minutesToRead }
