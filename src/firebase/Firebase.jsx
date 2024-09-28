import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCID6MNJ_bI46jEK7cTzSL6cumBVq0frnM",
    authDomain: "progect-react-1.firebaseapp.com",
    projectId: "progect-react-1",
    storageBucket: "progect-react-1.appspot.com",
    messagingSenderId: "771091454184",
    appId: "1:771091454184:web:9bc4f0e6f5c2c50e14915d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();