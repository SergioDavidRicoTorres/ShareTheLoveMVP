import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCVG_iR9_lG3ZYpI4JzauZL4Bdb5TcaZdc",
  authDomain: "sharethelove-3ed15.firebaseapp.com",
  projectId: "sharethelove-3ed15",
  storageBucket: "sharethelove-3ed15.appspot.com",
  messagingSenderId: "269539091422",
  appId: "1:269539091422:web:446e6fb59bfa7ab06cf34f",
  measurementId: "G-1MHF7DKH5T",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
