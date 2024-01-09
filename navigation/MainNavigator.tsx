// MainNavigator.tsx
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";
import AuthNavigator from "./AuthNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { useSpotifyAuth } from "../SpotifyAuthContext";
import { CurrentUserProvider } from "../CurrentUserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from '@react-native-async-storage/async-storage';

function MainNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isSpotifyAuthenticated, setIsSpotifyAuthenticated } =
    useSpotifyAuth();

  useEffect(() => {
    let firestoreUnsubscribe: Unsubscribe | null = null;

    const checkSpotifyToken = async () => {
      const spotifyAccessToken = await AsyncStorage.getItem("accessToken");
      const spotifyExpirationDate = await AsyncStorage.getItem(
        "expirationDate"
      );

      if (spotifyAccessToken && spotifyExpirationDate) {
        const isTokenValid =
          new Date().getTime() < parseInt(spotifyExpirationDate);
        setIsSpotifyAuthenticated(isTokenValid);
        // Add logic to refresh the token if it's not valid.
      } else {
        setIsSpotifyAuthenticated(false);
      }
    };

    checkSpotifyToken();

    const authUnsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        const userRef = doc(FIRESTORE_DB, "users", user.uid);
        firestoreUnsubscribe = onSnapshot(userRef, (docSnapshot) => {
          setIsAuthenticated(docSnapshot.exists() && isSpotifyAuthenticated);
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

  // useEffect(() => {
  //   let firestoreUnsubscribe: Unsubscribe | null = null;
  //   const spotifyAccessToken = await AsyncStorage.getItem("accessToken");
  //   const spotifyExpirationDate = await AsyncStorage.getItem("expirationDate");

  //   // const checkSpotifyToken = async () => {
  //   //   const spotifyAccessToken = await AsyncStorage.getItem("accessToken");
  //   //   setSpotifyAuthenticated(!!spotifyAccessToken);
  //   // };

  //   const authUnsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     if (user) {
  //       const userRef = doc(FIRESTORE_DB, 'users', user.uid);
  //       firestoreUnsubscribe = onSnapshot(userRef, (docSnapshot) => {
  //         setIsAuthenticated(docSnapshot.exists() && spotifyAccessToken && spotifyExpirationDate);
  //         // setIsAuthenticated(docSnapshot.exists() && isSpotifyAuthenticated);
  //         // setIsAuthenticated(isSpotifyAuthenticated);
  //         // console.log(docSnapshot.exists());
  //         // setIsAuthenticated(docSnapshot.exists()); //have to add the spotify auth check
  //         // setIsAuthenticated(true);
  //       });
  //     } else {
  //       setIsAuthenticated(false);
  //       if (firestoreUnsubscribe) {
  //         firestoreUnsubscribe();
  //       }
  //     }
  //   });

  //   return () => {
  //     authUnsubscribe();
  //     if (firestoreUnsubscribe) {
  //       firestoreUnsubscribe();
  //     }
  //   };
  // }, [isSpotifyAuthenticated]); // Include isSpotifyAuthenticated in the dependencies array
  console.log("[ISAUTHENTICATED]: ", isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <CurrentUserProvider>
          <Tabs />
        </CurrentUserProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default MainNavigator;
