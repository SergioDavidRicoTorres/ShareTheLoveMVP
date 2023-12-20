// MainNavigator.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";
import AuthNavigator from "./AuthNavigator";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { Unsubscribe, doc, onSnapshot } from 'firebase/firestore';
import { useSpotifyAuth } from '../SpotifyAuthContext';
import { CurrentUserProvider } from '../CurrentUserContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

function MainNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isSpotifyAuthenticated } = useSpotifyAuth();

  useEffect(() => {
    let firestoreUnsubscribe: Unsubscribe | null = null;

    // const checkSpotifyToken = async () => {
    //   const spotifyAccessToken = await AsyncStorage.getItem("accessToken");
    //   setSpotifyAuthenticated(!!spotifyAccessToken);
    // };

    const authUnsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        const userRef = doc(FIRESTORE_DB, 'users', user.uid);
        firestoreUnsubscribe = onSnapshot(userRef, (docSnapshot) => {
          setIsAuthenticated(docSnapshot.exists() && isSpotifyAuthenticated); 
          // setIsAuthenticated(docSnapshot.exists()); //have to add the spotify auth check
        });
      } else {
        setIsAuthenticated(false);
        if (firestoreUnsubscribe) {
          firestoreUnsubscribe();
        }
      }
    });

    return () => {
      authUnsubscribe();
      if (firestoreUnsubscribe) {
        firestoreUnsubscribe();
      }
    };
  }, [isSpotifyAuthenticated]); // Include isSpotifyAuthenticated in the dependencies array

  return (
    <NavigationContainer>
      {isAuthenticated ? 
      <CurrentUserProvider>
        <Tabs/> 
      </CurrentUserProvider>
      : 
      <AuthNavigator />
      }
    </NavigationContainer>
  );
}

export default MainNavigator;

