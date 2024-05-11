import { App } from "./interface/server.js";

const app = new App()

app.start();

process.on('SIGINT', () => {
  app.stop();
  process.exit(0)
})