import {
  getDomainsOfTasteGradientsFirstColor,
  getItemImage,
  getItemTitle,
  getMoodContainerColor,
  getMoodTextColor,
  getScreenGradientFirstColor,
  normalize,
} from "../utils";
import { useCurrentUser } from "../CurrentUserContext";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { BigPostCardProps, Post } from "../types";
import {
  Image,
  ImageBackground,
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { DOMAINPOSTTYPE } from "../constants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { toggleLikePost } from "../utilsFirebase";
import {
  openSpotifyLink,
  playSpotifyPreviewSound,
  stopSpotifyPreviewSound,
} from "../utilsData";
import MediaItemInfo from "./MediaItemInfo";
import PostLikes from "./PostLikes";

const { width } = Dimensions.get("window"); // Window Dimensions

export default function BigPostCard({
  domainId,
  post,
  user,
}: BigPostCardProps) {
  const { currentUser } = useCurrentUser();
  const [isLiked, setIsLiked] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPostLikesModalVisible, setIsPostLikesModalVisible] = useState(false);

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
        post !== null &&
        Array.isArray(post.likesUserIdsList)
      ) {
        setIsLiked(!isLiked);
        await toggleLikePost(post, currentUser, setCurrentPost);
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

  const [isMediaItemInfoModalVisible, setIsMediaItemInfoModalVisible] =
    useState(false);
  // Optional Modal show Function
  const toggleMediaItemInfoModal = () => {
    setIsMediaItemInfoModalVisible(!isMediaItemInfoModalVisible);
  };
  const togglePostLikesModal = () => {
    setIsPostLikesModalVisible(!isPostLikesModalVisible);
  };

  return (
    <View
      style={{
        width: normalize(325),
        height: width * 1.55,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: getScreenGradientFirstColor(domainId),
        //   height: 660,
        // bottom: normalize(2),
        borderRadius: normalize(15),
        ...(isPlaying
          ? {
              shadowColor: getScreenGradientFirstColor(domainId),
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 1,
              shadowRadius: normalize(8),
            }
          : {}),
      }}
    >
      <ImageBackground
        source={
          // { uri: post.mediaItem.image }
          getItemImage(post.mediaItem, domainId)
        }
        resizeMode="cover"
        imageStyle={{
          opacity: 0.9,
          borderRadius: normalize(15),
          borderWidth: normalize(4),
          borderColor: isPlaying
            ? getDomainsOfTasteGradientsFirstColor(domainId)
            : getMoodContainerColor(DOMAINPOSTTYPE.get(domainId)),
        }}
        blurRadius={3}
      >
        <View
          style={{
            alignItems: "center",
            width: normalize(327),
            height: Platform.OS === "android" ? width * 1.55 : normalize(630),
            borderRadius: normalize(15),
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {(post.domainId == 0 || post.domainId == 2) && (
              <TouchableOpacity
                style={{
                  // position: "absolute",
                  backgroundColor: "rgba(20, 97, 69, 1)",
                  paddingVertical: normalize(5),
                  paddingHorizontal: normalize(15),
                  left: normalize(0),
                  top: normalize(0),
                  borderBottomRightRadius: normalize(15),
                  borderTopLeftRadius: normalize(15),
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
            )}
            <ScrollView
              style={{
                marginRight: isPlaying ? normalize(15) : 0,
                backgroundColor: getScreenGradientFirstColor(domainId),
                borderBottomRightRadius: normalize(15),
                borderBottomLeftRadius: normalize(15),
                top: normalize(4),
                paddingVertical: normalize(8),
                paddingHorizontal: normalize(10),
                maxWidth: normalize(200),
              }}
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              horizontal
            >
              <Text
                style={{
                  // marginBottom: normalizse(10),
                  color: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
                  fontSize: normalize(24),
                  fontWeight: "700",
                  textAlign: "center",
                  maxWidth: normalize(190),
                  alignSelf: "center",
                }}
                numberOfLines={1}
              >
                {getItemTitle(post.mediaItem, post.domainId)}
              </Text>
            </ScrollView>
            {(post.domainId == 0 || post.domainId == 2) && (
              <View
                style={{
                  // backgroundColor: "white",
                  width: normalize(40),
                  // height: 20,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    // position: "absolute",
                    width: normalize(32),
                    height: normalize(32),
                    top: normalize(10),
                    right: normalize(12),
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
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                // position: "absolute",
                width: normalize(50),
                height: normalize(40),
                left: normalize(105),
                // bottom: normalize(350),
                borderTopLeftRadius: normalize(15),
                borderTopRightRadius: normalize(15),
                backgroundColor: isLiked
                  ? "rgba(156, 75, 255, 0.9)"
                  : "rgba(82, 42, 154, 0.75)",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={handleLikePress}>
                <Image
                  style={{
                    width: normalize(25),
                    height: normalize(35),
                  }}
                  source={require("../assets/icons/RocksButtonIcon.png")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: normalize(40),
                paddingRight: normalize(7),
                borderTopLeftRadius: normalize(15),

                // paddingHorizontal: normalize(12),
                height: normalize(40),
                left: normalize(105),
                backgroundColor: getMoodContainerColor(
                  DOMAINPOSTTYPE.get(post.domainId)
                ),
                borderTopRightRadius: normalize(10),
                borderBottomRightRadius: normalize(10),
                alignItems: "flex-end",
                justifyContent: "center",
                alignSelf: "center",
                // borderWidth: normalize(4),
                // borderColor: "rgba(156, 75, 255, 1)",
              }}
            >
              <TouchableOpacity onPress={togglePostLikesModal}>
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
            </View>
          </View>

          {/* <View> */}

          <View
            style={{
              width: normalize(300),
              height: normalize(180),
              borderRadius: normalize(10),
              backgroundColor: getScreenGradientFirstColor(domainId),
              backfaceVisibility: "hidden",
              marginBottom: normalize(10),
              alignItems: "center",
              borderColor: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
              borderWidth: normalize(2),
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: normalize(70),
                height: normalize(70),
                borderRadius: normalize(70),
                shadowColor: getDomainsOfTasteGradientsFirstColor(domainId),
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 1,
                shadowRadius: normalize(8),
                bottom: normalize(50),
              }}
            >
              {/* <Text>{user.name}</Text> */}
              <Image
                style={{
                  width: normalize(70),
                  height: normalize(70),
                  borderRadius: normalize(70),
                  borderColor: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
                  borderWidth: normalize(3),
                }}
                source={{ uri: user.profilePicture }}
              />
            </View>
            <View style={{ height: normalize(25), bottom: normalize(40) }}>
              <FlatList
                data={post.moods}
                // style={{ marginLeft: normalize(10), marginRight: 5 }}
                horizontal
                renderItem={({ item: mood }) => (
                  // Mood

                  <View
                    // moodContainer
                    style={{
                      ...styles.moodContainer,
                      backgroundColor: getMoodContainerColor(
                        DOMAINPOSTTYPE.get(domainId)
                      ),
                    }}
                  >
                    <Text
                      // moodText
                      style={{
                        ...styles.moodText,
                        color: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
                      }}
                    >
                      {mood.name}
                    </Text>
                  </View>
                )}
                keyExtractor={(mood) => mood.id.toString()}
              />
            </View>
            <View style={{ alignItems: "flex-start", bottom: normalize(30) }}>
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(18),
                  fontWeight: "600",
                  marginHorizontal: normalize(2),
                }}
              >
                @{user.profileName}
              </Text>
              <View style={{ width: normalize(280) }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(18),
                    fontWeight: "300",
                    marginHorizontal: normalize(10),
                  }}
                  numberOfLines={4}
                >
                  {post.caption}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              toggleMediaItemInfoModal();
            }}
            style={{
              backgroundColor: getMoodContainerColor(
                DOMAINPOSTTYPE.get(domainId)
              ),
              paddingHorizontal: normalize(20),
              paddingVertical: 5,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: normalize(10),
              marginBottom: normalize(30),
              borderColor: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
              borderWidth: normalize(2),
            }}
          >
            <Text
              style={{
                color: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
                fontSize: normalize(20),
                fontWeight: "700",
                // marginHorizontal: normalize(20),

                // marginVertical: normalize(10),
              }}
            >
              More Info
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </ImageBackground>
      {isMediaItemInfoModalVisible && (
        <MediaItemInfo
          visible={isMediaItemInfoModalVisible}
          onClose={toggleMediaItemInfoModal}
          post={post}
        />
      )}
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
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },

  // moodContainer: {
  //   paddingVertical: moodContainerPaddingVertical,
  //   paddingHorizontal: moodContainerPaddingHorizontal,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: moodContainerBorderRadius,
  //   // marginVertical: moodContainerMarginVertical,
  //   marginHorizontal: moodContainerMarginHorizontal,
  // },
  // moodText: {
  //   fontWeight: "600",
  //   fontSize: moodTextFontSize,
  // },
  moodContainer: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    // marginVertical: normalize(8),
    marginHorizontal: normalize(5),
  },
  moodText: {
    fontWeight: "600",
    fontSize: normalize(18),
  },
  backButtonImage: {
    width: normalize(14),
    height: normalize(23),
  },
});
