import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxfyYUjrk5u8mPXSAhD1i5ityEvAsVrmw",
  authDomain: "hararu-eec56.firebaseapp.com",
  projectId: "hararu-eec56",
  storageBucket: "hararu-eec56.appspot.com",
  messagingSenderId: "774468806762",
  appId: "1:774468806762:web:644f9512d5ac1b71ecc213",
  measurementId: "G-VYBYRMPG0K",
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
