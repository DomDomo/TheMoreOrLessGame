import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "themoreorlessgame.firebaseapp.com",
  databaseURL:
    "https://themoreorlessgame-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "themoreorlessgame.appspot.com",
  messagingSenderId: "26407639457",
  appId: "1:26407639457:web:d27ed079c98c19c73393e0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
