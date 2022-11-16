const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const template = require("lodash.template");

class FileService {
  constructor(project) {
    this.projectName = project.name;
    this.resourcePath = path.join(__dirname, "..", "resources");
    this.projectPath = project.path;
  }

  async generateDirectory() {
    try {
      await fs.mkdir(this.projectPath, { recursive: true });
    } catch (error) {
      console.error(error);
      throw new Error("프로젝트 폴더 생성 중 오류가 발생하였습니다.");
    }
  }

  async reset() {
    await fs.rm(this.projectPath, { recursive: true });
  }

  async generateConfigFiles() {
    try {
      await fs.mkdir(path.join(this.projectPath, "config"), { recursive: true });
      await fs.rename(path.join(this.resourcePath, "config"), path.join(this.projectPath, "config"));
    } catch(error) {
      console.error(error);
      throw new Error("환경 파일 설치 중 오류가 발생하였습니다.");
    }
  }

  async generatePackage() {
    const packageInfo = {
      name: this.projectName,
      private: true,
      version: "0.1.0",
      description: "a crudify api server application",
      devDependencies: {},
      dependencies: {
        "@crudify": "0.1.0",
      },
      license: "ISC",
    };
    const packageJSON = JSON.stringify(packageInfo, null, 2);

    try {
      await fs.writeFile(path.join(this.projectPath, "package.json"), packageJSON);
    } catch (error) {
      console.error(error);
      throw new Error("패키지 환경 파일(package.json) 설치 중 오류가 발생하였습니다.");
    }
  }

  async generateEnv() {
    const generateSecret = () => crypto.randomBytes(16).toString("base64");
    const envTemplate = await fs.readFile(path.join(this.resourcePath, "templates", "env.template"));
    const compile = template(envTemplate);
    const env = compile({
      appKeys: new Array(4).fill().map(generateSecret).join(","),
      apiTokenSalt: generateSecret(),
      adminJwtToken: generateSecret(),
    });

    try {
      await fs.writeFile(path.join(this.projectPath, ".env"), env);
    } catch(error) {
      console.error(error);
      throw new Error("환경 변수 파일(.env) 설치 중 오류가 발생하였습니다.");
    }
  }

  async generateGitIgnore() {
    try {
      await fs.copyFile(path.join(this.resourcePath, "gitignore"), path.join(this.projectPath, ".gitignore"));
    } catch (error) {
      console.error(error);
      throw new Error("환경 파일(.gitignore) 설치 중 오류가 발생하였습니다.");
    }
  }
}

module.exports = FileService;
