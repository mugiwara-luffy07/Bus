// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database'; // Make sure to import `ref` here

const firebaseConfig = {
  apiKey: 'AIzaSyA4FZdgX1V1HOwTJYER38hYQN5HVyXpp6w',
  authDomain: 'busify-74f60.firebaseapp.com',
  databaseURL: 'https://busify-74f60-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'busify-74f60',
  storageBucket: 'busify-74f60.appspot.com',
  messagingSenderId: '219811602811',
  appId: '1:219811602811:web:93fb238c81fc65a1d45dde',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the database reference
const database = getDatabase(app);

export { app, database, ref };  // Export `ref` to use it in your components
