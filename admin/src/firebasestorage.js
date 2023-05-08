import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import "firebase/compat/storage"


const firebaseConfig = {
    apiKey: "AIzaSyAN0UX18MCW6ZhuBuizI5uaetbyCaI8n9M",
    authDomain: "kncmovie-347bf.firebaseapp.com",
    projectId: "kncmovie-347bf",
    storageBucket: "kncmovie-347bf.appspot.com",
    messagingSenderId: "1007557748406",
    appId: "1:1007557748406:web:864ea2943a1baba8952817",
    measurementId: "G-5JCGNSK2G3"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;