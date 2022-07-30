import { Express, Router } from 'express';
import { readdirSync } from 'fs';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  readdirSync(`${__dirname}/../routes/`).map(async (file) => {
    if (!file.endsWith('.map')) { // avoid problemas with ts source map when app its compiled
      const route = (await import(`../routes/${file}`))
      route.default(router); // pego o arquivo e depois o seu default
    }
  });
};
