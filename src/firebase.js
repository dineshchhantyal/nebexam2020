import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDLD6EeQftBOKntM0aJxfUcnhKaFzFMXzk",
  authDomain: "neb-exam-poll.firebaseapp.com",
  databaseURL: "https://neb-exam-poll.firebaseio.com",
  projectId: "neb-exam-poll",
  storageBucket: "neb-exam-poll.appspot.com",
  messagingSenderId: "133721840711",
  appId: "1:133721840711:web:98ddc49b3aff5da24e6562",
  measurementId: "G-CWXMWP4ND1",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
