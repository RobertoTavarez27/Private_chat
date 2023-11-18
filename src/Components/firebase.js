import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {

  apiKey: "AIzaSyBlc5_3at298VAmbN0kl-rkb4OR29TqQHg",

  authDomain: "chat-c1c09.firebaseapp.com",

  projectId: "chat-c1c09",

  storageBucket: "chat-c1c09.appspot.com",

  messagingSenderId: "886737005074",

  appId: "1:886737005074:web:c78c710f17a27d2ab1c6cb"

};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()
export const storage = getStorage();

