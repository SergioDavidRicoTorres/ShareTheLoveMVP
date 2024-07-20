import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
// import * as Crypto from 'expo-crypto';
import { Domain, Mood, PlaylistsMediaItemComponentProps } from "./types";
import { DOMAINPOSTTYPE } from "./constants";
import { deletePlaylistAndRelatedData, deletePost } from "./utilsFirebase";
// import { Song, FilmOrTVShow, PodcastEpisode } from "./types";

const { width } = Dimensions.get("window"); // Window Dimensions
export const normalize = (value: number) => width * (value / 390);

// get Search Result Item subtitle, depending on the media type:
export const getItemSubTitle = (mediaItem: any, domainId: number) => {
  // try {
  switch (domainId) {
    case 0: {
      return (
        <Text numberOfLines={1} style={styles.itemSubtitle}>
          {mediaItem.artists
            ?.map(
              (artist: any, index: number) => (index ? " - " : "") + artist.name
            )
            .join("")}
        </Text>
      );
    }
    case 2: {
      return (
        <Text numberOfLines={1} style={styles.itemSubtitle}>
          {mediaItem.description}
        </Text>
      );
    }
    case 1: {
      return (
        <Text numberOfLines={1} style={styles.itemSubtitle}>
          {mediaItem.media_type}
        </Text>
      );
    }
    default: {
      return (
        <Text numberOfLines={1} style={styles.itemSubtitle}>
          Error: Invalid post type!
        </Text>
      );
    }
  }
  // } catch (error) {
  //   console.error(error);
  // }
};

// export const getItemImage = (item: any, postType: string) => {
//   // logic for image fetching depending postType (it didn't work by defining a separating function)
//   try {
//     if (postType === "Song") {
//       return { uri: item.album.images[0].url };
//     } else if (postType === "PodcastEpisode") {
//       return { uri: item.images[0].url };
//     } else if (postType === "Film/TVShow") {
//       return { uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` };
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const getItemTitle = (item: any, postType: string) => {
//     if (postType === "Song") {
//       return item.name;
//     }
//     if (postType === "PodcastEpisode") {
//       return item.name;
//     }
//     if (postType === "Film/TVShow") {
//       return item.media_type === "movie" ? item.title : item.name;
//     }
//     console.log('Invalid "postType" was passed!');
//     return "Unknown Title"
// };

// // returns color depending on the type of post
// export const getButtonsAccentColor = (postType: string) => {
//   // try {
//     if (postType === "Song") {
//       return "rgba(0, 255, 163, 1)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(110, 212, 73, 1)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(250, 0, 255, 1)";
//     }
//     console.log('Invalid "postType" was passed!');
//     return "rgba(105, 51, 172, 1)"
// };

// // returns first color for the background gradient depending on the type of post
// export const getGradientsFirstColor = (postType: string) => {
//     if (postType === "Song") {
//       return "rgba(0, 209, 134, 1)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(110, 212, 73, 1)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(207, 0, 211, 1)";
//     }
//     console.log('Invalid "postType" was passed!');
//     return "rgba(105, 51, 172, 1)"
// };

// // returns color depending on the type of post
// export const getSearchBarColor = (postType: string) => {
//     if (postType === "Song") {
//       return "rgba(20, 169, 115, 0.75)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(105, 146, 91, 0.75)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(134, 0, 137, 0.75)";
//     }
//     console.log('Invalid "postType" was passed!');
//     return "rgba(105, 51, 172, 1)"
// };

// export const getMoodTextColor = (postType: string) => {
//     if (postType === "Song") {
//       return "rgba(153, 255, 218, 1)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(197, 238, 182, 1)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(253, 153, 255, 1)";
//     }
//     console.log('Invalid "postType" was passed!');
//     return "rgba(105, 51, 172, 1)"
// };

// export const getMoodContainerColor = (postType: string) => {
//     if (postType === "Song") {
//       return "rgba(0, 255, 163, 0.4)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(110, 212, 73, 0.4)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(250, 0, 255, 0.4)";
//     }
//     console.log('Invalid "postType" was passed!');
//     return "rgba(105, 51, 172, 1)"
// };

// export const getPlaylistCardBackgroundColor = (postType: string) => {
//     if (postType === "Song") {
//       return "rgba(0, 255, 163, 0.75)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(110, 212, 73, 0.75)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(250, 0, 255, 0.75)";
//     }
//     console.log('Invalid "postType" was passed!');
//     return "rgba(105, 51, 172, 1)"
// };

// export const getImageWidth = (postType: string) => {
//   try {
//     if (postType === "Film/TVShow") {
//       return normalize(275);
//     } else {
//       return normalize(300);
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const getScreenGradientFirstColor = (domain: Domain) => {
//     if (domain.domainId === 0) {
//       return "rgba(0, 98, 62, 1)";
//     }
//     if (domain.domainId === 1) {
//       return "rgba(99, 0, 101, 1)";
//     }
//     if (domain.domainId === 2) {
//       return "rgba(75, 117, 59, 1)";
//     }
//     console.log('Invalid "domain" was passed!');
//     return "rgba(105, 51, 172, 1)"
// };

// export const getDomainsOfTasteGradientsFirstColor = (domain: Domain) => {
//     if (domain.domainId === 0) {
//       return "rgba(0, 209, 134, 0.75)";
//     }
//     if (domain.domainId === 1) {
//       return "rgba(207, 0, 211, 0.75)";
//     }
//     if (domain.domainId === 2) {
//       return "rgba(110, 212, 73, 0.75)";
//     }
//     console.log('Invalid "domain" was passed!');
//     return "rgba(105, 51, 172, 1)"
// };

// export const getPlaylistBigCardBackgroundColor = (domain: Domain) => {
//     if (domain.domainId === 0) {
//       return "rgba(0, 255, 163, 0.3)";
//     }
//     if (domain.domainId === 1) {
//       return "rgba(250, 0, 255, 0.3)";
//     }
//     if (domain.domainId === 2) {
//       return "rgba(120, 190, 94, 0.3)";
//     }
//     console.log('Invalid "postType" was passed!');
//     return "rgba(105, 51, 172, 1)"

// export const getDomainOfTasteScoreIcon = (domain: Domain) => {
//   try {
//     if (domain.domainId === 0) {
//       return require("./assets/icons/MusicDomainScoreIcon.png");
//     }
//     if (domain.domainId === 1) {
//       return require("./assets/icons/FilmsTVShowsDomainScoreIcon.png");
//     }
//     if (domain.domainId === 2) {
//       return require("./assets/icons/EpisodesDomainScoreIcon.png");
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const getPlaylistScoreIcon = (domain: Domain) => {
//   try {
//     if (domain.domainId === 0) {
//       return require("./assets/icons/MusicPlaylistScoreIcon.png");
//     }
//     if (domain.domainId === 1) {
//       return require("./assets/icons/FilmsTVShowsPlaylistScoreIcon.png");
//     }
//     if (domain.domainId === 2) {
//       return require("./assets/icons/EpisodesPlaylistScoreIcon.png");
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const getImageHeight = (postType: string) => {
//   try {
//     if (postType === "Film/TVShow") {
//       return normalize(377);
//     } else {
//       return normalize(300);
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
// };
// export const getItemImage = (item: any, postType: string) => {
//   try {
//     switch (postType) {
//       case "Song":
//         return { uri: item.album.images[0].url };
//       case "PodcastEpisode":
//         return { uri: item.images[0].url };
//       case "Film/TVShow":
//         return { uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` };
//       default:
//         throw new Error(`Invalid postType: ${postType}`);
//     }
//   } catch (error) {
//     console.error(error);
//     return { uri: 'DefaultImageURL' }; // Replace 'DefaultImageURL' with a default image url if needed
//   }
// };

export const getItemImage = (item: any, domainId: number) => {
  try {
    switch (domainId) {
      case 0:
        return { uri: item.album.images[0].url };
      case 2:
        return { uri: item.images[0].url };
      case 1:
        return {
          uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
        };
      default:
        throw new Error(`Invalid domainId: ${domainId}`);
    }
  } catch (error) {
    console.error(error);
    return { uri: "DefaultImageURL" }; // Replace 'DefaultImageURL' with a default image url if needed
  }
};

// export const getItemTitle = (item: any, postType: string) => {
//   switch (postType) {
//       case "Song":
//       case "PodcastEpisode":
//           return item.name;
//       case "Film/TVShow":
//           return item.media_type === "movie" ? item.title : item.name;
//       default:
//           console.log('Invalid "postType" was passed!');
//           return "Unknown Title";
//   }
// };
export const getItemTitle = (item: any, domainId: number) => {
  switch (domainId) {
    case 0:
      return item.name;
    case 2:
      return item.name;
    case 1:
      return item.media_type === "movie" ? item.title : item.name;
    default:
      console.error('Invalid "postType" was passed!');
      return "Unknown Title";
  }
};

export const getButtonsAccentColor = (postType?: string) => {
  switch (postType) {
    case "Song":
      return "rgba(0, 255, 163, 1)";
    case "PodcastEpisode":
      return "rgba(110, 212, 73, 1)";
    case "Film/TVShow":
      return "rgba(250, 0, 255, 1)";
    default:
      console.log('Invalid "postType" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

// export const getGradientsFirstColor = (postType: string) => {
//   switch (postType) {
//       case "Song":
//           return "rgba(0, 209, 134, 1)";
//       case "PodcastEpisode":
//           return "rgba(110, 212, 73, 1)";
//       case "Film/TVShow":
//           return "rgba(207, 0, 211, 1)";
//       default:
//           console.error('Invalid "postType" was passed!');
//           return "rgba(105, 51, 172, 1)";
//   }
// };

export const getGradientsFirstColor = (postType: string) => {
  switch (postType) {
    case "Song":
      return "rgba(0, 98, 62, 1)";
    case "PodcastEpisode":
      return "rgba(75, 117, 59, 1)";
    case "Film/TVShow":
      return "rgba(99, 0, 101, 1)";
    default:
      console.error('Invalid "postType" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

export const getSearchBarColor = (postType: string) => {
  switch (postType) {
    case "Song":
      return "rgba(20, 169, 115, 0.75)";
    case "PodcastEpisode":
      return "rgba(105, 146, 91, 0.75)";
    case "Film/TVShow":
      return "rgba(134, 0, 137, 0.75)";
    default:
      console.log('Invalid "postType" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

export const getMoodTextColor = (postType?: string) => {
  switch (postType) {
    case "Song":
      return "rgba(153, 255, 218, 1)";
    case "PodcastEpisode":
      return "rgba(197, 238, 182, 1)";
    case "Film/TVShow":
      return "rgba(253, 153, 255, 1)";
    default:
      console.log('Invalid "postType" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

export const getMoodContainerColor = (postType?: string) => {
  switch (postType) {
    case "Song":
      return "rgba(0, 255, 163, 0.4)";
    case "PodcastEpisode":
      return "rgba(110, 212, 73, 0.4)";
    case "Film/TVShow":
      return "rgba(250, 0, 255, 0.4)";
    default:
      console.log('Invalid "postType" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

export const getPlaylistCardBackgroundColor = (postType: string) => {
  switch (postType) {
    case "Song":
      return "rgba(0, 255, 163, 0.75)";
    case "PodcastEpisode":
      return "rgba(110, 212, 73, 0.75)";
    case "Film/TVShow":
      return "rgba(250, 0, 255, 0.75)";
    default:
      console.log('Invalid "postType" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

export const getImageWidth = (postType: string) => {
  // try {
  switch (postType) {
    case "Film/TVShow":
      return normalize(275);
    default:
      return normalize(300);
  }
  // } catch (error) {
  //     console.error(error);
  //     return "Error"; // Updated to return a string indicating an error instead of an array
  // }
};

export const getScreenGradientFirstColor = (domainId: number) => {
  switch (domainId) {
    case 0:
      return "rgba(0, 98, 62, 1)";
    case 1:
      return "rgba(99, 0, 101, 1)";
    case 2:
      return "rgba(75, 117, 59, 1)";
    default:
      console.log('Invalid "domain" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

export const getDomainsOfTasteGradientsFirstColor = (domain: Domain) => {
  switch (domain.domainId) {
    case 0:
      return "rgba(0, 209, 134, 0.75)";
    case 1:
      return "rgba(207, 0, 211, 0.75)";
    case 2:
      return "rgba(110, 212, 73, 0.75)";
    default:
      console.log('Invalid "domain" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

export const getPlaylistBigCardBackgroundColor = (domain: Domain) => {
  switch (domain.domainId) {
    case 0:
      return "rgba(0, 255, 163, 0.3)";
    case 1:
      return "rgba(250, 0, 255, 0.3)";
    case 2:
      return "rgba(120, 190, 94, 0.3)";
    default:
      console.log('Invalid "domain" was passed!');
      return "rgba(105, 51, 172, 1)";
  }
};

export const getDomainOfTasteScoreIcon = (domain: Domain) => {
  try {
    switch (domain.domainId) {
      case 0:
        return require("./assets/icons/MusicDomainScoreIcon.png");
      case 1:
        return require("./assets/icons/FilmsTVShowsDomainScoreIcon.png");
      case 2:
        return require("./assets/icons/EpisodesDomainScoreIcon.png");
      default:
        throw new Error(`Invalid domain id: ${domain.domainId}`);
    }
  } catch (error) {
    console.error(error);
    return require("./assets/icon.png"); // Replace with your default icon
  }
};

export const getPlaylistScoreIcon = (domain: Domain) => {
  try {
    switch (domain.domainId) {
      case 0:
        return require("./assets/icons/MusicPlaylistScoreIcon.png");
      case 1:
        return require("./assets/icons/FilmsTVShowsPlaylistScoreIcon.png");
      case 2:
        return require("./assets/icons/PodcastsEpisodesPlaylistScoreIcon.png");
      default:
        throw new Error(`Invalid domain id: ${domain.domainId}`);
    }
  } catch (error) {
    console.error(error);
    return require("./assets/icon.png"); // Replace with your default icon
  }
};

export const getDomainOfTasteXIcon = (domain: Domain) => {
  try {
    switch (domain.domainId) {
      case 0:
        return require("./assets/icons/MusicXIcon.png");
      case 1:
        return require("./assets/icons/FilmsTVShowsXIcon.png");
      case 2:
        return require("./assets/icons/PodcastsEpisodesXIcon.png");
      default:
        throw new Error(`Invalid domain id: ${domain.domainId}`);
    }
  } catch (error) {
    console.error(error);
    return require("./assets/icon.png"); // Replace with your default icon
  }
};

export const getDomainsName = (domain: Domain) => {
  try {
    switch (domain.domainId) {
      case 0:
        return "Music";
      case 1:
        return "Films and TV Shows";
      case 2:
        return "Podcasts Episodes";
      default:
        throw new Error(`Invalid domain id: ${domain.domainId}`);
    }
  } catch (error) {
    console.error(error);
    return "Default Domain"; // Replace with your default icon
  }
};

export const getImageHeight = (postType: string) => {
  try {
    switch (postType) {
      case "Film/TVShow":
        return normalize(377);
      default:
        return normalize(300);
    }
  } catch (error) {
    console.error(error);
    return normalize(300); // Assume 300 is a safe default, or handle differently if needed
  }
};

function confirmDeletePost(postId: string | undefined) {
  if (postId !== undefined) {
    Alert.alert(
      "Confirm Delete", // Alert Title
      "Are you sure you want to delete this post?", // Alert Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete canceled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(postId),
          style: "destructive",
        },
      ],
      { cancelable: false } // This prevents tapping outside the alert from dismissing it
    );
  }
}

export function confirmDeletePlaylist(playlistId: string | undefined) {
  console.log("[utils::confirmDeletePlaylist()]");
  if (playlistId !== undefined) {
    Alert.alert(
      "Confirm Delete", // Alert Title
      "Are you sure you want to delete this Playlist?", // Alert Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete canceled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePlaylistAndRelatedData(playlistId),
          style: "destructive",
        },
      ],
      { cancelable: false } // This prevents tapping outside the alert from dismissing it
    );
  }
}

export const getPlaylistsMediaItemComponent = ({
  domainOfTaste,
  item: post,
  profileContentNavigation,
  user,
  isCurrentUser,
}: PlaylistsMediaItemComponentProps) => {
  switch (domainOfTaste.domainId) {
    case 0: {
      return (
        // <Text>{post.toString()}</Text>
        <TouchableOpacity
          onPress={() => {
            profileContentNavigation.navigate("PostsViewScreen", {
              domainOfTaste,
              post,
              user,
            });
          }}
          style={{
            paddingTop: normalize(10),
          }}
        >
          <View
            style={{
              width: normalize(165),
              height: normalize(189),
              borderRadius: normalize(10),
              backgroundColor: "rgba(58, 17, 90, 0.5)",
              marginRight: normalize(15),
              alignItems: "center",
              borderColor: getMoodContainerColor(
                DOMAINPOSTTYPE.get(domainOfTaste.domainId)
              ),
              borderWidth: normalize(4),
            }}
          >
            {isCurrentUser && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: normalize(-10),
                  top: normalize(-10),
                  padding: normalize(6),
                  borderRadius: normalize(10),
                  borderWidth: normalize(3),
                  backgroundColor: getMoodContainerColor(
                    DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                  ),
                  borderColor: getButtonsAccentColor(
                    DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                  ),
                }}
                onPress={() => {
                  confirmDeletePost(post.postId);
                }}
              >
                <Image
                  source={getDomainOfTasteXIcon(domainOfTaste)}
                  style={{
                    width: normalize(15),
                    height: normalize(15),
                  }}
                />
              </TouchableOpacity>
            )}
            <Image
              source={
                // { "uri": post.mediaItem.image}  //with implemented MediaItem Interface
                getItemImage(post.mediaItem, domainOfTaste.domainId)
              }
              style={{
                width: normalize(100),
                height: normalize(100),
                borderBottomLeftRadius: normalize(10),
                borderBottomRightRadius: normalize(10),
                //   borderRadius: normalize(10),
              }}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: normalize(5),
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(20),
                  fontWeight: "400",
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {/* {post.mediaItem.name} //with implemented MediaItem Interface*/}
                {getItemTitle(post.mediaItem, domainOfTaste.domainId)}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(15),
                  fontWeight: "300",
                }}
                numberOfLines={1}
              >
                {post.mediaItem.album.name}
              </Text>
              <View style={{ width: normalize(165) }}>
                <FlatList
                  data={post.mediaItem.artists}
                  scrollEnabled={false}
                  horizontal
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:
                      post.mediaItem?.artists?.length > 1
                        ? "flex-start"
                        : "center",
                    maxWidth: normalize(165),
                    overflow: "hidden",
                    marginHorizontal: normalize(5),
                    //   numberOfLines: 1,
                  }}
                  // keyExtractor={(item) => item.domainId.toString()} // Change this to your key extractor function
                  ItemSeparatorComponent={() => (
                    <Text
                      style={{
                        color: "white",
                        fontSize: normalize(15),
                        fontWeight: "500",
                      }}
                    >
                      {" "}
                      -{" "}
                    </Text>
                  )}
                  renderItem={({ item }) => (
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "white",
                        fontSize: normalize(15),
                        fontWeight: "500",
                      }}
                    >
                      {item.name}
                    </Text>
                  )}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    case 1: {
      return (
        <TouchableOpacity
          onPress={() => {
            profileContentNavigation.navigate("PostsViewScreen", {
              domainOfTaste,
              post,
              user,
            });
          }}
          style={{
            paddingTop: normalize(10),
          }}
        >
          <View
            style={{
              // width: 150,
              // height: 220,
              borderRadius: normalize(10),
              backgroundColor: "rgba(58, 17, 90, 0.5)",
              marginRight: normalize(15),
              alignItems: "center",
              justifyContent: "center",
              padding: normalize(10),
            }}
          >
            <Image
              source={
                // { uri: post.mediaItem.image }
                getItemImage(post.mediaItem, domainOfTaste.domainId)
              }
              style={{
                width: normalize(170),
                height: normalize(240),
                borderRadius: normalize(10),
              }}
            />
            {isCurrentUser && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: normalize(-10),
                  top: normalize(-10),
                  padding: normalize(6),
                  borderRadius: normalize(10),
                  borderWidth: normalize(3),
                  backgroundColor: getMoodContainerColor(
                    DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                  ),
                  borderColor: getButtonsAccentColor(
                    DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                  ),
                }}
                onPress={() => {
                  confirmDeletePost(post.postId);
                }}
              >
                <Image
                  source={getDomainOfTasteXIcon(domainOfTaste)}
                  style={{
                    width: normalize(15),
                    height: normalize(15),
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      );
    }
    case 2: {
      return (
        <TouchableOpacity
          onPress={() => {
            profileContentNavigation.navigate("PostsViewScreen", {
              domainOfTaste,
              post,
              user,
            });
          }}
          style={{
            paddingTop: normalize(10),
          }}
        >
          <View
            style={{
              width: normalize(320),
              height: normalize(260),
              borderRadius: normalize(10),
              backgroundColor: "rgba(58, 17, 90, 0.8)",
              marginRight: normalize(15),
              alignItems: "center",
              borderColor: getMoodContainerColor(
                DOMAINPOSTTYPE.get(domainOfTaste.domainId)
              ),
              borderWidth: normalize(5),
              // justifyContent: "center",
              // // padding: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 0,
                gap: normalize(10),
                //   width: normalize(320),
                //   maxWidth: normalize(320),
                //   overflow: "hidden",
              }}
            >
              {isCurrentUser && (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: normalize(-10),
                    top: normalize(-10),
                    padding: normalize(6),
                    borderRadius: normalize(10),
                    borderWidth: normalize(3),
                    backgroundColor: getMoodContainerColor(
                      DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                    ),
                    borderColor: getButtonsAccentColor(
                      DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                    ),
                  }}
                  onPress={() => {
                    confirmDeletePost(post.postId);
                  }}
                >
                  <Image
                    source={getDomainOfTasteXIcon(domainOfTaste)}
                    style={{
                      width: normalize(15),
                      height: normalize(15),
                    }}
                  />
                </TouchableOpacity>
              )}
              <Image
                source={
                  // { uri: post.mediaItem.image }
                  getItemImage(post.mediaItem, domainOfTaste.domainId)
                }
                style={{
                  width: normalize(120),
                  height: normalize(120),
                  borderRadius: normalize(10),
                  left: normalize(5), // because of the borderwidth
                  // opacity: 0.8,
                }}
              />
              <View
                style={{
                  width: normalize(190),
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "rgba(197, 238, 182, 0.6)",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(20),
                    fontWeight: "700",

                    // textAlign: "center",
                  }}
                  numberOfLines={5}
                >
                  {/* {post.mediaItem.name} //with implemented MediaItem Interface*/}
                  {getItemTitle(post.mediaItem, domainOfTaste.domainId)}
                </Text>
              </View>
            </View>
            <View style={{ margin: 8 }}>
              <Text
                numberOfLines={5}
                style={{
                  color: "rgba(197, 238, 182, 0.9)",
                  fontSize: normalize(20),
                  fontWeight: "500",
                }}
              >
                {post.mediaItem.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    default: {
      return (
        <View
          style={{
            width: normalize(165),
            height: normalize(189),
            borderRadius: normalize(10),
            backgroundColor: "rgba(105, 51, 172, 1)",
            marginRight: normalize(15),
            alignItems: "center",
          }}
        />
      );
    }
  }
};

export const getLikeComponent = (
  isLiked: boolean,
  handleLikePress: () => void,
  postType?: string
) => {
  switch (postType) {
    case "Song": {
      if (isLiked) {
        return (
          <TouchableOpacity
            onPress={handleLikePress}
            style={{
              width: normalize(50),
              height: normalize(50),
              // right: normalize(21),
              // bottom: normalize(442),
              position: "absolute",
              // zIndex: 1,
              // top: normalize(33),
              backgroundColor: "rgba(153, 255, 218, 1)",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: normalize(10),
              shadowOpacity: 0.6,
              borderRadius: normalize(15),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("./assets/icons/LikeSelectedIcon.png")}
              style={{ width: normalize(29), height: normalize(26) }}
            ></Image>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={handleLikePress}
            style={{
              width: normalize(50),
              height: normalize(50),
              // right: normalize(21),
              // bottom: normalize(425),
              position: "absolute",
              // zIndex: 1,
              backgroundColor: "rgba(105, 51, 172, 1)",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: normalize(10),
              shadowOpacity: 0.6,
              borderRadius: normalize(15),
              alignItems: "center",
              justifyContent: "center",
              borderColor: getMoodTextColor(postType),
              borderWidth: normalize(3),
            }}
          >
            {/* <View
              style={{
                backgroundColor: "white",
                width: normalize(1), 
                height: normalize(50), 
              }}
            ></View> */}
            <Image
              source={require("./assets/icons/MusicLikeNotSelectedIcon.png")}
              style={{ width: normalize(29), height: normalize(26) }}
            ></Image>
          </TouchableOpacity>
        );
      }
    }
    case "Film/TVShow": {
      if (isLiked) {
        return (
          <TouchableOpacity
            onPress={handleLikePress}
            style={{
              width: normalize(50),
              height: normalize(50),
              // right: normalize(21),
              // bottom: normalize(592),
              position: "absolute",
              // zIndex: 1,
              // top: normalize(33),
              backgroundColor: "rgba(253, 153, 255, 1)",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: normalize(10),
              shadowOpacity: 0.6,
              borderRadius: normalize(15),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("./assets/icons/LikeSelectedIcon.png")}
              style={{ width: normalize(29), height: normalize(26) }}
            ></Image>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={handleLikePress}
            style={{
              width: normalize(50),
              height: normalize(50),
              // right: normalize(21),
              // bottom: normalize(592),
              position: "absolute",
              backgroundColor: "rgba(105, 51, 172, 1)",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: normalize(10),
              shadowOpacity: 0.6,
              borderRadius: normalize(15),
              alignItems: "center",
              justifyContent: "center",
              borderColor: getMoodTextColor(postType),
              borderWidth: normalize(3),
            }}
          >
            <Image
              source={require("./assets/icons/FilmsTVShowsLikeNotSelectedIcon.png")}
              style={{ width: normalize(29), height: normalize(26) }}
            ></Image>
          </TouchableOpacity>
        );
      }
    }
    case "PodcastEpisode": {
      if (isLiked) {
        return (
          <TouchableOpacity
            onPress={handleLikePress}
            style={{
              width: normalize(50),
              height: normalize(50),
              // right: normalize(21),
              // bottom: normalize(442),
              position: "absolute",
              // top: normalize(33),
              backgroundColor: "rgba(197, 238, 182, 1)",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: normalize(10),
              shadowOpacity: 0.6,

              borderRadius: normalize(15),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("./assets/icons/LikeSelectedIcon.png")}
              style={{ width: normalize(29), height: normalize(26) }}
            ></Image>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={handleLikePress}
            style={{
              width: normalize(50),
              height: normalize(50),
              // right: normalize(21),
              // bottom: normalize(442),
              position: "absolute",
              // top: normalize(33),
              backgroundColor: "rgba(105, 51, 172, 1)",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: normalize(10),
              shadowOpacity: 0.6,

              borderRadius: normalize(15),
              alignItems: "center",
              justifyContent: "center",
              borderColor: getMoodTextColor(postType),
              borderWidth: normalize(3),
            }}
          >
            <Image
              source={require("./assets/icons/PodcastsEpisodesLikeNotSelectedIcon.png")}
              style={{ width: normalize(29), height: normalize(26) }}
            ></Image>
          </TouchableOpacity>
        );
      }
    }
    default: {
      return (
        <View
          style={{
            width: normalize(50),
            height: normalize(50),
            // right: normalize(21),
            // bottom: normalize(442),
            position: "absolute",
            // zIndex: 1,
            // top: normalize(33),
            backgroundColor: "rgba(105, 51, 172, 1)",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: normalize(10),
            shadowOpacity: 0.6,

            borderRadius: normalize(15),
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      );
    }
  }
};

// function isSong(item: any): item is Song {
//   return item.mediaType === 'Song' && item.album !== undefined && item.artists !== undefined;
// }

// function isFilmOrTVShow(item: any): item is FilmOrTVShow {
//   return (item.mediaType === 'Film' || item.mediaType === 'TV Show') && item.overview !== undefined;
// }

// function isPodcastEpisode(item: any): item is PodcastEpisode {
//   return item.mediaType === 'Podcast Episode' && item.description !== undefined;
// }

// const processMediaItem = (mediaItem: Song | FilmOrTVShow | PodcastEpisode) => {
//   if (isSong(mediaItem)) {
//     // Now TypeScript knows mediaItem is a Song
//     console.log("Processing song:", mediaItem.name, mediaItem.album, mediaItem.artists);
//   } else if (isFilmOrTVShow(mediaItem)) {
//     // Now TypeScript knows mediaItem is a FilmOrTVShow
//     console.log("Processing film/TV show:", mediaItem.name, mediaItem.overview);
//   } else if (isPodcastEpisode(mediaItem)) {
//     // Now TypeScript knows mediaItem is a PodcastEpisode
//     console.log("Processing podcast episode:", mediaItem.name, mediaItem.description);
//   }
// };
export const transformMoodsToStringArray = (moods: Mood[]): string[] => {
  return moods.map((mood) => mood.name);
};

export const getCarouselNumColumns = (listLength: number) => listLength / 5;

// export const generateRandomString = (length: number) => {
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const values = Crypto.getRandomValues(new Uint8Array(length));
//   const returnValue = values.reduce((acc, x) => acc + possible[x % possible.length], "");
//   console.log ("code_verifier: ", returnValue) ;
//   return   returnValue;
// };

// export const generateCodeChallenge = async (codeVerifier: string) => {
//   try{
//   const hashed = await Crypto.digestStringAsync(
//       Crypto.CryptoDigestAlgorithm.SHA256,
//       codeVerifier,
//       { encoding: Crypto.CryptoEncoding.BASE64 }
//   );
//   const returnValue = hashed.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
//   console.log ("code_challenge: ", returnValue) ;
//   return returnValue;

// } catch (error) {
//   console.error("Error at Crypto.digestStringAsync(): ", error);
//   return "Error at generateCodeChallenge()"
// }
// };

export const pullRefresh = (
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setRefresh(true);

  setTimeout(() => {
    setRefresh(false);
  }, 5000);
};

const styles = StyleSheet.create({
  itemSubtitle: {
    color: "white",
    fontSize: normalize(18),
    fontWeight: "400",
  },
});
