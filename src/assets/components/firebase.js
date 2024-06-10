// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzn4REeRKsrE7RVr5fFO2DJfxi3FNeuvw",
  authDomain: "learning-firebase-64373.firebaseapp.com",
  projectId: "learning-firebase-64373",
  storageBucket: "learning-firebase-64373.appspot.com",
  messagingSenderId: "748819133665",
  appId: "1:748819133665:web:02ac2cc3d24e6f08a6b3a0",
  measurementId: "G-TBVR2G49EX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
