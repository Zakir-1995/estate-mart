import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-mart.firebaseapp.com",
  projectId: "estate-mart",
  storageBucket: "estate-mart.appspot.com",
  messagingSenderId: "1012246577473",
  appId: "1:1012246577473:web:f2f6e4054e51ac8a73e1c0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
