jest.mock('express', () => ({
  Router: jest.fn(() => ({
    use: jest.fn(),
  })),
}));

jest.mock('./institute', () => (instituteRouter = jest.fn()));

const router = require('./router');

describe('router', () => {
  let result;
  beforeEach(() => {
    result = router();
  });

  test('should return router object', () => {
    expect(typeof result).toBe('object');
    expect(result.use).toBeDefined();
  });

  test('should call router.use for institutions', () => {
    expect(result.use).toHaveBeenCalled();
    expect(result.use.mock.calls[0][0]).toBe('/institutions');
  });
});
