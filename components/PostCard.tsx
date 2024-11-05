import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  getButtonsAccentColor,
  getMoodTextColor,
  getMoodContainerColor,
  getItemSubTitle,
  normalize,
  getItemImage,
  getItemTitle,
  getLikeComponent,
  getScreenGradientFirstColor,
} from "../utils";
import { HomeNavigationProp, Post, PostCardProps } from "../types";
import { DOMAINPOSTTYPE } from "../constants";
import {
  DEFAULT_USER,
  getUserData,
  openSpotifyLink,
  playSpotifyPreviewSound,
  stopSpotifyPreviewSound,
} from "../utilsData";
import { fetchUserById, toggleLikePost } from "../utilsFirebase";
import { useCurrentUser } from "../CurrentUserContext";
import { Audio } from "expo-av";
import PostLikes from "./PostLikes";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window"); // Window Dimensions

export default function PostCard({ post }: PostCardProps) {
  const { currentUser } = useCurrentUser();
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(DEFAULT_USER);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPostLikesModalVisible, setIsPostLikesModalVisible] = useState(false);

  const profileNavigation = useNavigation<HomeNavigationProp>();

  const handleProfileNavigation = () => {
    profileNavigation.navigate("ExternalProfileScreen", { user });
  };

  const togglePostLikesModal = () => {
    setIsPostLikesModalVisible(!isPostLikesModalVisible);
  };
  useEffect(() => {
    // Ensure currentUser and currentUser.userId are defined
    if (
      currentUser &&
      currentUser.userId &&
      currentPost &&
      Array.isArray(currentPost.likesUserIdsList)
    ) {
      // Check if the current user has liked the post
      setIsLiked(currentPost.likesUserIdsList.includes(currentUser.userId));
    }

    const fetchUser = async () => {
      try {
        const user = await fetchUserById(currentPost.userId);
        if (user !== null) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error appropriately
      }
    };

    fetchUser();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Cleanup sound
      }
    };
  }, [currentPost, currentUser, sound]); // Keep currentUser as a dependency

  const handleLikePress = async () => {
    try {
      if (
        currentUser !== null &&
        currentPost !== null &&
        Array.isArray(currentPost.likesUserIdsList)
      ) {
        setIsLiked(!isLiked);
        await toggleLikePost(currentPost, currentUser, setCurrentPost);
      } else {
        throw new Error(
          "currentUser === null or currentPost === null or !Array.isArray(currentPost.likedUserIdsList"
        );
      }
    } catch (error) {
      console.error("Error in handleLikePress: ", error);
    }
  };

  const handleSpotifyButtonPress = () => {
    const url = currentPost.mediaItem.external_urls.spotify;
    openSpotifyLink(url);
  };

  const handleSoundButtonPress = () => {
    if (currentPost.domainId == 0 || currentPost.domainId == 2) {
      // console.log(
      //   "currentPost.mediaItem.audio_preview_url",
      //   currentPost.mediaItem.preview_url
      // );
      const previewUrl =
        currentPost.domainId == 0
          ? currentPost.mediaItem.preview_url
          : currentPost.mediaItem.audio_preview_url;
      if (previewUrl != null && previewUrl != undefined) {
        if (isPlaying) {
          stopSpotifyPreviewSound(sound, setIsPlaying);
        } else {
          playSpotifyPreviewSound(previewUrl, setSound, setIsPlaying);
        }
      } else {
        Alert.alert(
          "Ups!",
          `Sorry, no preview is available for "${currentPost.mediaItem.name}". Please check it out on Spotify.`
        );
      }
    } else {
      Alert.alert(
        "Ups!",
        "Sorry, no previews are available for Movies and TV Shows"
      );
    }
  };

  return (
    <View
      // Post Container
      // style={styles.container}
      style={{
        alignItems: "center",
        gap: normalize(7),
      }}
    >
      {/* <View
        style={{
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-end",
          top: normalize(74),
          right: normalize(46),
        }}
      >
        {getLikeComponent(
          isLiked,
          handleLikePress,
          DOMAINPOSTTYPE.get(currentPost.domainId)
        )}
      </View> */}

      <View
        style={{
          width: normalize(300),
          height: normalize(90),
          borderTopLeftRadius: normalize(15),
          borderTopRightRadius: normalize(15),
          backgroundColor: getMoodContainerColor(
            DOMAINPOSTTYPE.get(currentPost.domainId)
          ),
          bottom: normalize(-20),
          alignItems: "center",
          paddingTop: normalize(10),
          paddingBottom: normalize(24),
          // justifyContent: "center",
          // gap: normalize(0),
        }}
      >
        <ScrollView
          style={{
            maxWidth: normalize(300),

            // borderColor: "white",
            // borderWidth: normalize(4),
            // alignItems: "center",
            // justifyContent: "center",
          }}
          horizontal
        >
          <Text
            // postTitleText
            numberOfLines={1}
            style={{
              color: getMoodTextColor(DOMAINPOSTTYPE.get(currentPost.domainId)),
              fontSize: normalize(25),
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {getItemTitle(currentPost.mediaItem, currentPost.domainId)}
          </Text>
        </ScrollView>
        <View
          style={{
            // marginTop: normalize(10),
            maxWidth: normalize(300),
          }}
        >
          {getItemSubTitle(currentPost.mediaItem, currentPost.domainId)}
        </View>
      </View>
      {/* POST IMAGE */}
      <View
        style={{
          backgroundColor: getScreenGradientFirstColor(currentPost.domainId),
          borderRadius: normalize(15),
          ...(isPlaying
            ? {
                borderColor: getMoodTextColor(
                  DOMAINPOSTTYPE.get(currentPost.domainId)
                ),
                borderWidth: normalize(5),
              }
            : {}),
        }}
      >
        <Image
          // postImage
          resizeMethod="auto"
          style={{
            width: normalize(300),
            height:
              DOMAINPOSTTYPE.get(currentPost.domainId) === "Film/TVShow"
                ? normalize(450)
                : normalize(300),
            borderRadius: normalize(15),
            opacity: isPlaying ? 0.5 : 1,
            ...(isPlaying
              ? {}
              : {
                  borderColor: getMoodContainerColor(
                    DOMAINPOSTTYPE.get(currentPost.domainId)
                  ),
                  borderWidth: normalize(2),
                }),
          }}
          // source={{ uri: post.mediaItem.image }}
          source={getItemImage(currentPost.mediaItem, post.domainId)}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 0,
            width: normalize(40),
            paddingRight: normalize(7),
            // paddingHorizontal: normalize(12),
            height: normalize(40),
            right: normalize(-40),
            backgroundColor: getMoodContainerColor(
              DOMAINPOSTTYPE.get(post.domainId)
            ),
            borderTopRightRadius: normalize(10),
            borderBottomRightRadius: normalize(10),
            alignItems: "flex-end",
            justifyContent: "center",
            alignSelf: "flex-end",
            // borderWidth: normalize(4),
            // borderColor: "rgba(156, 75, 255, 1)",
          }}
          onPress={togglePostLikesModal}
        >
          <Text
            // postTitleText
            numberOfLines={1}
            style={{
              color: getMoodTextColor(DOMAINPOSTTYPE.get(post.domainId)),
              fontSize: normalize(25),
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {post.likesUserIdsList.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 0,
            width: normalize(60),
            height: normalize(40),
            right: 0,
            borderTopRightRadius: normalize(15),
            borderBottomLeftRadius: normalize(15),
            backgroundColor: isLiked
              ? "rgba(156, 75, 255, 0.9)"
              : "rgba(82, 42, 154, 0.75)",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          onPress={handleLikePress}
        >
          <Image
            style={{
              width: normalize(25),
              height: normalize(35),
            }}
            source={require("../assets/icons/RocksButtonIcon.png")}
          />
        </TouchableOpacity>
        {(currentPost.domainId == 0 || currentPost.domainId == 2) && (
          <View>
            <TouchableOpacity
              style={{
                position: "absolute",
                backgroundColor: "rgba(20, 97, 69, 1)",
                paddingVertical: normalize(5),
                paddingHorizontal: normalize(15),
                bottom: normalize(0),
                borderBottomLeftRadius: normalize(15),
                borderTopRightRadius: normalize(15),
                borderColor: "rgba(29, 185, 84, 1)",
                borderWidth: normalize(4),
              }}
              onPress={handleSpotifyButtonPress}
            >
              <Image
                style={{
                  width: normalize(30),
                  height: normalize(30),
                  // alignItems: "center",
                  // right: normalize(15),
                }}
                source={require("../assets/icons/SpotifyIcon.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: "absolute",
                width: normalize(32),
                height: normalize(32),
                bottom: normalize(10),
                right: normalize(10),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(28, 14, 52, 0.65)",
                borderRadius: normalize(100),
              }}
              onPress={handleSoundButtonPress}
            >
              <Image
                style={{
                  width: isPlaying ? normalize(22) : normalize(18),
                  height: normalize(18),
                }}
                source={
                  isPlaying
                    ? require("../assets/icons/MuteButtonIcon.png")
                    : require("../assets/icons/SoundButtonIcon.png")
                }
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* MOODS */}

      <View></View>
      <FlatList
        style={{
          marginHorizontal: normalize(50),
          // width: normalize(325),
          height: normalize(38),
        }}
        data={currentPost.moods}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: normalize(10),
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: mood }) => (
          // Mood
          <View
            // moodContainer
            style={{
              paddingHorizontal: normalize(25),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: normalize(10),
              height: normalize(25),
              backgroundColor: getMoodContainerColor(
                DOMAINPOSTTYPE.get(currentPost.domainId)
              ),
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: normalize(18),
                color: getMoodTextColor(
                  DOMAINPOSTTYPE.get(currentPost.domainId)
                ),
              }}
            >
              {mood.name}
              {/* should be mood.name */}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        // captionContainer
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: normalize(8),
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: normalize(100),
            width: normalize(50),
            height: normalize(50),
            backgroundColor: getMoodTextColor(
              DOMAINPOSTTYPE.get(post.domainId)
            ),
          }}
          onPress={() => {
            handleProfileNavigation();
          }}
        >
          <Image
            // profilePicture
            source={{ uri: user.profilePicture }}
            style={{
              borderRadius: normalize(100),
              width: normalize(50),
              height: normalize(50),
              borderWidth: normalize(2),
              borderColor: getMoodTextColor(DOMAINPOSTTYPE.get(post.domainId)),
            }}
            resizeMethod="auto"
          />
        </TouchableOpacity>
        <View
          // captionBox
          style={{
            width: normalize(240),
            // height: normalize(76),
            paddingVertical: normalize(5),
            borderRadius: normalize(5),
            backgroundColor: getMoodContainerColor(
              DOMAINPOSTTYPE.get(currentPost.domainId)
            ),
            // borderColor: getMoodTextColor(DOMAINPOSTTYPE.get(currentPost.domainId)),
            // borderWidth: normalize(2),
          }}
        >
          <View>
            <Text
              // captionUserName
              numberOfLines={1}
              style={{
                fontStyle: "normal",
                fontSize: normalize(18),
                fontWeight: "500",
                color: getMoodTextColor(
                  DOMAINPOSTTYPE.get(currentPost.domainId)
                ),
                marginLeft: normalize(4),
                // marginTop: normalize(5)
                // textShadowColor: "black",
                // textShadowOffset: { width: 0, height: 0 },
                // textShadowRadius: 15,
              }}
            >
              @{user.profileName}
            </Text>
          </View>
          <View
            // captionTextContainer
            style={{
              paddingBottom: normalize(10),
              paddingLeft: normalize(10),
            }}
          >
            <Text
              // captionText
              numberOfLines={3}
              style={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: normalize(18),
                lineHeight: 21,
                color: "white",
              }}
            >
              {currentPost.caption}
            </Text>
          </View>
        </View>
      </View>
      {isPostLikesModalVisible && (
        <PostLikes
          visible={isPostLikesModalVisible}
          onClose={togglePostLikesModal}
          likesUsersIdsList={post.likesUserIdsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  itemSubtitle: {
    color: "white",
    fontSize: normalize(18),
    fontWeight: "400",
  },
});
