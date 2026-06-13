import winston from 'winston';
import { config } from '@config/env';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(({ timestamp, level, message, ...args }) => {
    const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
  }),
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize({ all: true }), format),
  }),
];

if (!config.isDevelopment) {
  transports.push(
    new winston.transports.File({
      filename: `${config.logging.dir}/error.log`,
      level: 'error',
      format,
    }),
    new winston.transports.File({
      filename: `${config.logging.dir}/all.log`,
      format,
    }),
  );
}

export const logger = winston.createLogger({
  level: config.logging.level,
  levels: logLevels,
  format,
  transports,
});
