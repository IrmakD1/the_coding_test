const { Router } = require('express');
const instituteRouter = require('./institute');

module.exports = () => {
  const router = Router();
  router.use('/', instituteRouter());

  return router;
};
