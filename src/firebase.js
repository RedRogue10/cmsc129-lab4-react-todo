// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3faXlNkQjZT6xGPVwIPNXHuFiGLL1v10",
  authDomain: "react-to-do-app-550cb.firebaseapp.com",
  projectId: "react-to-do-app-550cb",
  storageBucket: "react-to-do-app-550cb.firebasestorage.app",
  messagingSenderId: "395535994285",
  appId: "1:395535994285:web:12462e75177503ab1b6524",
  measurementId: "G-PCWK5SHLX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);