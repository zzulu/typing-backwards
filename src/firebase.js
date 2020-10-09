import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  projectId: 'typing-backwards',
  authDomain: 'typing-backwards.web.app',
  databaseURL: 'https://typing-backwards.firebaseio.com'
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

export default firebase;
