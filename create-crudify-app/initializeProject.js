const path = require("path");
const FileService = require("./services/file");
const installPackage = require("./installPackage");

const initializeProject = async (projectName, options) => {
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

  await installPackage(project);
};

module.exports = initializeProject;
