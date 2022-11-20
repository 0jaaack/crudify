const express = require("express");
const mongoose = require("mongoose");

class ServerService {
  constructor(project) {
    this.app = express();
    this.port = project.port;
    this.DBName = `${project.name}DB`;
  }

  async connectMongoose() {
    try {
      await mongoose.connect(`mongodb://localhost:27017/${this.DBName}`, {
        useNewUrlParser: true,
      });
    } catch {
      throw new Error("데이터 베이스와의 연결에 실패하였습니다.");
    }
  }

  async loadMiddleware() {

  }

  async loadRouter() {
    this.app.get("/", (req, res) => {
      res.send("Hello Crudify World!");
    });
  }

  async loadErrorHandler() {
    this.app.use((req, res, next) => {
      next(createError(404, "page not found"));
    });

    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({ message: err.message });
    });
  }

  async start() {
    try {
      await this.connectMongoose();
      await this.loadMiddleware();
      await this.loadRouter();
      await this.loadErrorHandler();
    } catch (error) {
      console.error(error);
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

module.exports = ServerService;
