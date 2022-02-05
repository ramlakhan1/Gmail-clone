import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsXKV5POU7_iVRxH2ty4PM7f0AWKugSP8",
  authDomain: "clone-1-cffba.firebaseapp.com",
  projectId: "clone-1-cffba",
  storageBucket: "clone-1-cffba.appspot.com",
  messagingSenderId: "490418225431",
  appId: "1:490418225431:web:c5e169ddb185d397e03752",
  measurementId: "G-46808FPGXN",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
