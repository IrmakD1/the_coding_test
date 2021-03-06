const { Router } = require('express');
const { Institute, Submission } = require('../../store');
const { instituteSchema, submissionSchema } = require('../schemas');
const validate = require('./middleware');
const service = require('./service');

module.exports = () => {
  const router = Router();

  router.get('/', async (req, res, next) => {
    try {
      const data = req.query.complete
        ? await service.getInstituteData(
            { Institute, Submission },
            req.query.complete
          )
        : await service.getInstituteData({ Institute, Submission });

      res.send(data);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const data = req.query.complete
        ? await service.getInstituteData(
            { Institute, Submission },
            req.query.complete,
            {
              id: req.params.id,
            }
          )
        : await service.getInstituteData({ Institute, Submission }, false, {
            id: req.params.id,
          });

      res.send(data);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', validate(instituteSchema), async (req, res, next) => {
    try {
      await service.addInstituteData({ Institute, Submission }, req.body);
      res.send('Document successfully added');
    } catch (err) {
      next(err);
    }
  });

  router.post('/:id', validate(submissionSchema), async (req, res, next) => {
    try {
      await service.addInstituteData(
        { Institute, Submission },
        req.body,
        req.params.id
      );
      res.send('Document successfully added');
    } catch (err) {
      next(err);
    }
  });

  return router;
};
