const { connectDb, addInitialData } = require("./store");
const logger = require("./logger");
const server = require("./server");
const router = require("./api");

connectDb()
  .then(() => {
    addInitialData();
  })
  .then(() => {
    server(router());
  })
  .catch((err) => {
    logger.error(new Error(`Unable to start service: ${err.message}`));
  });
