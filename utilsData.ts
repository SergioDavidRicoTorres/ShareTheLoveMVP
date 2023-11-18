import untypedUsers from "./Database/users.json";
import untypedPlaylists from "./Database/playlists.json";
import untypedPosts from "./Database/posts.json";
import { Playlist, User, Post, Mood, MoodsAndTagsCatalogue, MoodsAndTagsCategory} from "./types";
import untypedMoodsAndTags from "./Database/moodsAndTags.json"
import { getAuthSpotifyUserData, checkTokenValidity } from "./AuthorizationSpotify";


const USERS: User[] = untypedUsers;
const PLAYLISTS: Playlist[] = untypedPlaylists;
const POSTS: Post[] = untypedPosts;
const MOODSANDTAGS: MoodsAndTagsCatalogue = untypedMoodsAndTags; 

export const getCurrentUserId = () => {
    return 0;
}

export const getUsers = () => {
    return USERS;
}

export const getPosts = () => {
    return POSTS;
}

export const getUserData = (userId: number): User => {
    try {
      return USERS[userId];
    } catch (error) {
      console.error("Error fetching current user data:", error);
      return USERS[0];
    }
};

export const getDomainsPlaylistsData = (userId: number, domainId?: number) => {
    if (domainId === undefined) {
      return [];
    }
    // console.log("DOMAINID: ", domainId); 
    return PLAYLISTS.filter(playlist => playlist.userId === userId && playlist.domainId === domainId);
  }
  

export const getPlaylistsPostsData = (playlistId: number) =>{
    try{
        console.log("PLAYLISTID: ", playlistId); 
        const filteredPosts = POSTS.filter(post => { return post.playlistId === playlistId});
        return filteredPosts; 
    } catch (error) {
        console.error("Error fetching current user data:", error);
        return [];
    }
}

export const getUsersDomains = (user: User) => {
    const domainEntries = Object.values(user.domainsOfTaste);
    return domainEntries.filter((domain) => domain.isActive);
}

export const getPlaylistId = (playlist: Playlist) => {
    return getPlaylistIndex(playlist.name); 
}

export const getPlaylistIndex = (playlistName: string) => {
    return PLAYLISTS.findIndex( playlist => playlist.name == playlistName)
}

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
}

export const getChronologicallySortedPosts = () => {
    const postsCopy = [...getPosts()];
    return postsCopy.sort((a, b) => b.creationTime - a.creationTime);
};

export const getMoodsAndTagsCategories = (postType: string) =>  {
    switch (postType) {
        case "Song": 
            return MOODSANDTAGS.Music; 
        case "Film/TVShow": 
            return MOODSANDTAGS.FilmsAndTVShows; 
        case "PodcastEpisode": 
            return MOODSANDTAGS.PodcastsEpisodes; 
        default: 
            return [];
    }
}

export const getAllMusicMoodAndTags = () =>  {
    let allMusicMoods: Mood[] = [];
    const musicMoodsCategories = MOODSANDTAGS.Music; 
    for (const category  of musicMoodsCategories) {
        allMusicMoods = allMusicMoods.concat(category.moodsTagsList); 
    }
    return allMusicMoods;
}

export const getAllFilmsTVShowsMoodAndTags = () =>  {
    let allFilmsTVShowsMoods: Mood[] = [];
    const filmsTVShowsMoodsCategories = MOODSANDTAGS.FilmsAndTVShows; 
    for (const category  of filmsTVShowsMoodsCategories) {
        allFilmsTVShowsMoods = allFilmsTVShowsMoods.concat(category.moodsTagsList); 
    }
    return allFilmsTVShowsMoods;
}

export const getAllPodcastsEpisodesMoodAndTags = () =>  {
    let allPodcastsEpisodesMoods: Mood[] = [];
    const podcastsEpisodesMoodsCategories = MOODSANDTAGS.PodcastsEpisodes; 
    for (const category  of podcastsEpisodesMoodsCategories) {
        allPodcastsEpisodesMoods = allPodcastsEpisodesMoods.concat(category.moodsTagsList); 
    }
    return allPodcastsEpisodesMoods;
}



export const getAllMoodsAndTagsArray = () =>{
    let allMoods: Mood[] = [];
    allMoods = allMoods.concat(getAllMusicMoodAndTags());
    allMoods = allMoods.concat(getAllFilmsTVShowsMoodAndTags()); 
    allMoods = allMoods.concat(getAllPodcastsEpisodesMoodAndTags());
    return allMoods; 
}

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
  }

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
      console.log("[DATA]: ", data);

      console.log("[DATA]: ", data.tracks.items)
      return data.tracks.items;
    } catch (error) {
      console.error(error);
      return [];
    }  
  }