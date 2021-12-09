import firebase from "firebase/app";
import 'firebase/firestore';
var firebaseConfig ={
    apiKey: "AIzaSyBuLanpuxNoB8fCNXqEDczisMiMj0jniyo",
    authDomain: "mywork-cd731.firebaseapp.com",
    projectId: "mywork-cd731",
    storageBucket: "mywork-cd731.appspot.com",
    messagingSenderId: "283752180162",
    appId: "1:283752180162:web:33ce0614666feac030ce5b",
    databaseURL: "https://mywork-cd731-default-rtdb.firebaseio.com",
  };
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var mailDb = firebase.firestore();
const projectFirestore = firebase.firestore();
export {projectFirestore};
export default{db, firebase,mailDb};