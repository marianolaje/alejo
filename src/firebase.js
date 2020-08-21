import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD39srWzJvkNPDvsE1DtOM61Pw5vuiqdn8",
    authDomain: "alejo-database.firebaseapp.com",
    databaseURL: "https://alejo-database.firebaseio.com",
    projectId: "alejo-database",
    storageBucket: "alejo-database.appspot.com",
    messagingSenderId: "934125057678",
    appId: "1:934125057678:web:5d5759ac2a8114fc72bbdf"
};

firebase.initializeApp(firebaseConfig);

export default firebase