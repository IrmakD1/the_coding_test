const logger = require('./logger');

describe('logger module', () => {
  test('returns a logger', () => {
    expect(logger.level).toBe('info');
  });
});
