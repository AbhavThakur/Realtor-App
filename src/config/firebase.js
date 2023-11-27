// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAGkt9N3F3BUgHtRSQRPh8O2RbYf88BnrA',
  authDomain: 'realtor-c5674.firebaseapp.com',
  projectId: 'realtor-c5674',
  storageBucket: 'realtor-c5674.appspot.com',
  messagingSenderId: '1072086771361',
  appId: '1:1072086771361:web:6cad4e380520f5966db2e0',
  measurementId: 'G-3N0K4QBLYK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
