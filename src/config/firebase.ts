// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCNE4stHgwWgu7GdpHp4FSYtJ1LbiH9oAk",
  authDomain: "react-social-media-3f322.firebaseapp.com",
  projectId: "react-social-media-3f322",
  storageBucket: "react-social-media-3f322.appspot.com",
  messagingSenderId: "18362931960",
  appId: "1:18362931960:web:a0ec5ee7c30d9f48c9f90d",
  measurementId: "G-DFTEH07CMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const provider= new GoogleAuthProvider();
export const db=getFirestore(app)