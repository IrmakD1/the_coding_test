const { Institute, Submission } = require('./mongo');
const logger = require('../logger');
const institutions = require('../../data/institutions.json');
const submissions = require('../../data/submissions.json');

const addInitialData = async () => {
  logger.log('info', 'Adding Institute data to db');

  try {
    await Institute.insertMany(institutions);
    logger.log('info', 'Institute data added to db');
  } catch (err) {
    logger.error(new Error('Unable to add Institute Data to db: ', err));
    throw err;
  }

  logger.log('info', 'Adding Submission data to db');

  try {
    await Submission.insertMany(submissions);
    logger.log('info', 'Submission data added to db');
  } catch (err) {
    logger.error(new Error('Unable to add Submission Data to db: ', err));
    throw err;
  }
};

module.exports = addInitialData;
