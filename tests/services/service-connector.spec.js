import { redditConnector } from '@infrastructure/reddit/reddit.connector'
import ServiceConnector from '@services/service-connector'
import UnrecognizedService from '@common/unrecognized-service.error'

jest.mock('@infrastructure/reddit/reddit.connector', () => {
    return {
        ...jest.requireActual('@infrastructure/reddit/reddit.connector'),
        redditConnector: jest.fn()
    }
})

describe('ServiceConnector', () => {
    afterEach(() => {
        redditConnector.mockClear()
    })

    test('should return Reddit results when the chosen community is Reddit', () => {
        redditConnector.mockResolvedValueOnce([])

        ServiceConnector.loadFrom(
            {
                community: 'reddit',
                minutes: 5
            },
            () => { },
            () => { },
            () => { }
        ).then(() => {
            expect(redditConnector).toHaveBeenCalled()
        })
    })

    test('should throw an UnrecognizedService error when the community does not exist', () => {
        const onError = jest.fn()

        ServiceConnector.loadFrom(
            {
                community: 'unknown',
                minutes: 5
            },
            () => { },
            onError,
            () => { }
        ).then(() => {
            expect(redditConnector).not.toHaveBeenCalled()
            expect(onError).toHaveBeenCalledWith(new UnrecognizedService)
        })
    })
})