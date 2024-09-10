// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAY30Vmwu6Ed1WVZaK7gY9KADQQP_u7g-I',
  authDomain: 'visualize-image-processing.firebaseapp.com',
  projectId: 'visualize-image-processing',
  storageBucket: 'visualize-image-processing.appspot.com',
  messagingSenderId: '443445208977',
  appId: '1:443445208977:web:7ff2a6c62b3ad2e2735c30'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
