jest.mock('express', () => ({
  Router: jest.fn(() => ({
    use: jest.fn(),
  })),
}));

jest.mock('./institute', () => ({ instituteRouter: jest.fn() }));

const router = require('./router');
