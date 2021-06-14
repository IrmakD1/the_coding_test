jest.mock('./app');

const server = require('./server');
const app = require('./app');

process.exit = jest.fn();

const mockRouter = jest.fn();

describe('server', () => {
  beforeEach(() => jest.clearAllMocks());
  test('expect app to start', () => {
    app.mockImplementationOnce(() => ({
      listen: jest.fn(),
    }));
    server(mockRouter);
    expect(app).toBeCalled();
  });
  test('exit process if app fails to start', () => {
    expect.assertions(1);
    app.mockImplementationOnce(() => {
      throw Error('Blah');
    });
    server();
    expect(process.exit).toBeCalled();
  });
});
