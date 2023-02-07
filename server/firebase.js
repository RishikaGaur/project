const { initializeApp } = require('firebase-admin/app');
const {getDatabase} = require('firebase/database');
  const firebaseConfig = {
    apiKey: "AIzaSyAvibs_qktrohsgCUAsb82NxaoUm6leQrY",
    authDomain: "social-media-94ee6.firebaseapp.com",
    databaseURL: "https://social-media-94ee6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "social-media-94ee6",
    storageBucket: "social-media-94ee6.appspot.com",
    messagingSenderId: "779438191457",
    appId: "1:779438191457:web:1c6ad20194e1ba52f34b20",
    measurementId: "G-EFTN31ZKP3"
  };

let db=initializeApp(firebaseConfig)

let database = getDatabase(db);

module.exports=database