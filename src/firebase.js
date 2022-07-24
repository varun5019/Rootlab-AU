import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCir6THbXYEXyts-owoowDVRo7XVXqZPFQ",
    authDomain: "rootlab-webportal.firebaseapp.com",
    databaseURL: "https://rootlab-webportal-default-rtdb.firebaseio.com",
    projectId: "rootlab-webportal",
    storageBucket: "rootlab-webportal.appspot.com",
    messagingSenderId: "693832568080",
    appId: "1:693832568080:web:e62f5cb91585ae3a0a6995",
    measurementId: "G-4WK99PW9K6"
};  

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
