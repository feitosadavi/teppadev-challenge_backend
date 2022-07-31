import express, { Express } from 'express';
import dotenv from 'dotenv-safe'
import { initializeApp, cert } from 'firebase-admin/app'
import { serve, setup, SwaggerUiOptions } from 'swagger-ui-express'

import setupRoutes from './routes';
import setupMiddlewares from './middlewares';
import setupSwagger from './swagger';
import swaggerDocument from '@/main/docs'

export const setupApp = (): Express => {
  dotenv.config({ example: './.env.example' })

  // initialize firebase
  initializeApp({
    credential: cert({
      "type": "service_account",
      "project_id": "cardappio-b1ef6",
      "private_key_id": "d16c6c1b21b6cfab27d8721ce9d8565b4464c02f",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQComzrizM/ZI6Pj\n2FxsSsrQiEH2ynDJSZGUo9ZIDeM/10Rllnjs8KLu9Zkd/gOM56mSYa0/YjaK0EpP\nAx578RrA0q5QpxBFIs07BV61BUqJ6UhqAc2Tkw9zgUg+5DCqiGef8CDWrK/7hSSl\nQAheiJTYeyPnAITKv1vYpnvN8EGQXonczrWXzGVx/hvE9VvX2tcE5MUwjmW0oext\nc/orrjq5WYNQc21k6oawpTX+7qzz2HYTcr1cjBqvKsesTy+hP6VnngmjVLsPw/08\n3SfAaDFBEVmrYBNqm+/8uIqH76OknImxOzkwaKwldUyQYGL28jTJZ/QjknQc1b88\nrK8O9jVfAgMBAAECggEAOJ78nPqL2E9EM/lOPF23k2UWxeKBEs++cGy+wq7LQH6x\nrO3lySgch2P52h0aIyEPDKX5sL3yNBazxan1/EhhJBz8RgB8kcMYqbfpcKAIwpyR\nYWwele7+ctsZIGmwQCyTpB3XYVBXvv8c6dPBm8GBPtvHmEVP0uiFVxG9pNCIrArO\n7ogoXCrwLjB28RtidOA8Aa+EsByUm+2SiDCJxOFEwhhKXcXKEpMHpvcJJuwjMg6w\nzIS3eEhMz3rk+sV1JwhdOSaeUCtpr76CfOZzH6MHrnpajdfXhey1Hf/Ne1JiLXEQ\nA4MpV/Zi7MyPEUUoDtxdAr4VN0RlPmSbFjGku6gdgQKBgQDqlGeTRFfuAzzOJLBO\nfWFRxeb5cvjMiZpwfndmJf7rv53MagvkV3VN9v7LRe38EznK1kbAhzAWXjBSTrCV\nD2GeG6Ha3JktrLRlvEqoKR/XkTvGrOU5JswxLHTwlZ6gl3uHd3DBOB9sobjXTqZ/\no+saEQKYdiYeGYvUzkcDY0vn3wKBgQC4AJ2hcmjiCYhqgdTGWXXjC9/2KpJloI43\nbi+l/pDO4ZLD0QR2dG2GQ2dzxFWnkFgByI/pTbSXq+EIGwoZwLVpsMzjUSeyCYK7\npLyJI8PFvDXN5UNhu3u6VrNI89AOIfbyyJfjnZV9kYajkLE5Z+D4hXhzysNmgOQz\ne1FGY21igQKBgEBIEKX7eXkArB31UdcAZrXI3IWI6wLpxkeDcGaujM+/f5dvi/iz\nurJ1t9auQAvunMynsVW69gN7JhS3+Y2vXFm+Srk18Efi5sBmO7MfKdmhs9a6tEnY\nBuaGvzjaV1C8kh5KLbzVC09ydbuSku+xVJCdDrAG2GUxLO9Q44bbJAbTAoGBAJY5\nWnivMdYptkhOi2sNKuQdk9Ik27VBKhszSI+bkJp3LB3XDm+viqPtcA7iIpRVkqSS\nHHx7xo918pltigeQgAw0HnMQlPoULboJOyw0GOfdS4g4P5URPmjZ1DIhbKG9NSLu\nhqN8ysnkACqWPTsDBnegcMEIsBOF88ncSnTPREUBAoGAHmJrn8g8JYzPBZy3baIi\nbnvU0rYyiGfvL9LCMT80/fVm3So94xIMU29FNtdpSk4yB/1V8yaEKyzRrcQjgxlQ\nUUJ9b1NkHIK4JYHJ0n/Jn46YDKW/GN2KEUW6IoVfthqZgT28gPChyQBePxeJ/vRv\n4EnlTRV1G7AVjo7ibra4tco=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-gstku@cardappio-b1ef6.iam.gserviceaccount.com",
      "client_id": "106965509043977132905",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gstku%40cardappio-b1ef6.iam.gserviceaccount.com"
    } as any)
  })

  const app = express();

  setupSwagger(app)
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
