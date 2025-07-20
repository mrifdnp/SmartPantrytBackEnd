// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDBeJyCEntI3uueSoy8UM1de1PMymw05Us',
  authDomain: "smart-pantry-d18a5.firebaseapp.com",
 
   projectId: "smart-pantry-d18a5",

   storageBucket: "smart-pantry-d18a5.firebasestorage.app",
  messagingSenderId: "551425333098",
  appId: "1:551425333098:web:ba95d8ce199af56b8e3713",
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
