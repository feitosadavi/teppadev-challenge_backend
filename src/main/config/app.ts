import express, { Express } from 'express';
import { initializeApp, cert } from 'firebase-admin/app'
import FS_KEY from '@/../fs-key.json'
import dotenv from 'dotenv-safe'

import setupRoutes from './routes';
import { setupMiddlewares } from './middlewares';

export const setupApp = (): Express => {
  dotenv.config({ example: './.env.example' })

  // initialize firebase
  initializeApp({
    credential: cert(FS_KEY as any)
  })

  const app = express();

  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
