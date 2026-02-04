import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAkHAQR6eFlW2_JL0nxzJ3E0D-2t2jMSp8",
    authDomain: "satendra-photography.firebaseapp.com",
    projectId: "satendra-photography",
    storageBucket: "satendra-photography.firebasestorage.app",
    messagingSenderId: "359831741946",
    appId: "1:359831741946:web:3ae1fec8473200199ef043"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
