const spawn = require("child_process").spawn;
const ora = require("ora");

class CommandService {
  constructor(project) {
    this.project = project;
  }

  async installPackage () {
    const spinner = ora("crudify의 패키지 파일을 설치 중이에요!").start();

    const installRunner = () => {
      return new Promise((resolve, reject) => {
        const process = spawn("npm", ["install", "--production", "--no-optional"], {
          cwd: this.project.path
        });
        process.on("close", resolve);
        process.on("error", reject);
      });
    }

    try {
      await installRunner();
      spinner.succeed("프로젝트의 설치가 성공적으로 완료되었습니다.");
    } catch {
      spinner.fail("프로젝트를 설치하는 중 오류가 발생하였습니다.");
      throw new Error("패키지를 설치하는 동안 에러가 발생하였습니다.");
    }
  };

  async startCrudifyApp() {
    const process = spawn("npm", ["run", "start"], {
      cwd: this.project.path,
      stdio: "inherit"
    });

    process.on("error", () => {
      throw new Error("서버를 실행하려는 중, 에러가 발생하였습니다.");
    });
  }
}

module.exports = CommandService;
