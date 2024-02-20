// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "medicsafe-414804.firebaseapp.com",
  projectId: "medicsafe-414804",
  storageBucket: "medicsafe-414804.appspot.com",
  messagingSenderId: "422395379859",
  appId: "1:422395379859:web:9673e9d3cc2ac0a4f54d66"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);