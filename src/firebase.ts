// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI70AlyA6A2qYl3OSv2d9ZTfhSrUpvFWU",
  authDomain: "videostreaming-730d4.firebaseapp.com",
  projectId: "videostreaming-730d4",
  storageBucket: "videostreaming-730d4.firebasestorage.app",
  messagingSenderId: "489943413452",
  appId: "1:489943413452:web:bc35b4e8664d53d5f8c869",
  measurementId: "G-XGR7QTZR02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };