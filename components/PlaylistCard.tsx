import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";

import Slider from "@react-native-community/slider";
import {
  getButtonsAccentColor,
  getPlaylistBigCardBackgroundColor,
  getMoodContainerColor,
  getMoodTextColor,
  getPlaylistScoreIcon,
  getPlaylistsMediaItemComponent,
  normalize,
  getScreenGradientFirstColor,
  getDomainOfTasteXIcon,
  confirmDeletePlaylist,
} from "../utils";
import {
  Playlist,
  PlaylistCardProps,
  PlaylistReview,
  ProfileContentNavigationProp,
} from "../types";

import { DOMAINPOSTTYPE } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  DEFAULT_PLAYLIST,
  decreaseUserPlaylistsCount,
  deletePlaylistAndRelatedData,
  updatePlaylistReview,
} from "../utilsFirebase";
import { useCurrentUser } from "../CurrentUserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { createSpotifyPlaylist } from "../SpotifyUtils";
import { openSpotifyLink } from "../utilsData";
const { width } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

export default function PlaylistCard({
  playlist,
  domainOfTaste,
  profileNavigation,
  user,
  posts,
}: PlaylistCardProps) {
  const playlistId = playlist.playlistId;
  const { currentUser } = useCurrentUser();
  const isCurrentUser = currentUser?.userId == user.userId;
  // const [playlist, setPlaylist] = useState<Playlist>(DEFAULT_PLAYLIST);
  const [currentReviewScore, setCurrentReviewScore] = useState<number>(0); // Original score from database
  const [sliderScore, setSliderScore] = useState<number>(0); // Score being manipulated by slider
  const [isScoreUpToDate, setIsScoreUpToDate] = useState(
    sliderScore === currentReviewScore
  ); // true
  const [isSpotifySynced, setIsSpotifySynced] = useState<Boolean>(false);
  const [spotifyId, setSpotifyId] = useState<string>("");

  // const [isScoreUpToDate, setIsScoreUpToDate] = useState (true); // true
  const profileContentNavigation =
    useNavigation<ProfileContentNavigationProp>();
  useEffect(() => {
    const userReview = playlist.reviewsList?.find(
      (review) => review.userId === currentUser?.userId
    );
    const fetchedScore = userReview ? userReview.score : 0;
    setCurrentReviewScore(fetchedScore);
    setSliderScore(fetchedScore); // Initialize slider with the fetched score
    setIsSpotifySynced(playlist.isSpotifySynced);
    setSpotifyId(playlist.spotifyId);
  }, [playlist, currentUser?.userId]);

  const handlePostPress = (index: number) => {
    profileContentNavigation.navigate("PostsViewScreen", {
      playlist,
      posts,
      user,
      index,
    });
  };

  const handleScoreChange = (newScore: number) => {
    const updatedScore = parseFloat(newScore.toFixed(1));
    setSliderScore(updatedScore);

    // // Since state updates are asynchronous, directly compare newScore with playlist.score
    setIsScoreUpToDate(updatedScore === currentReviewScore);
  };

  const handleDonePress = () => {
    console.log("playlistId: ", playlistId);

    if (playlist && currentUser?.userId) {
      updatePlaylistReview(playlist, {
        userId: currentUser.userId,
        score: sliderScore, // Replace this with the actual score you want to set
      }).catch((error) => {
        console.error("Error updating playlist review:", error);
      });
    } else {
      console.log("Playlist ID or User ID is undefined.");
    }
  };

  const handleSpotifyButtonPress = async () => {
    console.log("[handleSpotifyButtonPress] has been called!");
    if (!isSpotifySynced) {
      await handleSpotifySyncPlaylist();
    } else if (spotifyId != "") {
      const spotifyUrl = `https://open.spotify.com/playlist/${spotifyId}`;
      openSpotifyLink(spotifyUrl);
    }
  };

  const handleSpotifySyncPlaylist = async () => {
    console.log("[handleSpotifySyncPlaylist] has been called!");
    try {
      const result = await createSpotifyPlaylist(playlist, posts);
      if (result.success) {
        setIsSpotifySynced(true);
        setSpotifyId(result.spotifyId);
        Alert.alert("Success", "Playlist created and synced with Spotify!");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while creating the playlist.");
    }
  };
  // const DOMAINPOSTTYPE = {
  //   0: "Song",
  //   1: "Film/TVShow",
  //   2: "PodcastEpisode",
  // };
  // const playlistId = getPlaylistId(playlist);
  // const playlistsPosts = getPlaylistsPostsData(playlistId);
  return (
    <View
      style={{
        // justifyContent: "center",
        alignItems: "center",
        marginTop: normalize(20),
      }}
    >
      {domainOfTaste.domainId == 0 && !isSpotifySynced && isCurrentUser && (
        <TouchableOpacity
          style={{
            paddingHorizontal: normalize(20),
            paddingVertical: normalize(5),
            justifyContent: "center",
            alignItems: "center",
            gap: normalize(10),
            borderTopLeftRadius: normalize(15),
            borderTopRightRadius: normalize(15),
            flexDirection: "row",
            backgroundColor: "rgba(29, 185, 84, 1)",
          }}
          onPress={handleSpotifyButtonPress}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/icons/SpotifyIcon.png")}
          />
          <Text
            style={{
              color: "white",
              fontSize: normalize(20),
              fontWeight: "800",
            }}
          >
            Sync Playlist
          </Text>
        </TouchableOpacity>
      )}
      {domainOfTaste.domainId == 0 && isSpotifySynced && (
        <TouchableOpacity
          style={{
            paddingHorizontal: normalize(20),
            paddingVertical: normalize(5),
            justifyContent: "center",
            alignItems: "center",
            gap: normalize(10),
            borderTopLeftRadius: normalize(15),
            borderTopRightRadius: normalize(15),
            flexDirection: "row",
            backgroundColor: "rgba(20, 97, 69, 1)",
            borderTopWidth: normalize(6),
            borderLeftWidth: normalize(6),

            borderColor: "rgba(29, 185, 84, 1)",
          }}
          onPress={handleSpotifyButtonPress}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/icons/SpotifyIcon.png")}
          />
          <Text
            style={{
              color: "white",
              fontSize: normalize(20),
              fontWeight: "800",
            }}
          >
            Listen On Spotify
          </Text>
        </TouchableOpacity>
      )}
      <ImageBackground
        // playlistBackgroundImage
        source={{ uri: playlist.image }}
        // resizeMode="cover"
        style={{
          borderColor: getMoodContainerColor(
            DOMAINPOSTTYPE.get(domainOfTaste.domainId)
          ),
          borderWidth: normalize(4),
          borderRadius: normalize(15),
        }}
        imageStyle={{
          opacity: 0.8,
          borderRadius: normalize(15),
          // marginBottom: normalize(10),
        }}
        blurRadius={3}
      >
        <View
          // playlistContainer
          style={{
            width: normalize(373),
            //   height: 360,
            paddingBottom: 0,
            borderRadius: normalize(11),
            backgroundColor: getPlaylistBigCardBackgroundColor(domainOfTaste),
          }}
        >
          <View>
            <ScrollView
              horizontal
              style={{
                maxWidth: normalize(320),
                // backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  marginLeft: normalize(10),
                  marginTop: normalize(10),
                  color: "white",
                  fontSize: normalize(35),
                  fontWeight: "500",
                  maxWidth: normalize(310),
                }}
                // numberOfLines={1}
              >
                {playlist.name}
              </Text>
            </ScrollView>
            <FlatList
              style={{ marginLeft: normalize(10), marginRight: normalize(5) }}
              data={playlist.moods}
              horizontal
              renderItem={({ item: mood }) => (
                // Mood
                <View
                  // moodContainer
                  style={{
                    ...styles.moodContainer,
                    backgroundColor: getMoodContainerColor(
                      DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                    ),
                  }}
                >
                  <Text
                    // moodText
                    style={{
                      ...styles.moodText,
                      color: getMoodTextColor(
                        DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                      ),
                    }}
                  >
                    {mood.name}
                  </Text>
                </View>
              )}
              keyExtractor={(mood) => mood.id.toString()}
            />
            <FlatList
              style={{ marginTop: normalize(12), marginLeft: normalize(10) }}
              data={posts}
              horizontal
              renderItem={({ item, index }) =>
                // <Text>
                //   {item.toString()}
                // </Text>
                getPlaylistsMediaItemComponent({
                  domainOfTaste,
                  item,
                  profileContentNavigation: profileContentNavigation,
                  user,
                  isCurrentUser,
                  index,
                  handlePostPress,
                })
              }
              keyExtractor={(post, index) => index.toString()}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(58, 17, 90, 0.5)",
                borderRadius: normalize(10),
                marginTop: normalize(21),
                gap: normalize(5),
                paddingVertical: normalize(5),
                // 80
              }}
            >
              <Slider
                style={{ width: normalize(260), height: normalize(20) }}
                minimumValue={0}
                maximumValue={10}
                value={sliderScore}
                onValueChange={handleScoreChange}
                step={1}
                minimumTrackTintColor={getButtonsAccentColor(
                  DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                )}
                maximumTrackTintColor="rgba(58, 17, 90, 1)"
                // thumbTintColor={getButtonsAccentColor(
                //   DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                // )}
                thumbImage={getPlaylistScoreIcon(domainOfTaste)}
              />
              {/* <Image
              source={getPlaylistScoreIcon(domainOfTaste)}
              style={{ width: normalize(35), height: normalize(45) }}
            /> */}
              <Text
                style={{
                  color: getButtonsAccentColor(
                    DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                  ),
                  fontSize: normalize(25),
                  fontWeight: "900",
                }}
              >
                {sliderScore}
              </Text>
              {isScoreUpToDate ? (
                <View
                  style={{
                    paddingVertical: normalize(5),
                    paddingHorizontal: normalize(10),
                    justifyContent: "center",
                    alignContent: "center",
                    borderRadius: normalize(10),
                    borderWidth: normalize(4),
                    borderColor: "rgba(105, 51, 172, 1)",
                    backgroundColor: "rgba(53, 45, 111, 1)",
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(105, 51, 172, 1)",
                      fontSize: normalize(18),
                      fontWeight: "800",
                    }}
                  >
                    done
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: normalize(5),
                    paddingHorizontal: normalize(10),
                    justifyContent: "center",
                    alignContent: "center",
                    borderRadius: normalize(10),
                    borderWidth: normalize(4),
                    borderColor: getButtonsAccentColor(
                      DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                    ),
                    backgroundColor: getMoodContainerColor(
                      DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                    ),
                  }}
                  onPress={handleDonePress}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: normalize(18),
                      fontWeight: "800",
                    }}
                  >
                    done
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
      {isCurrentUser && (
        <TouchableOpacity
          style={{
            position: "absolute",
            // alignSelf: "flex-end",
            // alignItems: "flex-end",
            right: normalize(4),
            top: domainOfTaste.domainId == 0 ? normalize(45) : normalize(4),
            paddingHorizontal: normalize(20),
            paddingVertical: normalize(14),
            borderTopRightRadius: normalize(10),
            borderTopLeftRadius: normalize(0),
            borderBottomRightRadius: normalize(0),
            borderBottomLeftRadius: normalize(10),
            // borderWidth: normalize(4),
            backgroundColor: getScreenGradientFirstColor(
              domainOfTaste.domainId
            ),
            borderColor: getScreenGradientFirstColor(domainOfTaste.domainId),
          }}
          onPress={() => {
            confirmDeletePlaylist(playlistId);
            // Step 4: Decrease user's playlistsCount
            if (currentUser?.userId)
              decreaseUserPlaylistsCount(currentUser?.userId);
          }}
        >
          <Image
            source={getDomainOfTasteXIcon(domainOfTaste)}
            style={{
              width: normalize(22),
              height: normalize(22),
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  moodContainer: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    marginVertical: normalize(8),
    marginHorizontal: normalize(5),
  },
  moodText: {
    fontWeight: "600",
    fontSize: normalize(18),
  },
});
