import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPPV3PRSP5devOq3IVSGIfVF4doIDmdK0",
  authDomain: "task-manager-67ff4.firebaseapp.com",
  projectId: "task-manager-67ff4",
  storageBucket: "task-manager-67ff4.firebasestorage.app",
  messagingSenderId: "78228448007",
  appId: "1:78228448007:web:296899e9e6a4f7bf485ba2",
  measurementId: "G-DNBLPQMQ11"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
