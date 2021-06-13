const express = require('express')
const helmet = require('helmet')
const winston = require('winston'),
    expressWinston = require('express-winston');


module.exports = apiRouter => {
    const app = express()

    //Helmet helps you secure your Express apps by setting various HTTP headers
    app.use(helmet())

    //using winston middleware logger
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));

    //Can add auth middleware validating api key or bearer token
    // app.use(auth());

    // main application router
    app.use('/', apiRouter);

    // error handler - app router should errors errors down to here
    app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));

    return app;
}