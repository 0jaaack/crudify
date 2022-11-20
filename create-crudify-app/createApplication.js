const path = require("path");
const FileService = require("./services/file");
const CommandService = require("./services/\bcommand");

const createApplication = async (projectName, options) => {
  if (!projectName) {
    console.log();
    console.error("프로젝트 이름을 찾을 수 없어요.");
    console.error("설치를 종료합니다.");
    console.log();

    return process.exit(1);
  }

  const project = {
    name: projectName,
    path: path.join(process.cwd(), projectName),
    ...options,
  };
  const fileService = new FileService(project);
  const commandService = new CommandService(project);

  console.log()
  console.log("crudify에 오신 것을 환영합니다!")
  console.log(`${project.name} 디렉토리를 만들고, 프로젝트 설치를 시작합니다.`);
  console.log()

  try {
    await fileService.generateDirectory();
    await fileService.generateConfigFiles();
    await fileService.generatePackage();
    await fileService.generateEnv();
  } catch (error) {
    console.log();
    console.error(error);
    console.error("설치를 종료합니다.");
    console.log();

    await fileService.reset();

    return process.exit(1);
  }

  try {
    await commandService.installPackage(project);

    console.log();
    console.log("모든 설치가 완료되었어요!");
    console.log("이제 아래의 명령어들을 사용해보실 수 있습니다!");
    console.log();
    console.log(`  cd ${project.name}`);
    console.log("  으로 프로젝트 폴더에 진입한 후,");
    console.log();
    console.log("  npm run start");
    console.log("  : crudify 서버를 실행하고, 대시보드 페이지를 열 수 있습니다.");
    console.log("  : 서버만 열고 싶다면, npm run start --server-only 로 실행할 수 있어요.");
    console.log();
    console.log("  npm run manage");
    console.log("  : 대시보드(관리자 페이지)를 열어주는 명령어입니다.");
    console.log();
    console.log("이제 crudify 서버를 실행하고, 관리자를 위한 대시보드 페이지와 연결할게요.");
    console.log();

    await commandService.startCrudifyApp(project);
  } catch (error) {
    console.log();
    console.error(error);
    console.log();
    console.log("프로젝트 환경파일은 설치가 완료되었지만, 이 후 과정에서 오류가 발생했어요.");
    console.log("아래의 명령어를 통해 다시 시도해보실 수 있어요.");
    console.log();
    console.log(`  cd ${project.name}`);
    console.log("  npm install");
    console.log();
    console.log("  설치가 완료 된 후, 아래의 명령어로 서버를 구동하여 대시보드를 열어주세요.");
    console.log();
    console.log("  npm run start");
    console.log();

    process.exit(1);
  }
};

module.exports = createApplication;
