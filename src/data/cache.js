import time from '@infrastructure/time'

const cache = new Map()

/**
 * Sets a value to the given key with the specified timeToLive. If no timeToLive is given, -1 will be used.
 */
const set = (key, value, timeToLive) => {
    const expireDate = timeToLive ? time.now() + timeToLive : -1

    cache.set(key, {
        value,
        expireDate
    })
}

/**
 * Returns wether the given key exists in the cache.
 */
const has = key => {
    return cache.has(key)
}

/**
 * Returns the value of the give key if it exists.
 */
const get = key => {
    const retrievedElement = cache.get(key)

    if (!retrievedElement) return undefined
    if (hasExpired(retrievedElement)) return undefined

    return retrievedElement.value
}

/**
 * Removes the given key from the cache.
 */
const remove = key => {
    cache.delete(key)
}

const expiredThreshold = 10000
const hasExpired = element => {
    if (element.expireDate === -1) return false
    return element.expireDate - time.now() <= expiredThreshold
}

const invalidateExpiredCache = () => {
    for (let [key, element] of cache) {
        if (hasExpired(element)) {
            cache.delete(key)
        }
    }
}

// Checks every minute if any item from the cache should be removed
const startExpiredCacheCheck = () => {
    const oneMinute = 60000
    setInterval(invalidateExpiredCache, oneMinute)
}

export default { set, has, get, remove, startExpiredCacheCheck }