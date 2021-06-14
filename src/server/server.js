const logger = require('../logger');
const App = require('./app');

const { PORT = 8080 } = process.env;

module.exports = (router) => {
  try {
    const app = App(router);
    app.listen(PORT, () => logger.log('info', `app listening on ${PORT}`));
  } catch (err) {
    logger.error(new Error('Unable to start server: ', err.message));
    process.exit(1);
  }
};
