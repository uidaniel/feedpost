// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getFirestore} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE-HseZ8EKtey_1vVoZH6brWxXMNDOSNs",
  authDomain: "feedpost-7e3db.firebaseapp.com",
  projectId: "feedpost-7e3db",
  storageBucket: "feedpost-7e3db.appspot.com",
  messagingSenderId: "322890087093",
  appId: "1:322890087093:web:f2f7b08630459383341cfc",
  measurementId: "G-YX0QK3DWW8"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app)

export { database, auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, firestore };