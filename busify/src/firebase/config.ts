// src/firebase/config.ts
import { initializeApp } from 'firebase/app'; // Import initializeApp from 'firebase/app'
import { getDatabase } from 'firebase/database'; // Import getDatabase from 'firebase/database'
import { getAuth } from 'firebase/auth'; // Import getAuth from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA4FZdgX1V1HOwTJYER38hYQN5HVyXpp6w',
  authDomain: 'busify-74f60.firebaseapp.com',
  databaseURL: 'https://busify-74f60-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'busify-74f60',
  storageBucket: 'busify-74f60.firebasestorage.app',
  messagingSenderId: '219811602811',
  appId: '1:219811602811:web:93fb238c81fc65a1d45dde',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const database = getDatabase(app); // Get the real-time database instance
const auth = getAuth(app); // Get the authentication instance

export { app, database, auth };
