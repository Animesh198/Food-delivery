import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgxQCFwFMdyNFn-p4RCW_lRoCYykm8Ef0",
  authDomain: "uber-eats-clone-343919.firebaseapp.com",
  projectId: "uber-eats-clone-343919",
  storageBucket: "uber-eats-clone-343919.appspot.com",
  messagingSenderId: "279510419772",
  appId: "1:279510419772:web:393cd6ca84232683f1f639",
  measurementId: "G-MC169B1GNH",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
