// ::::::::::::::::: BEGIN AUTHORIZATION CODE FLOW: STEP 1 :::::::::::::::::::::::::::::::::
import * as AuthSession from 'expo-auth-session';
import { encode as btoa } from 'base-64'; // AUTHORIZATION CODE FLOW: STEP 2
import AsyncStorage from '@react-native-async-storage/async-storage';
import { spotifyCredentials } from '../secrets';

const setUserData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
};

const getUserData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const scopesArr = [
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-modify',
  'user-library-read',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-read-recently-played',
  'user-top-read',
];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  let result;
  try {
    // const credentials = await getSpotifyCredentials() //we wrote this function above
    // const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
    result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize'
        + '?response_type=code'
        + `&client_id=${
          spotifyCredentials.clientId
        }${scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
        }&redirect_uri=${
          encodeURIComponent(spotifyCredentials.redirectUri)}`,
    });
  } catch (err) {
    console.error(err);
  }
  return result.params.code;
};

// ::::::::::::::::: END AUTHORIZATION CODE FLOW: STEP 1 :::::::::::::::::::::::::::::::::
// ::::::::::::::::: BEGIN AUTHORIZATION CODE FLOW: STEP 2 :::::::::::::::::::::::::::::::::

// temporary user

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode(); // we wrote this function above
    // const credentials = await getSpotifyCredentials() //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
    const credsB64 = btoa(
      `${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`,
    );
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${spotifyCredentials.redirectUri}`,
    });
    const responseJson = await response.json();
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await setUserData('accessToken', accessToken);
    await setUserData('refreshToken', refreshToken);
    await setUserData('expirationTime', JSON.stringify(expirationTime));
  } catch (err) {
    console.error(err);
  }
};

// ::::::::::::::::: END AUTHORIZATION CODE FLOW: STEP 2 :::::::::::::::::::::::::::::::::
// ::::::::::::::::: BEGIN AUTHORIZATION CODE FLOW: STEP 3 :::::::::::::::::::::::::::::::::

const refreshTokens = async () => {
  console.log('REFRESH TOKEN');
  try {
    // const credentials = await getSpotifyCredentials(); //we wrote this function above
    const credsB64 = btoa(
      `${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`,
    );
    const refreshToken = await getUserData('refreshToken');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await setUserData('accessToken', newAccessToken);
      if (newRefreshToken) {
        await setUserData('refreshToken', newRefreshToken);
      }
      await setUserData('expirationTime', JSON.stringify(expirationTime));
    }
  } catch (err) {
    console.error(err);
  }
};
// ::::::::::::::::: END AUTHORIZATION CODE FLOW: STEP 3 :::::::::::::::::::::::::::::::::

export {
  setUserData,
  getUserData,
  getAuthorizationCode,
  getTokens,
  refreshTokens,
};
