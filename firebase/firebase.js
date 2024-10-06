import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTa7T_oi5JefhrJIjbZNeN9WBMeGdFKxg",
  authDomain: "fisk-puzzles.firebaseapp.com",
  projectId: "fisk-puzzles",
  storageBucket: "fisk-puzzles.appspot.com",
  messagingSenderId: "997971413249",
  appId: "1:997971413249:web:2dd9d32b2aa9c1e1dfb300"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);