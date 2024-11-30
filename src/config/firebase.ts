import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXhuY1Ma1z4qzeUMXhAJSJcncExF_4ULo", /* Ganti Sama apikey firebase kalian */
  authDomain: "ditzdev.firebaseapp.com",/* Ganti Sama auth Domain firebase kalian */
  projectId: "ditzdev", /* Ganti sama Project id firebase kalian*/
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);