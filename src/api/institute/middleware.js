const Boom = require('@hapi/boom');
const Validator = require('jsonschema').Validator;
const v = new Validator();

module.exports = (schema) => (req, res, next) => {
  const v = new Validator();
  const instance = req.body;

  const result = v.validate(instance, schema);

  if (result.errors.length) {
    const messages = result.errors.map((err) => err.message);
    next(Boom.badRequest(messages.join('. ')));
  }
  next();
};
