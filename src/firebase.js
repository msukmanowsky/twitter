import firebase from 'firebase';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';


const config = {
  apiKey: "AIzaSyCeyT3fTnX3UcUkbkMCbaUSJ0J83FSVpqQ",
  authDomain: "my-social-app-837fc.firebaseapp.com",
  databaseURL: "https://my-social-app-837fc.firebaseio.com",
  projectId: "my-social-app-837fc",
  storageBucket: "my-social-app-837fc.appspot.com",
  messagingSenderId: "181106516336"
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

const uiConfig = {
  signInFlow: "redirect", // or popup
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};
const ui = new firebaseui.auth.AuthUI(firebase.auth());

export {
  firebase,
  config,
  db,
  ui,
  uiConfig,
}