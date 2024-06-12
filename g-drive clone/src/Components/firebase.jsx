import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDEzFF-r7wXlmvPa_Fv6wdzbTkbQ7LBljo",
    authDomain: "gooogle-drive-clone-vite.firebaseapp.com",
    projectId: "gooogle-drive-clone-vite",
    storageBucket: "gooogle-drive-clone-vite.appspot.com",
    messagingSenderId: "370606563221",
    appId: "1:370606563221:web:914e2d00b56b18dd98a09c"
  };


  const firebaseApp= firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, storage,auth,provider}