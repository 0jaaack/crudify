const express = require("express");
const log = require("../utils/logger");

const connectDatabase = require("./loaders/connectDatabase");
const loadModels = require("./loaders/loadModels");
const loadMiddlewares = require("./loaders/loadMiddlewares");
const loadRouters = require("./loaders/loadRouters");
const loadErrorHandler = require("./loaders/loadErrorHandler");

class Server {
  constructor(project) {
    this.app = express();
    this.port = project.port;
    this.DBName = `${project.name}DB`;
    this.webServerUrl = "127.0.0.1:7286";
    this.models = {};
  }

  async start() {
    try {
      await connectDatabase();
      await loadModels(this);
      await loadMiddlewares(this);
      await loadRouters(this);
      await loadErrorHandler(this);
    } catch (error) {
      log.error(error);

      return this.stop();
    }

    this.app.set("port", this.port);
    this.app.listen(this.port);
  }

  stop() {
    process.exit(1);
  }

  reload() {
    process.send("reload");
  }
}

module.exports = Server;
