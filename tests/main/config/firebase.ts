import { initializeApp, cert } from 'firebase-admin/app'
import FS_KEY from '@/../fs-key'

export const setupFirebase = (appName?: string): void => {
  // const {
  //   FIREBASE_PROJECT_ID,
  //   FIREBASE_PRIVATE_KEY_ID,
  //   FIREBASE_PRIVATE_KEY,
  //   FIREBASE_CLIENT_ID
  // } = process.env
  // const testing = {
  //   "type": "service_account",
  //   "project_id": `"${FIREBASE_PROJECT_ID}"`,
  //   "private_key_id": `"${FIREBASE_PRIVATE_KEY_ID}"`,
  //   "private_key": `"${FIREBASE_PRIVATE_KEY}"`,
  //   "client_email": `firebase-adminsdk-gstku@${FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
  //   "client_id": `"${FIREBASE_CLIENT_ID}"`,
  //   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  //   "token_uri": "https://oauth2.googleapis.com/token",
  //   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  //   "client_x509_cert_url": `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gstku%40${FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`
  // }

  // const credential = process.env.NODE_ENV !== 'testing' ? testing : testing
  initializeApp({
    credential: cert(FS_KEY as any)
  }, appName)
};
