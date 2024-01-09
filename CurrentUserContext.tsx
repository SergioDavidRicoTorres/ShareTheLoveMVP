import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "./types";
import { FIREBASE_AUTH, FIRESTORE_DB } from "./firebaseConfig";
import { fetchUserById } from "./utilsFirebase";
import { doc, onSnapshot } from "firebase/firestore";

// Create a context for the current user
const CurrentUserContext = createContext<{
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

type CurrentUserProviderProps = {
  children: ReactNode;
};

// CurrentUserProvider component
export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = FIREBASE_AUTH.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Create a reference to the user document
        const userRef = doc(FIRESTORE_DB, "users", firebaseUser.uid);

        // Set up the real-time listener to the user document
        const unsubscribeFirestore = onSnapshot(userRef, (documentSnapshot) => {
          if (documentSnapshot.exists()) {
            setCurrentUser({
              userId: firebaseUser.uid,
              ...(documentSnapshot.data() as User),
            });
          } else {
            // Handle the case where the user document does not exist
            setCurrentUser(null);
          }
        });

        // Unsubscribe from firestore updates when the component unmounts
        return () => unsubscribeFirestore();
      } else {
        setCurrentUser(null);
      }
    });

    // Unsubscribe from auth updates when the component unmounts
    return () => unsubscribeAuth();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

// Hook to use the current user context
export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};
