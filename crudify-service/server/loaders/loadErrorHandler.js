const createError = require("http-errors");
const log = require("crudify-service/utils/logger");

async function loadErrorHandler(crudify) {
  crudify.app.use((req, res, next) => {
    next(createError(404, "page not found"));
  });

  crudify.app.use((err, req, res, next) => {
    log.error(err);

    res.status(err.status || 500);
    res.json({ message: err.message });
  });
}

module.exports = loadErrorHandler;
