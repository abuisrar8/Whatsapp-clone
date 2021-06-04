import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDTOr9YVUYMp2JoCOJZFIeMv7AK_uxb_eQ",
    authDomain: "whatsapp-clone-fdac3.firebaseapp.com",
    projectId: "whatsapp-clone-fdac3",
    storageBucket: "whatsapp-clone-fdac3.appspot.com",
    messagingSenderId: "233745813126",
    appId: "1:233745813126:web:1edd5009c24e1f56584b07",
    measurementId: "G-8WXJTP7Y85"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new   firebase.auth.GoogleAuthProvider();

  export {auth , provider};
  export default db;
