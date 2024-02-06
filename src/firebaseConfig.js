import { initializeApp } from "firebase/app";
import {getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAC7FCEBrogZNqqkWa8BZ-8mRRgxiqclGA",
    authDomain: "ab-company-limited.firebaseapp.com",
    projectId: "ab-company-limited",
    storageBucket: "ab-company-limited.appspot.com",
    messagingSenderId: "258596082637",
    appId: "1:258596082637:web:802d9a1644ac708df92a84",
    measurementId: "G-S5JSF7JPBP"
  };

  const app = initializeApp(firebaseConfig);

 export const db = getFirestore (app);