import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBsfOoywJliuePyVV9U_LnJgIhtRqIZLjA",
  authDomain: "relic-708e6.firebaseapp.com",
  projectId: "relic-708e6",
  storageBucket: "relic-708e6.appspot.com",
  messagingSenderId: "995376702536",
  appId: "1:995376702536:web:a2560598cb08bba433247d",
  measurementId: "G-DLJNFPWZH7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

if (process.env.REACT_APP_EMULATORS) {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export { db, analytics, storage, firebaseConfig, logEvent, functions };