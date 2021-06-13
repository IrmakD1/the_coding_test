const Boom = require('@hapi/boom');
const Ajv = require('ajv');
const _ = require('lodash');

module.exports = {
  validate: schemas => (req, res, next) => {
    const ajv = new Ajv({ schemas });
    const validate = ajv.getSchema();
    const isValid = validate(req.body);

    if (!isValid) {
      const messages = validate.errors.map(err => {
        return `${err.message}, path: ${err.dataPath}.${Object.values(
          err.params
        ).join(',')}`;
      });
      next(Boom.badRequest(messages.join('. ')));
    } else {
      next();
    }
  },
};
