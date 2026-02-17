import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAvq6WTo0MuqBXcyR7BmJsvUMh-N6il2sE",
    authDomain: "finance-tracker-8d665.firebaseapp.com",
    projectId: "finance-tracker-8d665",
    storageBucket: "finance-tracker-8d665.firebasestorage.app",
    messagingSenderId: "491444442857",
    appId: "1:491444442857:web:a3cc670fe25f56f158c278",
    measurementId: "G-MBZ8C9K6QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
