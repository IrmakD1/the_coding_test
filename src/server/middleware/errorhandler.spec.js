const errorHandler = require('./errorhandler')

describe('errorHandler', () => {
    const res = { status: jest.fn(() => ({send: jest.fn()}))}
    const req = jest.fn()
    
    test('calls next if no errors are passed to it', () => {
        const next = jest.fn()

        errorHandler()(true, req, res, next)
        expect(next).toBeCalled()
    })
    test('calls next if no errors are passed to it', () => {
        const next = jest.fn()
        const err = Error('Kevin')

        errorHandler()(err, req, res, next)
        expect(res.status).toBeCalledWith(500)
    })
})