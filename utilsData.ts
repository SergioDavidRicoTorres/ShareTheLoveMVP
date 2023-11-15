import untypedUsers from "./Database/users.json";
import untypedPlaylists from "./Database/playlists.json";
import untypedPosts from "./Database/posts.json";
import { Playlist, User, Post, Mood, MoodsAndTagsCatalogue} from "./types";
import untypedMoodsAndTags from "./Database/moodsAndTags.json"

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
    return PLAYLISTS.filter(playlist => playlist.userId === userId && playlist.domainId === domainId);
  }
  

export const getPlaylistsPostsData = (playlistId: number) =>{
    try{
        return POSTS.filter(post => post.playlistId === playlistId);
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