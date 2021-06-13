const connectDb = require('./connect-db')
const addInitialData = require('./add')
const { Institute, Submission } = require('./mongo')

module.exports = { connectDb, addInitialData, Institute, Submission }