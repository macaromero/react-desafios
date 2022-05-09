// Import de las funciones de firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Configuración de la base de datos
const firebaseConfig = {
  apiKey: "AIzaSyCyw_npVrwUJcXCCisfJ6GLj5CFV6tsMf4",
  authDomain: "mecha-calzados.firebaseapp.com",
  projectId: "mecha-calzados",
  storageBucket: "mecha-calzados.appspot.com",
  messagingSenderId: "28018243482",
  appId: "1:28018243482:web:a3e51b8cde5f827e796c23"
};


// Inicialización de la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;