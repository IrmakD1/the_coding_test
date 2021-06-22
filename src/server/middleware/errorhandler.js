const _ = require('lodash')

module.exports = () => (err, req, res, next) => {

    if (_.isError(err)) {
        const { message } = err
        const statusCode = _.get(err, 'output.payload.statusCode', 500);
        const errorCode = _.get(err, 'data.errorCode', 'E000');

        return res.status(statusCode).send({ message, errorCode})
    }

    return next()
}