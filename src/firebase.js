import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB5DT78R9LAY7Z1kiIAaoQPYxqAmMOHKW0",
    authDomain: "fanfeed-b02de.firebaseapp.com",
    projectId: "fanfeed-b02de",
    storageBucket: "fanfeed-b02de.firebasestorage.app",
    messagingSenderId: "98631163166",
    appId: "1:98631163166:web:8fc164bf86e39b3d8cfd0f",
    measurementId: "G-SNVF3PG2DY"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
