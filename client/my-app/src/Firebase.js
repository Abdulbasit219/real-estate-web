// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-f1588.firebaseapp.com",
  projectId: "mern-real-estate-f1588",
  storageBucket: "mern-real-estate-f1588.appspot.com",
  messagingSenderId: "919323603464",
  appId: "1:919323603464:web:780e3fce3af9c293bc17bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);