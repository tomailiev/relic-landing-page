import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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

export { db, analytics };