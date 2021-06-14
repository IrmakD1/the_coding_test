const Boom = require('@hapi/boom');
const validate = require('./middleware');

describe('institutes schema validation middleware', () => {
  const res = jest.fn();
  const next = jest.fn();

  const schema = {
    type: 'object',
    additionalProperties: false,
    required: ['Kevin'],
    properties: {
      Kevin: {
        type: 'string',
      },
      Bacon: {
        type: 'string',
      },
    },
  };
  test('should validate', () => {
    const req = { body: { Kevin: 'test' } };

    validate(schema)(req, res, next);
    expect(next).toBeCalled();
  });
  test('should not validate', () => {
    const req = { body: { Bacon: 'test' } };

    validate(schema)(req, res, next);
    expect(next).toBeCalledWith(
      Boom.boomify(Error('requires property "Kevin"'))
    );
  });
});
