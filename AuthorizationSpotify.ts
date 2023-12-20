// import * as AppAuth from 'expo-app-auth';
import { spotifyCredentials } from './secrets';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthSpotifyUserData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  


const checkTokenValidity = async () => {
  try{
    
    const accessToken = await AsyncStorage.getItem("accessToken");
    const tokenExpirationDate = await AsyncStorage.getItem("expirationDate");

    if (accessToken && tokenExpirationDate) {
      const currentTime = Date.now();
      if (currentTime < parseInt(tokenExpirationDate)) {
        // Token is still valid
        return;
      } else {
            // Token is expired, attempt to refresh it
            await refreshToken();
        }
    } else {
        console.log("No spotify account has logged in yet!")
        return null; // in order to know when to send back the user to the login screen
        // No access token or expiration date, redirect to login
    }
  } catch (error) {
    console.error("Error at checkTokenValidity(): ", error)
  }
};

const refreshToken = async () => {
  try{
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Refresh token not available");

    const tokenResult = await AuthSession.refreshAsync(
      {
        clientId: spotifyCredentials.clientId,
        clientSecret: spotifyCredentials.clientSecret,
        refreshToken: refreshToken,
        scopes: ['user-read-private', 'user-read-email'],
        extraParams: {
          grant_type: 'refresh_token',
        },
      },
      {
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      }
      );
      console.log("We're getting here!!!!!!!!!!!!!!!!!!")
      if (tokenResult.accessToken && tokenResult.expiresIn) {
          const expirationDate = Date.now() + tokenResult.expiresIn * 1000;
          await AsyncStorage.setItem("accessToken", tokenResult.accessToken);
          await AsyncStorage.setItem("expirationDate", expirationDate.toString());
      } else {
          throw new Error("accessToken or accessTokenExpirationDate was not found");
      }
  } catch (error){
    console.error("Error at refreshToken(): ", error)
  }

  };

// const refreshToken = async () => {
//     try {
//         const refreshToken = await AsyncStorage.getItem("refreshToken");
//         if (!refreshToken) throw new Error("Refresh token not available");

//         const newAuthState = await refresh(spotifyConfig, {
//             refreshToken: refreshToken});
//         if (newAuthState.accessToken && newAuthState.accessTokenExpirationDate) {
//             const expirationDate = new Date(newAuthState.accessTokenExpirationDate).getTime();
//             await AsyncStorage.setItem("accessToken", newAuthState.accessToken);
//             await AsyncStorage.setItem("expirationDate", expirationDate.toString());
//         } else {
//             throw new Error("accessToken or accessTokenExpirationDate was not found");
//         }
//     } catch (error) {
//         console.error("Token refresh error: ", error);
//         console.log("No spotify account has logged in yet!")
//         return null; // in order to know when to send back the user to the login screen
//         // Handle the error, e.g., redirect to login
//     }
// };

export {
    getAuthSpotifyUserData, 
    checkTokenValidity,
    refreshToken
};