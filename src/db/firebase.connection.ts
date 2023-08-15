import "dotenv/config";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";

const app = initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
});

export const firebaseDB = getFirestore(app);
