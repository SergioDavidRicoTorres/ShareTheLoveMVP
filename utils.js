import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";

const { width } = Dimensions.get("window"); // Window Dimensions
const normalize = (value) => width * (value / 390);

// get Search Result Item subtitle, depending on the media type:
export const getItemSubTitle = (item, postType) => {
  try {
    if (postType === "Song") {
      return (
        <View style={{ flexDirection: "row" }}>
          {item.artists.map((artist, index) => (
            <React.Fragment key={index}>
              {/* itemArtistName */}
              {index !== item.artists.length - 1 ? (
                <Text
                  // itemArtistName with "-"
                  numberOfLines={1}
                  style={styles.itemSubtitle}
                >
                  {artist.name}-
                </Text>
              ) : (
                <Text
                  // itemArtistName without "-"
                  numberOfLines={1}
                  style={styles.itemSubtitle}
                >
                  {artist.name}
                </Text>
              )}
            </React.Fragment>
          ))}
        </View>
      );
    }
    if (postType === "PodcastEpisode") {
      return (
        <Text numberOfLines={1} style={styles.itemSubtitle}>
          {item.description}
        </Text>
      );
    }
    if (postType === "Film/TVShow") {
      return (
        <Text numberOfLines={1} style={styles.itemSubtitle}>
          {item.media_type}
        </Text>
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const getItemTitle = (item, postType) => {
  try {
    if (postType === "Song") {
      return item.name;
    }
    if (postType === "PodcastEpisode") {
      return item.name;
    }
    if (postType === "Film/TVShow") {
      return item.media_type === "movie" ? item.title : item.name;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getItemImage = (item, postType) => {
  // logic for image fetching depending postType (it didn't work by defining a separating function)
  try {
    if (postType === "Song") {
      return { uri: item.album.images[0].url };
    } else if (postType === "PodcastEpisode") {
      return { uri: item.images[0].url };
    } else if (postType === "Film/TVShow") {
      return { uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` };
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// returns color depending on the type of post
export const getButtonsAccentColor = (postType) => {
  try {
    if (postType === "Song") {
      return "rgba(0, 255, 163, 1)";
    }
    if (postType === "PodcastEpisode") {
      return "rgba(110, 212, 73, 1)";
    }
    if (postType === "Film/TVShow") {
      return "rgba(250, 0, 255, 1)";
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// returns first color for the background gradient depending on the type of post
export const getGradientsFirstColor = (postType) => {
  try {
    if (postType === "Song") {
      return "rgba(0, 209, 134, 1)";
    }
    if (postType === "PodcastEpisode") {
      return "rgba(110, 212, 73, 1)";
    }
    if (postType === "Film/TVShow") {
      return "rgba(207, 0, 211, 1)";
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// returns color depending on the type of post
export const getSearchBarColor = (postType) => {
  try {
    if (postType === "Song") {
      return "rgba(20, 169, 115, 0.75)";
    }
    if (postType === "PodcastEpisode") {
      return "rgba(105, 146, 91, 0.75)";
    }
    if (postType === "Film/TVShow") {
      return "rgba(134, 0, 137, 0.75)";
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMoodTextColor = (postType) => {
  try {
    if (postType === "Song") {
      return "rgba(153, 255, 218, 1)";
    }
    if (postType === "PodcastEpisode") {
      return "rgba(197, 238, 182, 1)";
    }
    if (postType === "Film/TVShow") {
      return "rgba(253, 153, 255, 1)";
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMoodContainerColor = (postType) => {
  try {
    if (postType === "Song") {
      return "rgba(0, 255, 163, 0.4)";
    }
    if (postType === "PodcastEpisode") {
      return "rgba(110, 212, 73, 0.4)";
    }
    if (postType === "Film/TVShow") {
      return "rgba(250, 0, 255, 0.4)";
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPlaylistCardBackgroundColor = (postType) => {
  try {
    if (postType === "Song") {
      return "rgba(0, 255, 163, 0.75)";
    }
    if (postType === "PodcastEpisode") {
      return "rgba(110, 212, 73, 0.75)";
    }
    if (postType === "Film/TVShow") {
      return "rgba(250, 0, 255, 0.75)";
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getImageWidth = (postType) => {
  try {
    if (postType === "Film/TVShow") {
      return normalize(275);
    } else {
      return normalize(300);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getScreenGradientFirstColor = (category) => {
  try {
    if (category.id === 0) {
      return "rgba(0, 98, 62, 1)";
    }
    if (category.id === 1) {
      return "rgba(99, 0, 101, 1)";
    }
    if (category.id === 2) {
      return "rgba(75, 117, 59, 1)";
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDomainsOfTasteGradientsFirstColor = (category) => {
  try {
    if (category.id === 0) {
      return "rgba(0, 209, 134, 0.75)";
    }
    if (category.id === 1) {
      return "rgba(207, 0, 211, 0.75)";
    }
    if (category.id === 2) {
      return "rgba(110, 212, 73, 0.75)";
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPlaylistBigCardBackgroundColor = (category) => {
  try {
    if (category.id === 0) {
      return "rgba(0, 255, 163, 0.3)";
    }
    if (category.id === 1) {
      return "rgba(250, 0, 255, 0.3)";
    }
    if (category.id === 2) {
      return "rgba(120, 190, 94, 0.3)";
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDomainOfTasteScoreIcon = (category) => {
  try {
    if (category.id === 0) {
      return require("./assets/icons/MusicDomainScoreIcon.png");
    }
    if (category.id === 1) {
      return require("./assets/icons/FilmsTVShowsDomainScoreIcon.png");
    }
    if (category.id === 2) {
      return require("./assets/icons/EpisodesDomainScoreIcon.png");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPlaylistScoreIcon = (category) => {
  try {
    if (category.id === 0) {
      return require("./assets/icons/MusicPlaylistScoreIcon.png");
    }
    if (category.id === 1) {
      return require("./assets/icons/FilmsTVShowsPlaylistScoreIcon.png");
    }
    if (category.id === 2) {
      return require("./assets/icons/EpisodesPlaylistScoreIcon.png");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getImageHeight = (postType) => {
  try {
    if (postType === "Film/TVShow") {
      return normalize(377);
    } else {
      return normalize(300);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPlaylistsMediaItemComponent = ({
  domainOfTaste,
  item: post,
  navigation,
  user,
}) => {
  try {
    if (domainOfTaste.id === 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MediaItemsViewScreen", {
              domainOfTaste,
              post,
              user,
            });
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
            }}
          >
            <Image
              source={{ uri: post.mediaItem.image }}
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
                  fontWeight: 400,
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {post.mediaItem.name}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(15),
                  fontWeight: 300,
                }}
              >
                {post.mediaItem.album}
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
                      post.mediaItem.artists.length > 1
                        ? "flex-start"
                        : "center",
                    maxWidth: normalize(165),
                    overflow: "hidden",
                    marginHorizontal: normalize(5),
                    //   numberOfLines: 1,
                  }}
                  // keyExtractor={(item) => item.id.toString()} // Change this to your key extractor function
                  ItemSeparatorComponent={() => (
                    <Text
                      style={{
                        color: "white",
                        fontSize: normalize(15),
                        fontWeight: 500,
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
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </Text>
                  )}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    if (domainOfTaste.id === 1) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MediaItemsViewScreen", {
              domainOfTaste,
              post,
              user,
            });
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
              source={{ uri: post.mediaItem.image }}
              style={{
                width: normalize(170),
                height: normalize(240),
                borderRadius: normalize(10),
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }
    if (domainOfTaste.id === 2) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MediaItemsViewScreen", {
              domainOfTaste,
              post,
              user,
            });
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
              // justifyContent: "center",
              // // padding: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: normalize(10),
                //   width: normalize(320),
                //   maxWidth: normalize(320),
                //   overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: post.mediaItem.image }}
                style={{
                  width: normalize(120),
                  height: normalize(120),
                  borderRadius: normalize(10),
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
                    fontWeight: 700,

                    // textAlign: "center",
                  }}
                  numberOfLines={5}
                >
                  {post.mediaItem.name}
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
  } catch (error) {
    console.error(error);
    return [];
  }
};

const styles = StyleSheet.create({
  itemSubtitle: {
    color: "white",
    fontSize: normalize(18),
    fontWeight: 400,
  },
});
