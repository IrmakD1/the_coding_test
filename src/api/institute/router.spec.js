jest.mock('express', () => ({
  Router: () => ({
    put: jest.fn(),
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  }),
}));
jest.mock('./middleware');
jest.mock('./service');

const validate = require('./middleware');
const service = require('./service');
const instituteRouter = require('./router');
const { instituteSchema, submissionSchema } = require('../schemas');

describe('institute router', () => {
  let handler;
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    res = { send: jest.fn(), set: jest.fn() };
    next = jest.fn();
  });

  describe('GET /', () => {
    describe('when making a valid request', () => {
      beforeEach(async () => {
        const router = instituteRouter();

        req = { query: { complete: null } };
        service.getInstituteData.mockImplementation(() =>
          Promise.resolve(['Institute1', 'Institute2'])
        );
        [[, handler]] = router.get.mock.calls;
      });

      test('it should return the documents', async () => {
        await handler(req, res, next);
        expect(res.send).toBeCalledWith(['Institute1', 'Institute2']);
      });
    });

    describe('when an error occurs', () => {
      beforeEach(async () => {
        const router = instituteRouter();

        req = { query: { complete: true } };
        service.getInstituteData.mockImplementation(() =>
          Promise.reject(Error('whoopsie'))
        );
        [[, handler]] = router.get.mock.calls;

        await handler(req, {}, next);
      });

      test('it should pass the error to next', () =>
        expect(next).toBeCalledWith(Error('whoopsie')));
    });
  });
  describe('GET /:id', () => {
    describe('when making a valid request', () => {
      beforeEach(async () => {
        const router = instituteRouter();

        req = {
          query: { complete: null },
          params: { id: '123' },
        };
        service.getInstituteData.mockImplementation(() =>
          Promise.resolve(['Institute1', 'Institute2'])
        );
        [, [, handler]] = router.get.mock.calls;
      });

      test('it should return the created config to the client', async () => {
        await handler(req, res, next);
        expect(res.send).toBeCalledWith(['Institute1', 'Institute2']);
      });
    });

    describe('when an error occurs', () => {
      beforeEach(async () => {
        const router = instituteRouter();

        req = {
          query: { complete: true },
          params: { id: '123' },
        };
        service.getInstituteData.mockImplementation(() =>
          Promise.reject(Error('whoopsie'))
        );
        [, [, handler]] = router.get.mock.calls;

        await handler(req, {}, next);
      });

      test('it should pass the error to next', () =>
        expect(next).toBeCalledWith(Error('whoopsie')));
    });
  });

  describe('POST to /', () => {
    describe('when making a valid request', () => {
      beforeEach(async () => {
        const router = instituteRouter();
        req = { body: { meh: 'bleh' } };
        service.addInstituteData.mockImplementation(() =>
          Promise.resolve('Added Doc!')
        );

        [[, , handler]] = router.post.mock.calls;

        await handler(req, res, next);
      });

      test('it should validate the request body using the schema', () =>
        expect(validate.mock.calls[0][0]).toEqual(instituteSchema));

      test('it should return a success message to the client', async () => {
        await handler(req, res, next);
        expect(res.send).toBeCalledWith('Document successfully added');
      });
    });

    describe('when an error occurs', () => {
      beforeEach(async () => {
        const router = instituteRouter();
        req = { body: { meh: 'bleh' } };
        service.addInstituteData.mockImplementation(() =>
          Promise.reject(Error('whoopsie'))
        );
        [[, , handler]] = router.post.mock.calls;

        await handler(req, {}, next);
      });

      test('it should pass the error to next', () =>
        expect(next).toBeCalledWith(Error('whoopsie')));
    });
  });

  describe('POST to /:id', () => {
    describe('when making a valid request', () => {
      beforeEach(async () => {
        const router = instituteRouter();
        req = { 
                params: { id: '123'},
                body: { meh: 'bleh' } 
            };
        service.addInstituteData.mockImplementation(() =>
          Promise.resolve('Added Doc!')
        );

        [, [, , handler]] = router.post.mock.calls;

        await handler(req, res, next);
      });

      test('it should validate the request body using the schema', () =>
        expect(validate.mock.calls[1][0]).toEqual(submissionSchema));

      test('it should return a success message to the client', async () => {
        await handler(req, res, next);
        expect(res.send).toBeCalledWith('Document successfully added');
      });
    });

    describe('when an error occurs', () => {
      beforeEach(async () => {
        const router = instituteRouter();
        req = { 
            params: { id: '123'},
            body: { meh: 'bleh' } 
        };
        service.addInstituteData.mockImplementation(() =>
          Promise.reject(Error('whoopsie'))
        );
        [, [, , handler]] = router.post.mock.calls;

        await handler(req, {}, next);
      });

      test('it should pass the error to next', () =>
        expect(next).toBeCalledWith(Error('whoopsie')));
    });
  });
});
