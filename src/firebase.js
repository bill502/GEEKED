import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0MMffkBThwHkrp26ucntbrRhkA3t6NrQ",
    authDomain: "geeked-88c8a.firebaseapp.com",
    projectId: "geeked-88c8a",
    storageBucket: "geeked-88c8a.appspot.com",
    messagingSenderId: "671037773456",
    appId: "1:671037773456:web:19b9e3d6bca08373feea15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
