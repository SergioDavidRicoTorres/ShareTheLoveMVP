import untypedUsers from "./Database/users.json";
import untypedPlaylists from "./Database/playlists.json";
import untypedPosts from "./Database/posts.json";
import {
  Playlist,
  User,
  Post,
  Mood,
  MoodsAndTagsCatalogue,
  MoodsAndTagsCategory,
} from "./types";
import {
  getAuthSpotifyUserData,
  checkTokenValidity,
} from "./AuthorizationSpotify";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Linking } from "react-native";

const convertUsersToDateObjects = (untypedUsers: any[]): User[] => {
  return untypedUsers.map((user) => {
    return {
      ...user,
      dateOfBirth: new Date(user.dateOfBirth), // Convert dateOfBirth string to Date
    };
  });
};

const USERS: User[] = convertUsersToDateObjects(untypedUsers);
// const PLAYLISTS: Playlist[] = untypedPlaylists;
// const POSTS: Post[] = untypedPosts;
// const MOODSANDTAGS: MoodsAndTagsCatalogue = untypedMoodsAndTags;

export const DEFAULT_USER: User = {
  name: "Default User Name",
  profileName: "Default_User_Profile_Name",
  dateOfBirth: new Date("1990-04-14T00:00:00.000Z"),
  profilePicture:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png",
  profileDescription: "Default Profile Descriptino",
  followersCount: 0,
  followingCount: 0,
  followersUsersList: [],
  followingUsersList: [],
  domainsOfTaste: {
    Music: {
      domainId: 0,
      isActive: true,
      score: 0,
      reviewsList: [],
    },
    FilmsTVShows: {
      domainId: 1,
      isActive: true,
      score: 0,
      reviewsList: [],
    },
    PodcastsEpisodes: {
      domainId: 2,
      isActive: true,
      score: 0,
      reviewsList: [],
    },
  },
};

// export const getCurrentUserId = () => {
//     return 0;
// }

export const getUsers = () => {
  return USERS;
};

// export const getPosts = () => {
//   return POSTS;
// };

export const getUserData = (userId: number): User => {
  try {
    return USERS[userId];
  } catch (error) {
    console.error("Error fetching current user data:", error);
    return USERS[0];
  }
};
// const fetchUserById = async (userId: string) => {
//   const userRef = doc(FIRESTORE_DB, 'users', userId);
//   const docSnap = await getDoc(userRef);

//   if (docSnap.exists()) {
//     console.log('User data:', docSnap.data());
//     return docSnap.data(); // or docSnap.data() to get the data of the document
//   } else {
//     console.log('No such user!');
//     return null;
//   }
// };

// export const getUserDataById = async (userId: string) => {
//   try {
//     const user: User | null = await fetchUserById(userId);
//     if (user) {
//       // User is found
//       console.log(user);
//       return user;
//     } else {
//       // User is not found, throw an error
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// };

// export const getPlaylistsPostsData = (playlistId: string) => {
//   try {
//     console.log("PLAYLISTID: ", playlistId);
//     const filteredPosts = POSTS.filter((post) => {
//       return post.playlistId === playlistId;
//     });
//     return filteredPosts;
//   } catch (error) {
//     console.error("Error fetching current user data:", error);
//     return [];
//   }
// };

export const getUsersDomains = (user: User) => {
  // console.log("|||||||||||||||||||| getUserDomains() is getting called |||||||||||||")
  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ USER.DOMAINSOFTASTE");
  // console.log(user.domainsOfTaste);
  const domainEntries = Object.values(user.domainsOfTaste);
  const fileteredDomains = domainEntries
    .filter((domain) => domain.isActive)
    .sort((a, b) => a.domainId - b.domainId); // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ FILTERED DOMAINS");
  // console.log(fileteredDomains);
  return fileteredDomains;
};

// export const getPlaylistId = (playlist: Playlist) => {
//   return getPlaylistIndex(playlist.name);
// };

// export const getPlaylistIndex = (playlistName: string) => {
//   return PLAYLISTS.findIndex((playlist) => playlist.name == playlistName);
// };

export const getDomainName = (playlistId: number) => {
  switch (playlistId) {
    case 0:
      return "Music";
    case 1:
      return "Films and TV Shows";
    case 2:
      return "Podcasts Episodes";
    default:
      return "Default Domain";
  }
};

// export const getChronologicallySortedPosts = () => {
//     const postsCopy = [...getPosts()];
//     return postsCopy.sort((a, b) => b.creationTime - a.creationTime);
// };
export const getChronologicallySortedPosts = (posts: Post[]) => {
  if (!Array.isArray(posts)) {
    console.error("Invalid input: posts should be an array");
    return [];
  }

  // Clone and sort the posts array
  return [...posts].sort((a, b) => b.creationTime - a.creationTime);
};

// export const getMoodsAndTagsCategories = (
//   MOODSANDTAGS: MoodsAndTagsCatalogue,
//   postType: string
// ) => {
//   switch (postType) {
//     case "Song":
//       return MOODSANDTAGS.Music;
//     case "Film/TVShow":
//       return MOODSANDTAGS.FilmsAndTVShows;
//     case "PodcastEpisode":
//       return MOODSANDTAGS.PodcastsEpisodes;
//     default:
//       return [];
//   }
// };

// export const getAllMusicMoodAndTags = (MOODSANDTAGS: MoodsAndTagsCatalogue) => {
//   let allMusicMoods: Mood[] = [];
//   const musicMoodsCategories = MOODSANDTAGS.Music;
//   for (const category of musicMoodsCategories) {
//     allMusicMoods = allMusicMoods.concat(category.moodsTagsList);
//   }
//   return allMusicMoods;
// };

// export const getAllFilmsTVShowsMoodAndTags = (
//   MOODSANDTAGS: MoodsAndTagsCatalogue
// ) => {
//   let allFilmsTVShowsMoods: Mood[] = [];
//   const filmsTVShowsMoodsCategories = MOODSANDTAGS.FilmsAndTVShows;
//   for (const category of filmsTVShowsMoodsCategories) {
//     allFilmsTVShowsMoods = allFilmsTVShowsMoods.concat(category.moodsTagsList);
//   }
//   return allFilmsTVShowsMoods;
// };

// export const getAllPodcastsEpisodesMoodAndTags = (
//   MOODSANDTAGS: MoodsAndTagsCatalogue
// ) => {
//   let allPodcastsEpisodesMoods: Mood[] = [];
//   const podcastsEpisodesMoodsCategories = MOODSANDTAGS.PodcastsEpisodes;
//   for (const category of podcastsEpisodesMoodsCategories) {
//     allPodcastsEpisodesMoods = allPodcastsEpisodesMoods.concat(
//       category.moodsTagsList
//     );
//   }
//   return allPodcastsEpisodesMoods;
// };

// export const getAllMoodsAndTagsArray = (
//   moodsAndTags: MoodsAndTagsCatalogue
// ) => {
//   console.log("[getAllMusicMoodAndTagsArrays()]: MOODSANDTAGS :", moodsAndTags);

//   let allMoods: Mood[] = [];
//   allMoods = allMoods.concat(getAllMusicMoodAndTags(moodsAndTags));
//   allMoods = allMoods.concat(getAllFilmsTVShowsMoodAndTags(moodsAndTags));
//   allMoods = allMoods.concat(getAllPodcastsEpisodesMoodAndTags(moodsAndTags));
//   // console.log(allMoods)
//   return allMoods;
// };

export const searchPodcastEpisode = async (searchName: string) => {
  try {
    checkTokenValidity();
    const accessToken = await getAuthSpotifyUserData("accessToken");
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchName}&type=episode&limit=50`,
      {
        method: "GET",
        headers: {
          "Conten-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Response.status: ", response.status);
    const data = await response.json();
    return data.episodes.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchSong = async (searchName: string) => {
  try {
    checkTokenValidity();
    const accessToken = await getAuthSpotifyUserData("accessToken");
    // fetch list of results from the search
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchName}&type=track&limit=50`,
      {
        method: "GET",
        headers: {
          "Conten-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Response.status: ", response.status);
    const data = await response.json();
    //   console.log("[DATA]: ", data.tracks.items)
    return data.tracks.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const clusterPostsByPlaylistId = (
  posts: Post[]
): Map<string, Post[]> => {
  const clusters = new Map<string, Post[]>();
  // console.log("==================================================")
  // console.log("================= UNCLUSTERED POSTS ===================")
  // console.log(posts);
  // console.log("==================================================")

  posts.forEach((post) => {
    const playlistPosts = clusters.get(post.playlistId) || [];
    // console.log("@@@@@@@@@@@@@@@@@@@@@")
    // console.log("post", post)
    // console.log("post.playlistId", post.playlistId)
    playlistPosts.push(post);
    clusters.set(post.playlistId, playlistPosts);
  });

  return clusters;
};

export const playSpotifyPreviewSound = async (
  previewUrl: string,
  setSound: Function,
  setIsPlaying: Function
) => {
  try {
    if (previewUrl) {
      // Set audio mode to play in silent mode on iOS
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
      const { sound } = await Audio.Sound.createAsync(
        { uri: previewUrl },
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if ("isPlaying" in status) {
          setIsPlaying(status.isPlaying);
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const stopSpotifyPreviewSound = async (
  sound: Audio.Sound | null,
  setIsPlaying: Function
) => {
  try {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  } catch (error) {
    console.error(error);
  }
};

export const openSpotifyLink = (url: string) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};
