import fsKeyLocal from './fs-key-local'

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? fsKeyLocal.PROJECT_ID
const PRIVATE_KEY_ID = process.env.FIREBASE_PRIVATE_KEY_ID ?? fsKeyLocal.PRIVATE_KEY_ID
const PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY ?? fsKeyLocal.PRIVATE_KEY
const CLIENT_ID = process.env.FIREBASE_CLIENT_ID ?? fsKeyLocal.CLIENT_ID

export default {
  "type": "service_account",
  "project_id": PROJECT_ID,
  "private_key_id": PRIVATE_KEY_ID,
  "private_key": PRIVATE_KEY,
  "client_email": `firebase-adminsdk-gstku@${PROJECT_ID}.iam.gserviceaccount.com`,
  "client_id": CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gstku%40${PROJECT_ID}.iam.gserviceaccount.com`
}