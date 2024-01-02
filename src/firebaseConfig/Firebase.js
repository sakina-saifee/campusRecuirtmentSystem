// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYZPHpmNNvz-n4d-VAsAO0aKy3DTvDfHA",
  authDomain: "campusrecuirement.firebaseapp.com",
  projectId: "campusrecuirement",
  storageBucket: "campusrecuirement.appspot.com",
  messagingSenderId: "1085687691057",
  appId: "1:1085687691057:web:af3420f6d47592edc9e210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getDatabase(app);

