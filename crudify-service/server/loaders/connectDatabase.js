const mongoose = require("mongoose");

async function connectMongoose() {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${this.DBName}`, {
      useNewUrlParser: true,
    });
  } catch {
    throw new Error("데이터 베이스와의 연결에 실패하였습니다.");
  }
}

module.exports = connectMongoose;
