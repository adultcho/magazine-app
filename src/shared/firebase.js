import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPxfYUaysKima2MAZa_AFN5sEQU_iKiqg",
  authDomain: "megazine-15ecc.firebaseapp.com",
  projectId: "megazine-15ecc",
  storageBucket: "megazine-15ecc.appspot.com",
  messagingSenderId: "383539095175",
  appId: "1:383539095175:web:68928fa8c0fe6a5fff7a22",
  measurementId: "G-Y895GP3LPW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
