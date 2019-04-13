import cache from '@data/cache'
import time from '@infrastructure/time'

/* -- BEFORE and AFTER -- */
// Stub the Date.now method.
beforeEach(() => {
    stubTime()
})

afterEach(() => {
    time.now = Date.now
    retrieveCacheMap().clear()
})

/* -- HELPERS -- */
const stubTime = (date = 0) => {
    time.now = () => date
}

const retrieveCacheMap = () => cache.__GetDependency__('cache')

const testCacheObject = (key, expected) => {
    const cacheObject = retrieveCacheMap()
    const element = cacheObject.get(key)

    if (expected) {
        expect(element).toBeTruthy()
    }

    expect(element).toEqual(expected)
}

const addRandomObject = ttl => {
    const randomObject = {
        key: Math.random(),
        value: Math.random(),
        expireDate: ttl ? ttl : -1,
    }

    cache.set(randomObject.key, randomObject.value, ttl)
    return randomObject
}

/* -- TESTS -- */
describe('set', () => {
    test('should add the element to the cache when it does not exist', () => {
        const testElementWithoutTtl = addRandomObject()
        const testElementWithTtl = addRandomObject(2000)

        testCacheObject(testElementWithoutTtl.key, {
            value: testElementWithoutTtl.value,
            expireDate: testElementWithoutTtl.expireDate,
        })

        testCacheObject(testElementWithTtl.key, {
            value: testElementWithTtl.value,
            expireDate: testElementWithTtl.expireDate,
        })
    })

    test('should modify an element of the cache if the key is present', () => {
        const testElement = addRandomObject()

        testElement.value = 'modified test'
        cache.set(testElement.key, testElement.value)

        testCacheObject(testElement.key, {
            value: testElement.value,
            expireDate: testElement.expireDate,
        })
    })
})

describe('has', () => {
    test('should return if the element is present or not', () => {
        const testElement = addRandomObject()

        expect(cache.has(testElement.key)).toBeTruthy()
        expect(cache.has('non-existent')).toBeFalsy()
    })
})

describe('get', () => {
    test('should return the element if the key is present', () => {
        const testElement = addRandomObject()

        expect(cache.get(testElement.key)).toBeTruthy()
        expect(cache.get(testElement.key)).toEqual(testElement.value)
    })

    test('should return undefined if the key has expired', () => {
        const testElement = addRandomObject(200)
        stubTime(100)

        expect(cache.get(testElement.key)).toBeUndefined()
    })

    test('should return undefined if the key is not present', () => {
        expect(cache.get('non-existent')).toBeUndefined()
    })
})

describe('remove', () => {
    test('should delete the element if they key is present', () => {
        const testElement = addRandomObject()
        cache.remove(testElement.key)

        testCacheObject(testElement.key, undefined)
    })
})

describe('expired cache check', () => {
    test('should remove items every minute after starting', () => {
        jest.useFakeTimers()

        cache.startExpiredCacheCheck()
        const elementToRemove1 = addRandomObject(1000)
        const elementToRemove2 = addRandomObject(1500)
        const elementToKeep = addRandomObject(100000)

        stubTime(300)
        jest.runOnlyPendingTimers()

        testCacheObject(elementToRemove1.key, undefined)
        testCacheObject(elementToRemove2.key, undefined)
        testCacheObject(elementToKeep.key, {
            value: elementToKeep.value,
            expireDate: elementToKeep.expireDate,
        })

        cache.stopExpiredCacheCheck()
    })

    test('should stop checking after calling stop', () => {
        jest.useFakeTimers()

        cache.startExpiredCacheCheck()
        jest.runOnlyPendingTimers()
        cache.stopExpiredCacheCheck()

        const testElement = addRandomObject(100)

        testCacheObject(testElement.key, {
            value: testElement.value,
            expireDate: testElement.expireDate,
        })
    })
})
