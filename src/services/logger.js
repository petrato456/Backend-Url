const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [new transports.Console()],
});

class Logger {
  info(message) {
    logger.info(message);
  }

  error(message) {
    logger.error(message);
  }

  warn(message) {
    logger.warn(message);
  }
}

module.exports = new Logger();
