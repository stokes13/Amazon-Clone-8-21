var firebaseConfig = {
    apiKey: "AIzaSyBAw3aYZTwTelSyWRf_6kpk41Trx5GgxvQ",
    authDomain: "clone-two-85607.firebaseapp.com",
    projectId: "clone-two-85607",
    storageBucket: "clone-two-85607.appspot.com",
    messagingSenderId: "331667822862",
    appId: "1:331667822862:web:acf43eb99f19437fb7df5f",
    measurementId: "G-RVRKS5NYQ9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();