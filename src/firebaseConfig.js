import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDs6ldrbe6TBCQVHREq8yukPFrEo6CNlQo",
  authDomain: "disney-plus-clone-1147a.firebaseapp.com",
  projectId: "disney-plus-clone-1147a",
  storageBucket: "disney-plus-clone-1147a.appspot.com",
  messagingSenderId: "1087690603205",
  appId: "1:1087690603205:web:d1af739670405069a5ceac",
  measurementId: "G-FGY050S764",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
