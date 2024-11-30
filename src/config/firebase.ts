import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "", /* Ganti Sama apikey firebase kalian */
  authDomain: "",/* Ganti Sama auth Domain firebase kalian */
  projectId: "", /* Ganti sama Project id firebase kalian*/
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);