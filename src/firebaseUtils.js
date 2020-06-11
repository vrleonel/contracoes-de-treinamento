import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "contracoes.firebaseapp.com",
  databaseURL: "https://contracoes.firebaseio.com",
  projectId: "contracoes",
  storageBucket: "contracoes.appspot.com",
  messagingSenderId: "131830973741",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-JL6VFF0Z78"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
