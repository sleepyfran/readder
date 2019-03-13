import adapters from '@infrastructure/reddit-adapters'

describe('postsFromJson', () => {
    test('should throw an error if an empty string is given', () => {
        const emptyString = ''
        expect(() => adapters.postsFromJson(emptyString))
            .toThrow('The provided JSON is not a valid object')
    })

    test('should throw an error if no data object is given', () => {
        const emptyDataJson = {
            data: {}
        }

        expect(() => adapters.postsFromJson(emptyDataJson))
            .toThrow('The provided JSON is not a valid object')
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

        expect(() => adapters.postsFromJson(malformedChildrenJson))
            .toThrow('The provided JSON is not a valid object')
    })

    test('should return an empty array if children array is empty', () => {
        const emptyChildrenJson = {
            data: {
                children: []
            }
        }

        const posts = adapters.postsFromJson(emptyChildrenJson)
        expect(posts).toBeTruthy()
        expect(posts).toHaveLength(0)
    })

    test('should return an array with the parsed elements given a valid input', () => {
        const validJson = {
            data: {
                children: [
                    {
                        data: {
                            title: 'A test post title',
                            selftext: 'A test post content',
                            selftext_html: 'A test post content HTML',
                            url: 'A test post URL'
                        }
                    },
                    {
                        data: {
                            title: 'Another test post title',
                            selftext: 'Another test post content',
                            selftext_html: 'Another test post content',
                            url: 'Another test post URL'
                        }
                    }
                ]
            }
        }

        const posts = adapters.postsFromJson(validJson)
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