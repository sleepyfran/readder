import { redditConnector } from '@infrastructure/reddit/reddit.connector'
import { devtoConnector } from '@infrastructure/dev.to/devto.connector'
import ServiceConnector from '@services/service-connector'
import UnrecognizedService from '@common/unrecognized-service.error'

jest.mock('@infrastructure/reddit/reddit.connector', () => {
    return {
        ...jest.requireActual('@infrastructure/reddit/reddit.connector'),
        redditConnector: jest.fn(),
    }
})

jest.mock('@infrastructure/dev.to/devto.connector', () => {
    return {
        devtoConnector: jest.fn(),
    }
})

describe('ServiceConnector', () => {
    afterEach(() => {
        redditConnector.mockClear()
        devtoConnector.mockClear()
    })

    test('should return Reddit results when the chosen community is Reddit', () => {
        redditConnector.mockResolvedValueOnce([])

        return ServiceConnector.loadFrom(
            {
                community: 'reddit',
                minutes: 5,
            },
            () => {},
            () => {},
            () => {},
        ).then(() => {
            expect(redditConnector).toHaveBeenCalled()
        })
    })

    test('should return Dev.to results when the chosen community is Dev.to', () => {
        devtoConnector.mockResolvedValueOnce([])

        return ServiceConnector.loadFrom(
            {
                community: 'dev.to',
                minutes: 5,
            },
            () => {},
            () => {},
            () => {},
        ).then(() => {
            expect(devtoConnector).toHaveBeenCalled()
        })
    })

    test('should throw an UnrecognizedService error when the community does not exist', () => {
        const onError = jest.fn()

        return ServiceConnector.loadFrom(
            {
                community: 'unknown',
                minutes: 5,
            },
            () => {},
            onError,
            () => {},
        ).then(() => {
            expect(redditConnector).not.toHaveBeenCalled()
            expect(devtoConnector).not.toHaveBeenCalled()
            expect(onError).toHaveBeenCalledWith(new UnrecognizedService())
        })
    })
})
