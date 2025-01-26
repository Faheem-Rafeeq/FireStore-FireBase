import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyCbouB2JOfrOtKw4m1YMONRRK_vIxkSMUg",
    authDomain: "login-page-ab5b2.firebaseapp.com",
    projectId: "login-page-ab5b2",
    storageBucket: "login-page-ab5b2.firebasestorage.app",
    messagingSenderId: "252914670896",
    appId: "1:252914670896:web:90efae7a3987b861ef3cf5"
  };


// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);