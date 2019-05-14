import { difference } from 'lodash'

/**
 * Checks if all the keys specified in `keys` are included in `object`.
 * @param {Object} object Object to check.
 * @param {Array} keys Keys to check in `object`.
 */
export const checkKeys = (object, keys) => {
    return difference(keys, Object.keys(object)).length !== 0
}
