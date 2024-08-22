import winston from 'winston';

class Logger {
  private logger: winston.Logger;

  constructor(env: string) {
    this.logger = winston.createLogger({
      level: env === 'development' ? 'debug' : 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'server.log' })
      ]
    });

    if (env !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}

export default Logger;
