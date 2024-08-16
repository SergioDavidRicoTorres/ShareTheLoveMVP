import { Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { spotifyCredentials } from "./secrets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  AuthNavigationProp,
  MainNavigationProp,
  SpotifyAuthComponentProp,
} from "./types";
import { normalize } from "./utils";
import { useSpotifyAuth } from "./SpotifyAuthContext";

// Place it inside a useEffect to ensure it's called only once
//   console.log("this is the other redirectUri: ", redirectUri)

export const SpotifyAuthComponent = ({
  authType,
}: SpotifyAuthComponentProp) => {
  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);
  const navigation = useNavigation<AuthNavigationProp>();
  const { setIsSpotifyAuthenticated } = useSpotifyAuth();

  const login = async () => {
    try {
      console.log("CHECKPOINT 0!");
      const authRequestConfig = {
        responseType: AuthSession.ResponseType.Code,
        clientId: spotifyCredentials.clientId,
        scopes: ["playlist-modify-public", "playlist-modify-private"], // Add additional scopes as needed
        redirectUri: spotifyCredentials.redirectUri,
        usePKCE: true,
        extraParams: {
          show_dialog: "true",
        },
      };
      const spotifyDiscovery = {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        tokenEndpoint: "https://accounts.spotify.com/api/token",
      };
      console.log("CHECKPOINT 1!");
      const authRequest = new AuthSession.AuthRequest(authRequestConfig);
      console.log("CHECKPOINT 2!");
      const result = await authRequest.promptAsync(spotifyDiscovery);
      console.log("CHECKPOINT 3!");
      if (result.type === "success") {
        console.log("CHECKPOINT 4!");
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            code: result.params.code,
            clientId: spotifyCredentials.clientId,
            clientSecret: spotifyCredentials.clientSecret, // Required for Spotify token exchange
            redirectUri: spotifyCredentials.redirectUri,
            extraParams: authRequest.codeVerifier
              ? { code_verifier: authRequest.codeVerifier }
              : undefined,
          },
          spotifyDiscovery
        );
        AsyncStorage.setItem("accessToken", tokenResult.accessToken as string);
        AsyncStorage.setItem(
          "refreshToken",
          tokenResult.refreshToken as string
        );
        if (tokenResult.expiresIn) {
          const expirationDate = Date.now() + tokenResult.expiresIn * 1000;
          AsyncStorage.setItem("expirationDate", expirationDate.toString());
        } else {
          throw new Error("[tokenResult.expiresIn] was not found");
        }
        setIsSpotifyAuthenticated(true);
      }
    } catch (error) {
      console.error("Spotify login error: ", error);
      setIsSpotifyAuthenticated(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        login()
          .then(() => {
            if (authType === "Sign Up") {
              navigation.navigate("SignUpPersonalInfoScreen");
            }
          })
          .catch((error) => {
            console.error("Error during authorization:", error);
          });
      }}
      style={{
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(5),
        justifyContent: "center",
        alignItems: "center",
        gap: normalize(10),
        borderRadius: normalize(15),
        flexDirection: "row",
        marginTop: normalize(90),
        bottom: normalize(50),
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: normalize(10),
        backgroundColor: "rgba(20, 97, 69, 1)",
        borderColor: "rgba(29, 185, 84, 1)",
        borderWidth: normalize(4),
        shadowColor: "rgba(29, 185, 84, 1)",
      }}
    >
      <Image
        style={{ width: 35, height: 35 }}
        source={require("./assets/icons/SpotifyIcon.png")}
      />
      <Text
        style={{
          color: "white",
          fontSize: normalize(20),
          fontWeight: "800",
          // letterSpacing: -1,
        }}
      >
        Link with Spotify
      </Text>
    </TouchableOpacity>
  );
};
