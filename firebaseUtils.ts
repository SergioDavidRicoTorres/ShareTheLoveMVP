// In a utility file or directly in your component
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';




export const handleFirebaseSignOut = async () => {
  try {
    await signOut(FIREBASE_AUTH);
  } catch (error) {
    console.error('Error signing out: ', error);
    // Handle any errors during sign out
  }
};