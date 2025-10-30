import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK86Y-s82IVZGSlGSIFM_wm8faGObhpwk",
  authDomain: "my-ecommerce-app-ac3cf.firebaseapp.com",
  projectId: "my-ecommerce-app-ac3cf",
  storageBucket: "my-ecommerce-app-ac3cf.firebasestorage.app",
  messagingSenderId: "799406371755",
  appId: "1:799406371755:web:51d7f13a365beb00c858ee",
  measurementId: "G-ZQBBKYYDJG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = () => signOut(auth);
