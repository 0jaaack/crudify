const path = require("path");
const cluster = require("cluster");
const chokidar = require("chokidar");

const spawn = require("child_process").spawn;

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

  const process = spawn("npm", ["run", "manage"], { stdio: "inherit" });

  process.on("error", () => {
    throw new Error("대시보드를 연결하는 중, 에러가 발생하였습니다.");
  });
}

async function workerProcess() {
  const project = {
    port: 7286,
    path: process.cwd(),
  };
  const server = new ServerService(project);
  const watcher = chokidar.watch(path.join(project.path, "config"), {
    ignoreInitial: true,
  });

  await server.start();

  console.log("서버를 여는 데에 성공했습니다.");
  console.log();
  console.log(`  localhost:/${project.port}`);
  console.log("  으로 접속하여 서버를 확인해볼 수 있어요.");
  console.log();
  console.log(`  localhost:/${project.port}/dashboard`);
  console.log(`  으로 접속하여 서버를 관리할 수 있습니다!`);
  console.log();

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
