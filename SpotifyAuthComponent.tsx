import { Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { spotifyCredentials } from './secrets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp, MainNavigationProp, SpotifyAuthComponentProp } from './types';
import { normalize } from './utils';


  
  WebBrowser.maybeCompleteAuthSession();
//   const redirectUri = AuthSession.makeRedirectUri({ scheme: 'ShareTheLoveMVP://', path: 'redirect'});
//   console.log("this is the other redirectUri: ", redirectUri)
  

  export const SpotifyAuthComponent = ({authType}: SpotifyAuthComponentProp) => {
    const navigation = useNavigation<AuthNavigationProp>();
    const mainNavigation = useNavigation<MainNavigationProp>();

  
    const login = async () => {
        try {
            const authRequestConfig = {
              responseType: AuthSession.ResponseType.Code,
              clientId: spotifyCredentials.clientId,
              scopes: [], // Add additional scopes as needed
              redirectUri: spotifyCredentials.redirectUri,
              usePKCE: true,
              extraParams: {
                show_dialog: 'true',
              },
            };
            const spotifyDiscovery = {
              authorizationEndpoint: 'https://accounts.spotify.com/authorize',
              tokenEndpoint: 'https://accounts.spotify.com/api/token',
              };
        
            const authRequest = new AuthSession.AuthRequest(authRequestConfig);
            const result = await authRequest.promptAsync(spotifyDiscovery);
            // console.log("result: ", result);
        
            if (result.type === "success") {
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
              AsyncStorage.setItem("accessToken", tokenResult.accessToken)
              AsyncStorage.setItem("refreshToken", tokenResult.accessToken)
              if (tokenResult.expiresIn) {
                    const expirationDate = Date.now() + tokenResult.expiresIn * 1000;
                    AsyncStorage.setItem("expirationDate", expirationDate.toString())
                } else {
                    throw new Error("[tokenResult.expiresIn] was not found");
                }

            }
        } catch (error) {
            console.error("Spotify login error: ", error);
        }
      };
  
  
    return (
        <TouchableOpacity
        onPress={() => {
            login()
            .then(() => {
                if (authType === "Sign Up") {
                    navigation.navigate("SignUpPersonalInfoScreen");
                } else {
                    mainNavigation.navigate("Tabs");
                }
            })
            .catch((error) => {
                console.error("Error during authorization:", error);
            });
        }}
            style={{
              paddingHorizontal: normalize(15),
              paddingVertical: normalize(5),
              justifyContent: "center",
              alignItems: "center",
              gap: normalize(10),
              borderRadius: normalize(20),
              backgroundColor: "rgba(29, 185, 84, 1)",
              flexDirection: "row",
              marginTop: normalize(90),
              bottom: normalize (34),
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
  }
  