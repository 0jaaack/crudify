const path = require("path");
const FileService = require("./services/file");
const CommandService = require("./services/\bcommand");

const createApplication = async (projectName, options) => {
  if (!projectName) {
    console.error("프로젝트 이름을 찾을 수 없어요.");
    console.error("설치를 종료합니다.");

    return process.exit(1);
  }

  const project = {
    name: projectName,
    path: path.join(process.cwd(), projectName),
    ...options,
  };
  const fileService = new FileService(project);
  const commandService = new CommandService(project);

  console.log(`${project.name} 폴더를 만들고, 프로젝트 설치를 시작합니다.`);

  try {
    await fileService.generateDirectory();
    await fileService.generateConfigFiles();
    await fileService.generatePackage();
    await fileService.generateEnv();
  } catch (error) {
    console.error(error);
    console.error("설치를 종료합니다.");

    await fileService.reset();

    return process.exit(1);
  }

  try {
    await commandService.installPackage(project);
    await commandService.startCrudifyApp(project);
  } catch (error) {
    console.error(error);

    console.log("프로젝트 환경파일은 설치가 완료되었지만, 이 후 과정에서 오류가 발생했어요.");
    console.log("아래의 명령어를 통해 다시 시도해보실 수 있어요.");
    console.log(`

      cd ${this.project.name}
      npm install

    `);
    console.log("설치가 완료 된 후, 아래의 명령어로 서버를 구동하여 대시보드를 열어주세요.");
    console.log(`

      crudify start

    `);

    process.exit(1);
  }
};

module.exports = createApplication;
