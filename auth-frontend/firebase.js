// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYaBnclZoiyMRRvSm50bMjJCpWPw3uAOw",
  authDomain: "react-auth-e85e3.firebaseapp.com",
  projectId: "react-auth-e85e3",
  storageBucket: "react-auth-e85e3.appspot.com",
  messagingSenderId: "252202228144",
  appId: "1:252202228144:web:f15fc6289ba72f3f995e75",
  measurementId: "G-XZPG4CKDB9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
