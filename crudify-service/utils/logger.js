const path = require("path");
const winston = require("winston");
require("winston-daily-rotate-file");

const loggerLevel = process.env === "development" ? "debug" : "info";
const logsPath = path.join(__dirname, "..", "..", "..", "logs");

const logger = winston.createLogger({
  level: loggerLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS:" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      level: loggerLevel,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info) => info.message))
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(logsPath, "%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      format: winston.format.combine(
        winston.format.printf((info) => info.message)
      )
    }),
  ],
});

module.exports = logger;
