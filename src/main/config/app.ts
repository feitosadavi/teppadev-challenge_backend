import express, { Express } from 'express';
import dotenv from 'dotenv-safe'
import { initializeApp, cert } from 'firebase-admin/app'
import { serve, setup, SwaggerUiOptions } from 'swagger-ui-express'

import FS_KEY from '@/../fs-key.json'
import setupRoutes from './routes';
import { setupMiddlewares } from './middlewares';
import swaggerDocument from '@/main/docs'

export const setupApp = (): Express => {
  dotenv.config({ example: './.env.example' })

  // initialize firebase
  initializeApp({
    credential: cert(FS_KEY as any)
  })

  const app = express();

  setupMiddlewares(app);
  setupRoutes(app);
  app.use('/docs', serve)
  const options: SwaggerUiOptions = { explorer: true }
  app.get('/docs', setup(swaggerDocument, options))

  return app;
};
