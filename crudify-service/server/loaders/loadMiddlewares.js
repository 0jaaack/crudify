const express = require("express");
const morgan = require("morgan");
const proxy = require("express-http-proxy");
const cors = require("cors");
const log = require("../../utils/logger");

const morganLogFormat = ":date[iso] :method :url :status (:response-time[digits]ms)";

async function loadMiddleware(crudify) {
  crudify.app.use(morgan(morganLogFormat, {
    stream: { write: (message) => log.error(message.trim()) },
  }));
  crudify.app.use("/manage", proxy(crudify.webServerUrl));
  crudify.app.use(cors());
  crudify.app.use(express.json());
  // crudify.app.use(express.static(path.join(__dirname, "..", "dashboard", "public")));
}

module.exports = loadMiddleware;
