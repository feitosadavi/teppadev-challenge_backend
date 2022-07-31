import express, { Express } from 'express';

import { setupFirebase } from './firebase';
import setupSwagger from './swagger';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';

export const setupApp = (): Express => {
  setupFirebase()

  const app = express();
  setupSwagger(app)
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
