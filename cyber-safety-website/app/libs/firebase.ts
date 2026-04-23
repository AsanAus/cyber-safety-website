// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAgRg4GsIbWxYmIwuAuBH_pfzlsVwC8vw",
  authDomain: "bijak-digital.firebaseapp.com",
  projectId: "bijak-digital",
  storageBucket: "bijak-digital.firebasestorage.app",
  messagingSenderId: "450433908482",
  appId: "1:450433908482:web:2d5aeddd6524e4adf18c1b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);