import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set,get,child} from 'firebase/database';
import {getAuth,
        FacebookAuthProvider,
        GoogleAuthProvider,
        EmailAuthProvider,
        onAuthStateChanged,
        signOut,
        getRedirectResult,
        } from 'firebase/auth'
import * as firebaseui from "firebaseui"
const firebaseConfig = {
    apiKey: "AIzaSyCTwgim60gpoa2Q9p9VB-o4k81r0cy7b3s",
    authDomain: "patienttracking-btec.firebaseapp.com",
    databaseURL: "https://patienttracking-btec-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "patienttracking-btec",
    storageBucket: "patienttracking-btec.appspot.com",
    messagingSenderId: "322266356105",
    appId: "1:322266356105:web:cc57756c9ad4198b372958"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const Auth = getAuth(app);
const Authui = new firebaseui.auth.AuthUI(Auth); 
export {
  app,
  database,
  ref,
  onValue,
  set,
  Auth,
  Authui,
  FacebookAuthProvider,
  GoogleAuthProvider,
  EmailAuthProvider,
  onAuthStateChanged,
  signOut,
  getRedirectResult,
  get,
  child
}