const cluster = require("cluster");
const spawn = require("child_process").spawn;
const path = require("path");
const chokidar = require("chokidar");
const log = require("../utils/logger");
const Server = require("../server");

function start() {
  if (cluster.isPrimary) {
    primaryProcess();
  } else if (cluster.isWorker) {
    workerProcess();
  }
}

function primaryProcess() {
  const process = spawn("npm", ["run", "manage"]);
  process.on("error", () => {
    throw new Error("대시보드를 연결하는 중, 에러가 발생하였습니다.");
  });

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

async function workerProcess() {
  const project = {
    port: 8080,
    path: process.cwd(),
  };
  const server = new Server(project);
  const watcher = chokidar.watch(path.join(project.path), {
    ignoreInitial: true,
    ignored: [
      /(^|[/\\])\../,
      "**/node_modules",
      "**/node_modules/**",
    ]
  });

  await server.start();

  log.info("###### 서버를 시작합니다 ######");

  console.log();
  console.log(`  http://localhost:/${project.port}`);
  console.log("  으로 접속하여 서버를 확인해볼 수 있어요.");
  console.log();
  console.log(`  http://localhost:/7286`);
  console.log(`  으로 접속하여 서버를 관리할 수 있습니다!`);
  console.log();

  watcher
    .on("add", server.reload)
    .on("change", server.reload)
    .on("unlink", server.reload);

  process.on("message", (message) => {
    switch (message) {
      case "kill":
        console.log("변경사항을 반영하여, 서버를 재시작하겠습니다.");
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
