// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeLyz_dqTvl8bG7KN4HB8EMmEaCDTvock",
  authDomain: "spotify-86546.firebaseapp.com",
  databaseURL: "https://spotify-86546-default-rtdb.firebaseio.com",
  projectId: "spotify-86546",
  storageBucket: "spotify-86546.appspot.com",
  messagingSenderId: "1059809463808",
  appId: "1:1059809463808:web:638392a4c032c11591d2e5",
  measurementId: "G-LCBT14XEWL",
};

// Initialize Firebase

initializeApp(firebaseConfig);
export const auth = getAuth();
