import express, { Express } from 'express';
import { router } from './routes';
import cors from 'cors';

export class App {
  private readonly app: Express;
  private readonly port: number;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/api', router)
    this.port = 8000;
    this.app.use(cors({
      methods: ['GET'],
  }));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
