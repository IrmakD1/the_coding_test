const { Router } = require('express');
const instituteRouter = require('./institute');

module.exports = () => {
  const router = Router();
  router.use('/institutions', instituteRouter());

  router.use('/', (req, res) => {
    res.send({
      message: 'Welcome to the Institution data api',
      timestamp: new Date(),
    });
  });

  return router;
};
