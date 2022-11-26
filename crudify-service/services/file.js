const path = require("path");
const fs = require("fs/promises");

class FileService {
  constructor() {
    this.projectPath = process.cwd();
  }

  async getCollections() {
    try {
      const collections = await fs.readdir(path.join(this.projectPath, "models"));
      return collections.map((collecion) => collecion.replace(".json", ""));
    } catch {
      throw new Error("데이터를 가져오는 중, 오류가 발생하였습니다.");
    }
  }

  async getJsonFile(directoryName, fileName) {
    try {
      const json = await fs.readFile(
        path.join(this.projectPath, directoryName, fileName),
        "utf-8"
      );

      return {
        name: fileName.replace(".json", ""),
        data: JSON.parse(json)
      };
    } catch (error) {
      console.error(error);
      throw new Error("데이터를 가져오는 중, 오류가 발생하였습니다.");
    }
  }

  async getJsonFilesAll(directoryName) {
    try {
      const jsonFiles = await fs.readdir(path.join(this.projectPath, directoryName));

      return await Promise.all(jsonFiles.map(async (file) => {
        return await this.getJsonFile(directoryName, file);
      }));
    } catch (error) {
      console.error(error);
      throw new Error("데이터를 가져오는 중, 오류가 발생하였습니다.");
    }
  }

  async updateJsonFile(directoryName, fileName, payload) {
    try {
      await fs.writeFile(
        path.join(this.projectPath, directoryName, `${fileName}.json`),
        JSON.stringify(payload, null, 2)
      );
    } catch (error) {
      console.error("10101");
      throw new Error("서버에 데이터 생성 중, 오류가 발생하였습니다.");
    }
  };
};

module.exports = FileService;
