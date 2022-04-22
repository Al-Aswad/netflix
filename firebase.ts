// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASLYaenyhkwj7N6_fuMy9sl1u1F2rtORk",
  authDomain: "netflix-clone-f7ca0.firebaseapp.com",
  projectId: "netflix-clone-f7ca0",
  storageBucket: "netflix-clone-f7ca0.appspot.com",
  messagingSenderId: "882221887140",
  appId: "1:882221887140:web:691ad97c8a4f02f819c031"
};

// Initialize Firebase
const app = !getApps().length  ? initializeApp(firebaseConfig) : getApp();
const db= getFirestore();
const auth = getAuth();

export default app
export {auth, db}
