import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCWfZ4xMqXeS0cgEkcsp-SQKHD6qeBeit0",
    authDomain: "drive-4d31a.firebaseapp.com",
    projectId: "drive-4d31a",
    storageBucket: "drive-4d31a.appspot.com",
    messagingSenderId: "147050887295",
    appId: "1:147050887295:web:0488605f723f5ebc1ce74a"

  };

  

  

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider }


