import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// IMPORTANT: Replace with your web app's Firebase configuration
// In a real application, these should be stored securely in environment variables
const firebaseConfig = {
  apiKey: "AIzaSyAgOK3DYPLNKeQkrVEByOp4nC9SqA2khLs",
  authDomain: "shopnest-official.firebaseapp.com",
  projectId: "shopnest-official",
  storageBucket: "shopnest-official.firebasestorage.app",
  messagingSenderId: "1092056605420",
  appId: "1:1092056605420:web:233dce5cc665e806ecbbc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
