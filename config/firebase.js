import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SEND_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: 'G-6RD76E0QMY',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
