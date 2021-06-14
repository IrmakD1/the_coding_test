const mongoose = require('mongoose');

const instituteCollectionName =
  process.env.INSTITUTE_COLLECTION_NAME || 'Institute';
const submissionsCollectionName =
  process.env.SUBMISSION_COLLECTION_NAME || 'Submission';

const instituteSchema = new mongoose.Schema({
  name: String,
  address: String,
  country: String,
  region: String,
  id: String,
});

const submissionsSchema = new mongoose.Schema({
  id: String,
  institution_id: String,
  year: Number,
  students_total: Number,
  undergraduates_total: Number,
  postgraduates_total: Number,
  staff_total: Number,
  academic_papers: Number,
  institution_income: Number,
  subjects: Object,
});

const Institute = mongoose.model(instituteCollectionName, instituteSchema);
const Submission = mongoose.model(submissionsCollectionName, submissionsSchema);

module.exports = { Institute, Submission };
