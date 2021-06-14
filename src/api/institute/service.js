const _ = require('lodash');
const Boom = require('@hapi/boom');
const logger = require('../../logger');

const validateInstituteId = async (model, id, body) => {
  try {
    if (id) {
      const res = await model.find({ id: id });
      if (!res.length) throw Error('Institution Id does not exist');
    } else if (body.id) {
      const res = await model.find({ id: body.id });
      if (res.length) throw Error('Id already exists');
    }
  } catch (err) {
    throw Boom.badData(err);
  }
};

const joinLatestSubmissionData = async (institutions, Submission) => {
  const data = await Promise.all(
    _.map(institutions, async (institution) => {
      const submission = await Submission.find(
        {
          institution_id: institution.id,
        },
        '',
        {
          sort: { year: -1 },
          limit: 1,
        }
      );
      const filteredSubmission = _.omit(submission[0].toObject(), [
        'id',
        '_id',
        'institution_id',
        '__v',
      ]);
      return {
        ..._.omit(institution, ['__v']),
        latestSubmission: filteredSubmission,
      };
    })
  );

  return data;
};

const getInstituteData = async (models, complete = false, query = {}) => {
  let data;

  try {
    if (complete === 'true') {
      const institutions = await models.Institute.find(query).lean();

      data = joinLatestSubmissionData(institutions, models.Submission);
    } else {
      data = await models.Institute.find(query);
    }

    return data;
  } catch (err) {
    throw Boom.badGateway('Failed to get data from db', err);
  }
};

const addInstituteData = async (models, body, id = null) => {
  try {
    logger.log('info', 'validating institution id...');

    await validateInstituteId(models.Institute, id, body);

    if (id) {
      logger.log('info', 'adding institution submission data');

      await models.Submission.create(body);

      logger.log('info', 'added institution submission data...');
    } else {
      logger.log('info', 'adding institution data...');
      await models.Institute.create(body);
      logger.log('info', 'added institution data');
    }
  } catch (err) {
    throw Boom.badData(`Unable to add data: ${err}`);
  }
};

module.exports = {
  getInstituteData,
  joinLatestSubmissionData,
  addInstituteData,
  validateInstituteId,
};
