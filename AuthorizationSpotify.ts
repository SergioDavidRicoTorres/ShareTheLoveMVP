import { spotifyCredentials } from "./secrets";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const tokenExpirationDate = await AsyncStorage.getItem("expirationDate");

    if (accessToken && tokenExpirationDate) {
      const currentTime = Date.now();
      if (currentTime < parseInt(tokenExpirationDate)) {
        // Token is still valid
        return true;
      } else {
        // Token is expired, attempt to refresh it
        const result = await refreshToken();
        return result; // true if refreshed successfully, false otherwise
      }
    } else {
      console.log("No Spotify account has logged in yet!");
      return false; // No access token or expiration date, prompt login
    }
  } catch (error) {
    console.error("Error at checkTokenValidity(): ", error);
    return false;
  }
};

const refreshToken = async () => {
  try {
    const oldRefreshToken = await AsyncStorage.getItem("refreshToken");
    if (!oldRefreshToken) throw new Error("Refresh token not available");

    const tokenResult = await AuthSession.refreshAsync(
      {
        clientId: spotifyCredentials.clientId,
        clientSecret: spotifyCredentials.clientSecret,
        refreshToken: oldRefreshToken,
        // scopes: ["playlist-modify-public", "playlist-modify-private"],
        extraParams: {
          grant_type: "refresh_token",
        },
      },
      {
        tokenEndpoint: "https://accounts.spotify.com/api/token",
      }
    );

    if (tokenResult.accessToken && tokenResult.expiresIn) {
      const expirationDate = Date.now() + tokenResult.expiresIn * 1000;
      await AsyncStorage.setItem("accessToken", tokenResult.accessToken);
      await AsyncStorage.setItem("expirationDate", expirationDate.toString());

      // Update refresh token if a new one is provided
      if (tokenResult.refreshToken) {
        await AsyncStorage.setItem("refreshToken", tokenResult.refreshToken);
      }

      return true;
    } else {
      throw new Error("accessToken or accessTokenExpirationDate was not found");
    }
  } catch (error) {
    console.error("Error at refreshToken(): ", error);
    return false;
  }
};

export { getAuthSpotifyUserData, checkTokenValidity, refreshToken };
