import firebase from "firebase";
 

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBuLanpuxNoB8fCNXqEDczisMiMj0jniyo",
    authDomain: "mywork-cd731.firebaseapp.com",
    projectId: "mywork-cd731",
    storageBucket: "mywork-cd731.appspot.com",
    messagingSenderId: "283752180162",
    appId: "1:283752180162:web:33ce0614666feac030ce5b",
    databaseURL: "https://mywork-cd731-default-rtdb.firebaseio.com",
   
   
 } ) 
;
 var db = firebaseApp.firestore();
 export { db };
  