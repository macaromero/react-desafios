// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyw_npVrwUJcXCCisfJ6GLj5CFV6tsMf4",
  authDomain: "mecha-calzados.firebaseapp.com",
  projectId: "mecha-calzados",
  storageBucket: "mecha-calzados.appspot.com",
  messagingSenderId: "28018243482",
  appId: "1:28018243482:web:a3e51b8cde5f827e796c23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;