import express, { Express } from 'express';
import dotenv from 'dotenv';

import setupRoutes from './routes';
import { setupMiddlewares } from './middlewares';

export const setupApp = (): Express => {
  dotenv.config();

  const app = express();

  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
