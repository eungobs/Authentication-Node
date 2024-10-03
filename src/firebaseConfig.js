import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW0MYo16FGno5Egm3i_58pFC57kyvC-2Q",
  authDomain: "employee-registration-4d010.firebaseapp.com",
  projectId: "employee-registration-4d010",
  storageBucket: "employee-registration-4d010.appspot.com",
  messagingSenderId: "545505064985",
  appId: "AIzaSyCW0MYo16FGno5Egm3i_58pFC57kyvC-2Q" // app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export auth and db for use in other parts of the application

