import express, { Express } from 'express';
import { router } from './routes.js';
import cors from 'cors';
import Logger from '../infrastructure/logger.js';

export class App {
  private readonly app: Express;
  private readonly port: string;
  private readonly logger: Logger;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/api', router)
    this.port = process.env.PORT ?? '8000';
    this.app.use(cors({
      methods: ['GET'],
    }));
    this.logger = new Logger(process.env.NODE_ENV || 'development');
  }

  start() {
    this.app.listen(this.port, () => {
      this.logger.info(`server 🚀 on port: ${process.env.PORT}`)
    });
  }

  stop() {
    this.logger.info('server abruptly stopped 🚨');
  }
}
