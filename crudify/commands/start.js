const path = require("path");
const cluster = require("cluster");
const chokidar = require("chokidar");

const ServerService = require("../services/server");

function start() {
  if (cluster.isPrimary) {
    primaryProcess();
  } else if (cluster.isWorker) {
    workerProcess();
  }
}

function primaryProcess() {
  cluster.on("message", async (worker, message) => {
    switch (message) {
      case "reload":
        worker.send("kill");
        break;
      case "killed":
        cluster.fork();
        break;
      case "stop":
        process.exit(1);
        break;
      default: {
        break;
      }
    }
  });

  cluster.fork();
}

function workerProcess() {
  const project = {
    port: 8081,
    path: process.cwd(),
  };
  const server = new ServerService(project);
  const watcher = chokidar.watch(path.join(project.path, "config"), {
    ignoreInitial: true,
  });

  server.start();

  watcher
    .on("add", server.reload)
    .on("change", server.reload)
    .on("unlink", server.reload);

  process.on("message", (message) => {
    switch (message) {
      case "kill":
        process.send("killed");
        process.exit(1);
        break;
      default: {
        break;
      }
    }
  });
}

module.exports = start;
