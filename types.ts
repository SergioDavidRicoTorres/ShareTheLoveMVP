import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface User {
    name: string;
    profileName: string;
    profilePicture: string;
    profileDescription: string;
    followersCount: number; 
    followingCount: number; 
    domainsOfTaste: {
        Music: Domain,
        FilmsTVShows: Domain, 
        PodcastsEpisodes: Domain
    }
}

export interface Domain {
  isActive: boolean;
  domainId: number;
  score: number;
}

export interface Playlist {
    userId: number;
    domainId: number;
    name: string;
    image?: string;
    moods: Mood[];
    score: number;
}

export interface Mood {
  id: number;
  name: string;
  isSelected: boolean;
  creator: string; 
}

export interface MoodsAndTagsCategory {
  categoryId: number; 
  name: string; 
  moodsTagsList: Mood[];
}

// export interface MoodsAndTagsCatalogue {
//   Music: MoodsAndTagsCategory[]; 
//   FilmsAndTVShows: MoodsAndTagsCategory[]; 
//   PodcastsEpisodes: MoodsAndTagsCategory[];
// }
export interface MoodsAndTagsCatalogue {
  [key: string]: MoodsAndTagsCategory[];
}

export interface Post {
    userId: number; 
    domainId: number; 
    playlistId: number; 
    moods: Mood[];
    caption: string;
    likesCount: number;
    creationTime: number; 
    mediaItem: any; // will be defined by the used media API's Item
}

// export type Song = {
//     name: string;
//     mediaType: 'Song';
//     album: string;
//     artists: string[];
//     image: string;
//   };
  
// export type FilmOrTVShow = {
//     name: string;
//     mediaType: 'Film' | 'TV Show';
//     overview?: string;
//     image: string;
//   };

// export type PodcastEpisode = {
//     name: string;
//     mediaType: 'Podcast Episode';
//     description: string;
//     image: string;
//   };


    export type MainNavigatorParamsList = {
    AuthNavigator: undefined; 
    Tabs: undefined;
    }
    export type AuthNavigatorParamsList = {
        AuthScreen: undefined; 
        AuthEmailPasswordScreen: {
            authType: string
        }; 
        SignUpPersonalInfoScreen: undefined; 
        SignUpEndScreen: undefined; //HAS TO BE UPDATED: Passing of parameters hasn't been setup
    }
    export type HomeNavigatorParamsList = {
        HomeScreen: undefined;
        SearchUserScreen: undefined;
    }
    export type ProfileNavigatorParamsList = {
        ProfileScreen: undefined; 
        DomainOfTaste: {
          domainOfTaste: Domain, //NEEDS TO BE UPDATED BASED ON THE FIRESTORE SETUP: DOMAINS_COLLECTION
          user: User //NEEDS TO BE UPDATED BASED ON THE FIRESTORE SETUP: USERS_COLLECTION
        }
        PostsViewScreen: {
          domainOfTaste: Domain, 
          post: Post, 
          user: User, 
        }
      }

    export type MainNavigationProp = StackNavigationProp<MainNavigatorParamsList>;
    export type HomeNavigationProp = StackNavigationProp<HomeNavigatorParamsList>;
    export type AuthNavigationProp = StackNavigationProp<AuthNavigatorParamsList>;
    export type ProfileNavigationProp = StackNavigationProp<ProfileNavigatorParamsList>;



    // export type AuthScreenNavigationProp = StackNavigationProp<AuthNavigatorParamsList,'AuthScreen'>;
    // export type AuthProps = {
    // navigation: AuthScreenNavigationProp;
    // };

    export type AuthOptionsProps = {
        visible: boolean;
        onClose: () => void;
        navigation: AuthNavigationProp;
        authType: string;
      };

    export type PlaylistCardProps = {
      playlist: Playlist;
      domainOfTaste: Domain;
      navigation: ProfileNavigationProp,
      user: User,
    };

    export type SettingsProps = {
      visible: boolean;
      onClose: () => void;
      // navigation: AuthNavigationProp;
      // authType: string;
    };

    export type PostCardProps = {
      post: Post;
    };
    
    export type PlaylistsMediaItemComponentProps = {
        domainOfTaste: Domain,
        item: Post,
        navigation: ProfileNavigationProp,
        user: User,
    };

    export type MediaItemInfoProps = { 
      visible: boolean; 
      onClose: () => void;
      mediaItem: any; 
    }

    export type SearchMediaProps = {
      visible: boolean; 
      onClose: () => void;
      postType: string; 
    }

    export type MoodsTagsProps = {
      visible: boolean; 
      onClose: () => void;
      onCloseAll: () => void;
      postSelectedMedia: any; 
      postType: string; 
    }
    export type AddMoodProps = {
      visible: boolean; 
      onClose: () => void;
    }

    export type PostCaptionProps = {
      visible: boolean; 
      onClose: () => void;
      onCloseAll: () => void;
      postSelectedMedia: any; 
      postType: string; 
      postSelectedMoodsTags: Mood[];
    }

    export type SearchPlaylistProps = {
      visible: boolean; 
      onClose: () => void;
      onCloseAll: () => void;
      postSelectedMedia: any; 
      postType: string; 
      postSelectedMoodsTags: Mood[]; 
      postInsertedCaption: string ;
    }

    export type AddPlaylistProps = {
      visible: boolean; 
      onClose: () => void;
      onCloseAll: () => void;
      postSelectedMedia: any; 
      postSelectedMoodsTags: Mood[];
      postType: string; 
      postInsertedCaption: string; 
    }

    export type SpotifyAuthComponentProp = {
      authType: string;
    }



    export type AuthEmailPasswordScreenRouteProp = RouteProp<AuthNavigatorParamsList, 'AuthEmailPasswordScreen'>;
    export type PostsViewScreenRouteProp = RouteProp<ProfileNavigatorParamsList, 'PostsViewScreen'>;
    export type DomainOfTasteScreenRouteProp = RouteProp<ProfileNavigatorParamsList, 'PostsViewScreen'>;


    // export type AuthEmailPasswordScreenNavigationProp = StackNavigationProp<AuthNavigatorParamsList,'AuthEmailPasswordScreen'>;
    // export type AuthEmailPasswordProps = {
    // route: AuthEmailPasswordScreenRouteProp;
    // navigation: AuthStackNavigationProp;
    // };