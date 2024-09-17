import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface User {
  userId?: string;
  name: string;
  dateOfBirth: Date;
  profileName: string;
  profilePicture?: string;
  profileDescription: string;
  followersCount: number;
  followingCount: number;
  domainsOfTaste: {
    Music: Domain;
    FilmsTVShows: Domain;
    PodcastsEpisodes: Domain;
  };
  followersUsersList: string[];
  followingUsersList: string[];
  playlistsCount: number;
}

export interface Domain {
  isActive: boolean;
  domainId: number;
  score: number;
  reviewsList: DomainReview[];
}

export interface PlaylistReview {
  userId: string;
  score: number;
}

export interface DomainReview {
  userId: string;
  playlistId: string;
  score: number;
}

export interface Playlist {
  playlistId?: string;
  userId: string | number;
  domainId: number;
  name: string;
  image?: string;
  moods: Mood[];
  score: number;
  reviewsList: PlaylistReview[];
  isSpotifySynced: boolean;
  spotifyId: string;
  postsCount: number;
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

export interface MediaItem {
  name: string;
  image: string;
  album?: any;
  artists?: any;
  overview?: string;
  description?: string;
  mediaType?: string;
  externalUrl?: string;
  previewUrl?: string;
}

export interface Post {
  postId?: string;
  userId: string;
  domainId: number;
  playlistId: string;
  moods: Mood[];
  caption: string;
  likesCount: number;
  creationTime: number;
  mediaItem: any; // will be defined by the used media API's Item
  likesUserIdsList: string[];
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
};
export type AuthNavigatorParamsList = {
  // DebuggingScreen: undefined;
  AuthScreen: undefined;
  AuthEmailPasswordScreen: {
    authType: string;
  };
  SignUpPersonalInfoScreen: undefined;
  SignUpEndScreen: {
    name: string;
    profileName: string;
    dateOfBirth: string;
    generalDescription: string;
    // setHasUserDocFirestore: (value: boolean) => void;
  }; //HAS TO BE UPDATED: Passing of parameters hasn't been setup
};

export type TabsNavigatorParamsList = {
  HomeNavigator: undefined;
  ProfileNavigator: {
    selectedUserId?: string;
  };
};

export type HomeNavigatorParamsList = {
  HomeScreen: undefined;
  SearchUserScreen: undefined;
  ExternalProfileScreen: {
    user: User;
  };
  ProfileContentNavigator: undefined;
};

export type ExploreNavigatorParamsList = {
  ExploreScreen: undefined;
  ExternalProfileScreen: {
    user: User;
  };
  ProfileContentNavigator: undefined;
};

export type ProfileNavigatorParamsList = {
  ProfileScreen: {
    selectedUserId?: string;
    // fromTabs?:boolean,
  };
  ProfileContentNavigator: ProfileContentNavigatorParamsList;
  // DomainOfTasteScreen: {
  //   domainOfTaste: Domain, //NEEDS TO BE UPDATED BASED ON THE FIRESTORE SETUP: DOMAINS_COLLECTION
  //   user: User //NEEDS TO BE UPDATED BASED ON THE FIRESTORE SETUP: USERS_COLLECTION
  //   selectedUserId?: string,
  // }
  // PostsViewScreen: {
  //   domainOfTaste: Domain,
  //   post: Post,
  //   user: User,
  //   selectedUserId?: string,
  // }
  AddPlaylistScreen: {
    domainId: number;
  };
};

export type ProfileContentNavigatorParamsList = {
  DomainOfTasteScreen: {
    domainOfTaste: Domain; //NEEDS TO BE UPDATED BASED ON THE FIRESTORE SETUP: DOMAINS_COLLECTION
    user: User; //NEEDS TO BE UPDATED BASED ON THE FIRESTORE SETUP: USERS_COLLECTION
    selectedUserId?: string;
  };
  PostsViewScreen: {
    posts: Post[];
    playlist: Playlist;
    user: User;
    index: number;
  };
  ExternalProfileScreen: {
    selectedUserId?: string;
  };
};

export type MainNavigationProp = StackNavigationProp<MainNavigatorParamsList>;
export type HomeNavigationProp = StackNavigationProp<HomeNavigatorParamsList>;
export type AuthNavigationProp = StackNavigationProp<AuthNavigatorParamsList>;
export type ProfileNavigationProp =
  StackNavigationProp<ProfileNavigatorParamsList>;
export type TabsNavigationProp = StackNavigationProp<TabsNavigatorParamsList>;
export type ProfileContentNavigationProp =
  StackNavigationProp<ProfileContentNavigatorParamsList>;
export type ExploreNavigationProp =
  StackNavigationProp<ExploreNavigatorParamsList>;

// export type AuthScreenNavigationProp = StackNavigationProp<AuthNavigatorParamsList,'AuthScreen'>;
// export type AuthProps = {
// navigation: AuthScreenNavigationProp;
// };
export type AuthNavigatorProps = {
  initialRouteName: keyof AuthNavigatorParamsList;
};

export type AuthOptionsProps = {
  visible: boolean;
  onClose: () => void;
  navigation: AuthNavigationProp;
  authType: string;
};

export type PlaylistCardProps = {
  playlist: Playlist;
  domainOfTaste: Domain;
  profileNavigation?: ProfileNavigationProp;
  user: User;
  posts: Post[];
};

export type PlaylistPreviewCardProps = {
  posts: Post[];
  playlist: Playlist;
  user: User;
};
export type UserPreviewCardProps = {
  user: User;
  playlists: Playlist[];
  usersCount: number;
  index: number;
  handleNext: () => void;
  handlePrevious: () => void;
};

export type SettingsProps = {
  visible: boolean;
  onClose: () => void;
  // navigation: AuthNavigationProp;
  // authType: string;
};

export type PostLikesProps = {
  visible: boolean;
  onClose: () => void;
  likesUsersIdsList: string[];
};

export type PostCardProps = {
  post: Post;
};

export type BigPostCardProps = {
  post: Post;
  domainId: number;
  user: User;
};

export type PlaylistsMediaItemComponentProps = {
  domainOfTaste: Domain;
  item: Post;
  profileContentNavigation: ProfileContentNavigationProp;
  user: User;
  isCurrentUser: boolean;
  index: number;
  handlePostPress: (index: number) => void;
};

export type MediaItemInfoProps = {
  visible: boolean;
  onClose: () => void;
  post: Post;
};

export type SearchMediaProps = {
  visible: boolean;
  onClose: () => void;
  postType: string;
  domainId: number;
};

export type MoodsTagsProps = {
  visible: boolean;
  onClose: () => void;
  onCloseAll: () => void;
  postSelectedMedia: any;
  postType: string;
  domainId: number;
};
export type AddMoodProps = {
  visible: boolean;
  onClose: () => void;
};

export type PostCaptionProps = {
  visible: boolean;
  onClose: () => void;
  onCloseAll: () => void;
  postSelectedMedia: any;
  postType: string;
  postSelectedMoodsTags: Mood[];
  domainId: number;
};

export type SearchPlaylistProps = {
  visible: boolean;
  onClose: () => void;
  onCloseAll: () => void;
  postSelectedMedia: any;
  postType: string;
  postSelectedMoodsTags: Mood[];
  postInsertedCaption: string;
  domainId?: number;
};

export type AddPlaylistProps = {
  visible: boolean;
  onClose: () => void;
  onCloseAll: () => void;
  postSelectedMedia?: any;
  postSelectedMoodsTags?: Mood[];
  postType?: string;
  postInsertedCaption?: string;
  domainId?: number;
  hasNewPost: boolean;
};

export type SpotifyAuthComponentProp = {
  authType: string;
};

export type DomainOfTasteCardProp = {
  navigation: any;
  category: Domain;
  user: User;
  isCurrentUser: boolean;
  toggleAddPlaylistModal?: () => void;
  userId: string;
  isAddPlaylistModalVisible?: boolean;
  refresh?: boolean;
  setRefresh?: (refresh: boolean) => void;
};
export type NewMoodRequest = {
  moodName: string;
  userId: string;
  wantsCredit: boolean;
};

// // Define the props for ProfileScreenWrapper
// export type ProfileScreenWrapperProps = {
//   route: ProfileScreenRouteProp;
// };

export type AuthEmailPasswordScreenRouteProp = RouteProp<
  AuthNavigatorParamsList,
  "AuthEmailPasswordScreen"
>;
export type PostsViewScreenRouteProp = RouteProp<
  ProfileContentNavigatorParamsList,
  "PostsViewScreen"
>;
export type DomainOfTasteScreenRouteProp = RouteProp<
  ProfileContentNavigatorParamsList,
  "DomainOfTasteScreen"
>;
export type SignUpEndScreenRouteProp = RouteProp<
  AuthNavigatorParamsList,
  "SignUpEndScreen"
>;
export type ProfileScreenRouteProp = RouteProp<
  ProfileNavigatorParamsList,
  "ProfileScreen"
>;
export type ExternalProfileScreenRouteProp = RouteProp<
  HomeNavigatorParamsList,
  "ExternalProfileScreen"
>;
export type AddPlaylistScreenRouteProp = RouteProp<
  ProfileNavigatorParamsList,
  "AddPlaylistScreen"
>;

// export type AuthEmailPasswordScreenNavigationProp = StackNavigationProp<AuthNavigatorParamsList,'AuthEmailPasswordScreen'>;
// export type AuthEmailPasswordProps = {
// route: AuthEmailPasswordScreenRouteProp;
// navigation: AuthStackNavigationProp;
// };
