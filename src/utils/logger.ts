import * as os from "os";
import winston from "winston";
import * as expressWinston from "express-winston";
import { SyslogTransportOptions, Syslog } from "winston-syslog";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

if (process.env.PAPERTRAIL_HOST && process.env.PAPERTRAIL_PORT) {
  const paperTrailOpt: SyslogTransportOptions = {
    host: process.env.PAPERTRAIL_HOST,
    port: parseInt(process.env.PAPERTRAIL_PORT, 10),
    protocol: "tls4",
    localhost: os.hostname(),
    app_name: "DIR3",
    eol: "\n",
    level: "error",
  };
  const papertrail = new Syslog(paperTrailOpt);
  logger.add(papertrail);
}

export const loggerMiddleware = expressWinston.logger({
  winstonInstance: logger,
  statusLevels: true,
});

export const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
});
