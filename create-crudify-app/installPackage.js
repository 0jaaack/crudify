const spawn = require("child_process").spawn;
const ora = require("ora");

const installPackage = async (project) => {
  const spinner = ora("패키지 파일을 설치 중이에요!").start();

  const installRunner = () => {
    return new Promise((resolve, reject) => {
      const process = spawn("npm", ["install", "--production", "--no-optional"], {
        cwd: project.path
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
    console.log("프로젝트 환경파일은 설치가 완료되었지만, 패키지를 설치하는 중에 오류가 발생했어요.");
    console.log("아래의 명령어를 통해 다시 시도해보실 수 있어요.");
    console.log(`

      cd ${project.name}
      npm install

    `);
    console.log("설치가 완료 된 후, 아래의 명령어로 서버를 구동하여 대시보드를 열어주세요.");
    console.log(`

      crudify start

    `);

    process.exit(1);
  }
};

module.exports = installPackage;
