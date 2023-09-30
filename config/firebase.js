// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import 'firebase/auth';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfvDZhNA4QYX19O63sxreQx5h5E5PrawY",
  authDomain: "maclab-auth-399711.firebaseapp.com",
  projectId: "maclab-auth-399711",
  storageBucket: "maclab-auth-399711.appspot.com",
  messagingSenderId: "1466418591",
  appId: "1:1466418591:web:d5e89df076c9850fa3e9aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {auth};