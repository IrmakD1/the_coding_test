const { Router } = require("express");
const { Institute, Submission } = require("../../store");
const { instituteSchema } = require('../schemas')
const middleware = require('./middleware')
const service = require("./service");

module.exports = () => {
  const router = Router();

  router.get("/", async (req, res, next) => {
    try {
      const data = req.query.complete
        ? await service.getInstituteData({ Institute, Submission }, req.query.complete)
        : await service.getInstituteData({ Institute, Submission });

      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const data = req.query.complete
        ? await service.getInstituteData({ Institute, Submission }, req.query.complete, {
            id: req.params.id,
          })
        : await service.getInstituteData({ Institute, Submission }, false, {
            id: req.params.id,
          });

      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  // router.post('/', middleware.validate([instituteSchema]), async (req, res, next) => {
  router.post('/', async (req, res, next) => {
    try { 
      await service.addInstituteData({ Institute, Submission }, req.body)
      res.status(200).send('Document successfully added');
    } catch (err) {
      next(err);
    }
  })

  return router;
};
