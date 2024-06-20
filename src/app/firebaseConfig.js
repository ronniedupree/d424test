import { getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy9qIE6Kgt6Td7-wY4o8WVFSIVHNxG2jA",
  authDomain: "d424-1f4dd.firebaseapp.com",
  projectId: "d424-1f4dd",
  storageBucket: "d424-1f4dd.appspot.com",
  messagingSenderId: "598218950732",
  appId: "1:598218950732:web:24315981ba3508fc120ce9",
  measurementId: "G-TMFVN2NJ3D"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { db };
