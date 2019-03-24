import { transform } from '@infrastructure/reddit/reddit.adapter'
import Post from '@common/post.model'
import MalformedData from '@common/malformed-data.error'

describe('transform', () => {
    test('should throw an error if an empty string is given', () => {
        const emptyString = ''
        expect(() => transform(emptyString))
            .toThrow(MalformedData)
    })

    test('should throw an error if no data object is given', () => {
        const emptyDataJson = {
            data: {}
        }

        expect(() => transform(emptyDataJson))
            .toThrow(MalformedData)
    })

    test('should throw an error if children array objects are malformed', () => {
        const malformedChildrenJson = {
            data: {
                children: [
                    {
                        malformed: '' // No data property.
                    }
                ]
            }
        }

        expect(() => transform(malformedChildrenJson))
            .toThrow(MalformedData)
    })

    test('should return an empty array if children array is empty', () => {
        const emptyChildrenJson = {
            data: {
                children: []
            }
        }

        const posts = transform(emptyChildrenJson)
        expect(posts).toBeTruthy()
        expect(posts).toHaveLength(0)
    })

    test('should return an array with the parsed elements given a valid input', () => {
        const validJson = {
            data: {
                children: [
                    {
                        data: Post.create(
                            'A test post title',
                            'A test community name',
                            'A test post content',
                            'A test post content HTML',
                            'A test post URL',
                            'A test community URL'
                        )
                    },
                    {
                        data: Post.create(
                            'Another test post title',
                            'Another test community name',
                            'Another test post content',
                            'Another test post content HTML',
                            'Another test post URL',
                            'Another test community URL'
                        )
                    }
                ]
            }
        }

        const posts = transform(validJson)
        expect(posts).toBeTruthy()
        expect(posts).toHaveLength(2)

        for (let i = 0; i < posts.length; i++) {
            const expectedPost = validJson.data.children[i].data
            const actualPost = posts[i]

            expect(actualPost.title).toEqual(expectedPost.title)
            expect(actualPost.content).toEqual(expectedPost.selftext)
            expect(actualPost.htmlContent).toEqual(expectedPost.selftext_html)
            expect(actualPost.url).toEqual(expectedPost.url)
        }
    })
})