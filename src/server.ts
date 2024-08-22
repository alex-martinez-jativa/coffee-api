import express, { Express } from 'express';
import { recipeRouter } from './recipes/interface/recipeRoutes.js';
import cors from 'cors';
import Logger from './lib/logger.js';

export class App {
  private readonly app: Express;
  private readonly port: string;
  private readonly logger: Logger;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/api', recipeRouter)
    this.port = process.env.PORT ?? '8000';
    this.app.use(cors({
      methods: ['GET'],
    }));
    this.logger = new Logger(process.env.NODE_ENV || 'development');
  }

  start() {
    this.app.listen(this.port, () => {
      this.logger.info(`server 🚀 on port: ${process.env.PORT}`)
      this.logger.info(`http://localhost:${process.env.PORT}`)
    });
  }

  stop() {
    this.logger.info('server abruptly stopped 🚨');
  }
}
