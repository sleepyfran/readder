import { transform } from '@infrastructure/dev.to/devto.adapter'
import Post from '@common/post.model'
import MalformedData from '@common/malformed-data.error'

describe('transform', () => {
    test('should return an empty array if an empty array is given', () => {
        expect(transform([], '')).toEqual([])
    })

    test('should throw an error if body_html attribute is given', () => {
        const emptyDataJson = [{}]

        expect(() => transform(emptyDataJson, '')).toThrow(MalformedData)
    })

    test('should throw an error if no title attribute is given', () => {
        const malformedJson = [
            {
                body_html: '',
            },
        ]

        expect(() => transform(malformedJson, '')).toThrow(MalformedData)
    })

    test('should throw an error if no url attribute is given', () => {
        const emptyChildrenJson = [
            {
                body_html: '',
                title: '',
            },
        ]

        expect(() => transform(emptyChildrenJson, '')).toThrow(MalformedData)
    })

    test('should return an array with the parsed posts given a valid input', () => {
        const validJson = [
            {
                body_html: 'Test HTML',
                title: 'Test Title',
                url: 'Test URL',
            },
        ]

        const expectedPost = validJson[0]
        const posts = transform(validJson, 'Test Tag')
        expect(posts).toBeTruthy()
        expect(posts).toHaveLength(1)

        const post = posts[0]
        expect(post.title).toEqual(expectedPost.title)
        expect(post.content).toEqual(expectedPost.body_html)
        expect(post.html).toEqual(expectedPost.body_html)
        expect(post.url).toEqual(expectedPost.url)
    })
})
