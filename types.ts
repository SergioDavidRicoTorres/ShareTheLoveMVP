import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface Profile {
  profileName: string;
  id: number;
  name: string;
  profilePicture: string;
  profileDescription: string;
  domainsOfTaste: Domain[];
}

export interface Domain {
  id: number;
  name: string;
  score: number;
  playlists: Playlist[];
}

export interface Playlist {
  id: number;
  name: string;
  image: string;
  moods: Mood[];
  score: number;
  posts: Post[];
}

export interface Mood {
  id: number;
  name: string;
}

export interface Post {
  mediaItem: any; // will be defined by the used media API's Item
  moods: string[];
  caption: string;
}


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
          domainOfTaste: Domain, 
          user: Profile
        }
        MediaItemsViewScreen: {
          domainOfTaste: Domain, 
          post: Post, 
          user: Profile, 
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
    

    export type PlaylistsMediaItemComponent = {
        domainOfTaste: Domain,
        item: any,
        navigation: ProfileNavigationProp,
        user: Profile,
    };

    export type AuthEmailPasswordScreenRouteProp = RouteProp<AuthNavigatorParamsList, 'AuthEmailPasswordScreen'>;
    // export type AuthEmailPasswordScreenNavigationProp = StackNavigationProp<AuthNavigatorParamsList,'AuthEmailPasswordScreen'>;
    // export type AuthEmailPasswordProps = {
    // route: AuthEmailPasswordScreenRouteProp;
    // navigation: AuthStackNavigationProp;
    // };