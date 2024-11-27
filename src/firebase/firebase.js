// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl_HEL4WIO7KMFpnUNRP7flaIRauY5PDw",
  authDomain: "storeblog-fe0c8.firebaseapp.com",
  projectId: "storeblog-fe0c8",
  storageBucket: "storeblog-fe0c8.appspot.com",
  messagingSenderId: "877406289466",
  appId: "1:877406289466:web:3eaa370c12ccbaf90f7f03"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
export {db, auth}

