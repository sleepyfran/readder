import { minutesToRead } from '@services/reading-time'
import posts from '@services/posts'
import Post from '@common/post.model'

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
    return Post.create(
        'Test Title',
        'Test Community',
        content,
        'Test Content HTML',
        'Test URL',
        'Test Community URL'
    )
}

describe('posts', () => {
    beforeEach(() => {
        onSuccess = jest.fn()
        onError = jest.fn()
        onNoResults = jest.fn()
    })

    test('should call onNoResults when the API returns an empty array', () => {
        const mockConnector = () => Promise.resolve([])

        return posts.load(
            mockConnector,
            5,
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
        const mockConnector = () => Promise.resolve([
            createPost(),
            createPost(),
            createPost()
        ])

        minutesToRead.mockReturnValue(5)

        return posts.load(
            mockConnector,
            2,
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
        const error = new Error
        const mockedConnector = () => Promise.reject(error)

        return posts.load(
            mockedConnector,
            2,
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
        const mockedConnector = () => Promise.resolve(samplePosts)

        minutesToRead.mockReturnValue(1)

        return posts.load(
            mockedConnector,
            5,
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
        const samplePosts = [...Array(5)]
            .map(e => createPost(''))
            .concat([...Array(5)]
                .map(e => createPost(null)))
        const mockedConnector = () => Promise.resolve(samplePosts)

        return posts.load(
            mockedConnector,
            5,
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