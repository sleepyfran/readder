import { subredditPosts } from '@infrastructure/reddit-api'
import { minutesToRead } from '../../src/services/reading-time'
import posts from '@services/posts'

jest.mock('@infrastructure/reddit-api', () => {
    return {
        ...jest.requireActual('@infrastructure/reddit-api'),
        subredditPosts: jest.fn()
    }
})

jest.mock('@services/reading-time', () => {
    return {
        ...jest.requireActual('@services/reading-time'),
        minutesToRead: jest.fn()
    }
})

let onSuccess
let onError
let onNoResults

const createPost = (content = 'Test Content') => {
    return {
        title: 'Test Title',
        content: content,
        htmlContent: 'Test Content HTML',
        url: 'Test URL',
        subreddit: 'Test subreddit',
        subredditUrl: 'Test subreddit URL'
    }
}

describe('posts', () => {
    beforeEach(() => {
        onSuccess = jest.fn()
        onError = jest.fn()
        onNoResults = jest.fn()
    })

    test('should call onNoResults when the API returns an empty array', () => {
        subredditPosts.mockResolvedValueOnce([])

        return posts.load(
            {
                minutes: 5,
                subreddit: 'test',
            },
            onSuccess,
            onError,
            onNoResults
        ).then(_ => {
            expect(onNoResults).toHaveBeenCalled()
            expect(onSuccess).not.toHaveBeenCalled()
            expect(onError).not.toHaveBeenCalled()
        })
    })

    test('should call onNoResults when the API returns posts that surpass the specified user minutes', () => {
        subredditPosts.mockResolvedValueOnce([
            createPost(),
            createPost(),
            createPost()
        ])

        minutesToRead.mockReturnValue(5)

        return posts.load(
            {
                minutes: 2,
                subreddit: 'test',
            },
            onSuccess,
            onError,
            onNoResults
        ).then(_ => {
            expect(onNoResults).toHaveBeenCalled()
            expect(onSuccess).not.toHaveBeenCalled()
            expect(onError).not.toHaveBeenCalled()
        })
    })

    test('should call onError when the API returns an error', () => {
        const error = new Error('Test error')
        subredditPosts.mockRejectedValue(error)

        return posts.load(
            {
                minutes: 2,
                subreddit: 'test',
            },
            onSuccess,
            onError,
            onNoResults
        ).then(_ => {
            expect(onError).toHaveBeenCalledWith(error)
            expect(onSuccess).not.toHaveBeenCalled()
            expect(onNoResults).not.toHaveBeenCalled()
        })
    })

    test('should call onSuccess with randomized posts when the API returns posts that are between the specified user minutes', () => {
        const samplePosts = [...Array(5)].map(e => createPost())
        subredditPosts.mockResolvedValueOnce(samplePosts)

        minutesToRead.mockReturnValue(1)

        return posts.load(
            {
                minutes: 5,
                subreddit: 'test',
            },
            onSuccess,
            onError,
            onNoResults
        ).then(_ => {
            expect(onSuccess).toHaveBeenCalledWith(samplePosts)
            expect(onError).not.toHaveBeenCalled()
            expect(onNoResults).not.toHaveBeenCalled()
        })
    })

    test('should call onNoResults when content is empty or null', () => {
        const samplePosts = [...Array(5)].map(e => createPost('')).concat([...Array(5)].map(e => createPost(null)))
        subredditPosts.mockResolvedValueOnce(samplePosts)

        return posts.load(
            {
                minutes: 5,
                subreddit: 'test',
            },
            onSuccess,
            onError,
            onNoResults
        ).then(_ => {
            expect(onNoResults).toHaveBeenCalled()
            expect(onSuccess).not.toHaveBeenCalled
            expect(onError).not.toHaveBeenCalled()
        })

    })
})