import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCXB2Ituf1NLwbCPRgoko5plftUzK5HwCs",
    authDomain: "qr-movies-app.firebaseapp.com",
    projectId: "qr-movies-app",
    storageBucket: "qr-movies-app.firebasestorage.app",
    messagingSenderId: "908794191427",
    appId: "1:908794191427:web:06d74fdf6b4c2bda4a7ef6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
