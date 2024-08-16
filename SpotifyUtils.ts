import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebaseConfig";
import * as FileSystem from "expo-file-system";
import { Playlist, Post } from "./types";
import { checkTokenValidity } from "./AuthorizationSpotify";

const getSpotifyUserId = async (accessToken: string) => {
  try {
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await userResponse.json();
    if (!userResponse.ok) {
      throw new Error("Failed to retrieve Spotify user information.");
    }
    return userData.id;
  } catch (error) {
    console.error("Error fetching Spotify user ID:", error);
    throw error;
  }
};

const createSpotifyPlaylistOnSpotify = async (
  playlist: Playlist,
  spotifyUserId: string,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlist.name,
          description: 'Playlist created from "Share The Love"',
          public: false,
        }),
      }
    );
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.error.message);
    }
    return {
      spotifyPlaylistId: data.id,
    };
  } catch (error) {
    console.error("Error creating Spotify playlist:", error);
    throw error;
  }
};

const extractTrackUris = (posts: Post[]) => {
  try {
    const mediaItemIds = posts
      .map((post) => post.mediaItem?.id)
      .filter(Boolean);

    const trackUris = mediaItemIds.map((id) => `spotify:track:${id}`);

    if (trackUris.length > 50) {
      alert("Only the first 50 tracks will be added to the playlist.");
      trackUris.splice(50); // Keep only the first 50 items
    }

    return trackUris;
  } catch (error) {
    console.error("Error extracting track URIs:", error);
    throw error;
  }
};

const addTracksToSpotifyPlaylist = async (
  spotifyPlaylistId: string,
  trackUris: string[],
  accessToken: string
) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${spotifyPlaylistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );

    if (response.status !== 201) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    console.log("Tracks successfully added to the playlist!");
  } catch (error) {
    console.error("Error adding tracks to Spotify playlist:", error);
    throw error;
  }
};

// const uploadPlaylistCoverImage = async (
//   spotifyPlaylistId: string,
//   accessToken: string
// ) => {
//   try {
//     const imageUri = require("./assets/icons/ShareTheLoveLOGO.jpg");
//     const base64Image = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     const imageResponse = await fetch(
//       `https://api.spotify.com/v1/playlists/${spotifyPlaylistId}/images`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "image/jpeg",
//         },
//         body: base64Image,
//       }
//     );

//     if (!imageResponse.ok) {
//       throw new Error(await imageResponse.text());
//     }

//     console.log("Cover image uploaded successfully.");
//   } catch (error) {
//     console.error("Error uploading cover image:", error);
//   }
// };

const updateFirestorePlaylist = async (
  playlistId: string,
  spotifyId: string
) => {
  try {
    const playlistRef = doc(FIRESTORE_DB, "playlists", playlistId);
    await updateDoc(playlistRef, {
      isSpotifySynced: true,
      spotifyId: spotifyId,
    });
  } catch (error) {
    console.error("Error updating Firestore document:", error);
    throw error;
  }
};

export const createSpotifyPlaylist = async (
  playlist: Playlist,
  posts: Post[]
) => {
  try {
    if (!playlist.playlistId) {
      throw new Error(
        "Playlist ID is undefined. Cannot update Firestore document."
      );
    }

    const tokenValid = await checkTokenValidity();
    if (!tokenValid) {
      return {
        success: false,
        message: "Spotify token is invalid. Please log in again.",
      };
    }

    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is null. Please log in again.");
    }
    const spotifyUserId = await getSpotifyUserId(accessToken);

    const { spotifyPlaylistId } = await createSpotifyPlaylistOnSpotify(
      playlist,
      spotifyUserId,
      accessToken
    );

    const trackUris = extractTrackUris(posts);
    await addTracksToSpotifyPlaylist(spotifyPlaylistId, trackUris, accessToken);

    // await uploadPlaylistCoverImage(spotifyPlaylistId, accessToken);

    await updateFirestorePlaylist(playlist.playlistId, spotifyPlaylistId);

    return { success: true, spotifyId: spotifyPlaylistId };
  } catch (error) {
    console.error("Error in createSpotifyPlaylist:", error);
    return {
      success: false,
      message: "An error occurred while creating the playlist.",
    };
  }
};

export const addTrackToSpotifyPlaylist = async (
  mediaItemId: string,
  spotifyPlaylistId: string
) => {
  try {
    const tokenValid = await checkTokenValidity();
    if (!tokenValid) {
      return {
        success: false,
        message: "Spotify token is invalid. Please log in again.",
      };
    }

    const accessToken = await AsyncStorage.getItem("accessToken");

    // Construct the Spotify URI for the track
    const trackUri = `spotify:track:${mediaItemId}`;

    // Add the track to the Spotify playlist
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${spotifyPlaylistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [trackUri], // Only adding a single track
        }),
      }
    );

    if (response.status !== 201) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    console.log("Track successfully added to the playlist!");

    return { success: true };
  } catch (error) {
    console.error("Error adding track to Spotify playlist:", error);
    return {
      success: false,
      message: "An error occurred while adding the track to the playlist.",
    };
  }
};
