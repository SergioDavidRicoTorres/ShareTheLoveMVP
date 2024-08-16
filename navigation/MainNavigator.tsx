import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";
import AuthNavigator from "./AuthNavigator";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { useSpotifyAuth } from "../SpotifyAuthContext";
import { CurrentUserProvider } from "../CurrentUserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import { checkTokenValidity, refreshToken } from "../AuthorizationSpotify";
import { MoodsAndTagsProvider } from "../MoodsAndTagsContext";

SplashScreen.preventAutoHideAsync();

function MainNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpotifyAuthChecked, setIsSpotifyAuthChecked] = useState(false);
  const { isSpotifyAuthenticated, setIsSpotifyAuthenticated } =
    useSpotifyAuth();

  const checkSpotifyToken = useCallback(async () => {
    const result = await checkTokenValidity();
    setIsSpotifyAuthenticated(result);
    setIsSpotifyAuthChecked(true);
    return result;
  }, [setIsSpotifyAuthenticated]);

  useEffect(() => {
    let firestoreUnsubscribe: Unsubscribe | null = null;
    let refreshInterval: NodeJS.Timeout | null = null;

    const initializeAuth = async () => {
      const spotifyTokenValid = await checkSpotifyToken();

      const authUnsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if (user) {
          const userRef = doc(FIRESTORE_DB, "users", user.uid);
          firestoreUnsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (isSpotifyAuthChecked) {
              setIsAuthenticated(
                docSnapshot.exists() && isSpotifyAuthenticated
              );
              setIsLoading(false);
            }
          });
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
          if (firestoreUnsubscribe) {
            firestoreUnsubscribe();
          }
        }
      });

      const idTokenUnsubscribe = onIdTokenChanged(
        FIREBASE_AUTH,
        async (user) => {
          if (user) {
            const token = await user.getIdToken();
            await checkSpotifyToken();
          }
        }
      );

      refreshInterval = setInterval(async () => {
        const result = await refreshToken();
        if (!result) {
          setIsAuthenticated(false);
          if (refreshInterval) clearInterval(refreshInterval);
        }
      }, 45 * 60 * 1000); // Refresh every 45 minutes

      setAppIsReady(true);

      return () => {
        authUnsubscribe();
        idTokenUnsubscribe();
        if (firestoreUnsubscribe) {
          firestoreUnsubscribe();
        }
        if (refreshInterval) {
          clearInterval(refreshInterval);
        }
      };
    };

    initializeAuth();

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [checkSpotifyToken, isSpotifyAuthenticated, isSpotifyAuthChecked]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || isLoading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        {isAuthenticated ? (
          <CurrentUserProvider>
            <MoodsAndTagsProvider>
              <Tabs />
            </MoodsAndTagsProvider>
          </CurrentUserProvider>
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </View>
  );
}

export default MainNavigator;
