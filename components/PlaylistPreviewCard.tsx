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
  Platform,
} from "react-native";

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
  getPlaylistPreviewColor,
  getItemImage,
  getGradientsFirstColor,
  getItemTitle,
  getItemSubTitle,
} from "../utils";
import {
  ExploreNavigationProp,
  HomeNavigationProp,
  Playlist,
  PlaylistCardProps,
  PlaylistPreviewCardProps,
  PlaylistReview,
  Post,
  ProfileContentNavigationProp,
  User,
} from "../types";

import { DOMAINPOSTTYPE } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { openSpotifyLink } from "../utilsData";
const { width } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

export default function PlaylistPreviewCard({
  posts,
  playlist,
  user,
}: PlaylistPreviewCardProps) {
  const playlistId = playlist.playlistId;
  //   const { currentUser } = useCurrentUser();
  //   const isCurrentUser = currentUser?.userId == user.userId;
  //   const [posts, setPosts] = useState<Post[]>([]);

  // Fetch data function
  //   const fetchAndSetPlaylistsPosts = async () => {
  //     const fetchedPosts = await getPlaylistsPostsData(playlist.playlistId);
  //     setPosts(fetchedPosts);
  //   };
  const profileNavigation = useNavigation<ExploreNavigationProp>();

  const handleProfileNavigation = () => {
    profileNavigation.navigate("ExternalProfileScreen", { user });
  };

  //   useEffect(() => {
  //     // fetchAndSetPlaylistsPosts();
  //   }, [playlist]);

  const handleSpotifyButtonPress = async () => {
    if (playlist.spotifyId != "") {
      const spotifyUrl = `https://open.spotify.com/playlist/${playlist.spotifyId}`;
      openSpotifyLink(spotifyUrl);
    }
  };

  return (
    <View
      style={{
        // justifyContent: "center",
        alignItems: "center",
        // marginTop: normalize(20),
        // paddingVertical: normalize(10),
      }}
    >
      <TouchableOpacity
        style={{
          height: normalize(118),
          width: normalize(290),
          backgroundColor: getScreenGradientFirstColor(playlist.domainId),
          borderTopLeftRadius: normalize(15),
          borderTopRightRadius: normalize(15),
          marginBottom: normalize(-40),
          flexDirection: "row",
          paddingHorizontal: normalize(8),
          paddingVertical: normalize(8),
        }}
        onPress={() => handleProfileNavigation()}
      >
        <View
          style={{
            height: normalize(60),
            width: normalize(60),
            borderRadius: normalize(100),
            backgroundColor: getMoodTextColor(
              DOMAINPOSTTYPE.get(playlist.domainId)
            ),
          }}
        >
          <Image
            resizeMethod="auto"
            style={{
              height: normalize(60),
              width: normalize(60),
              borderRadius: normalize(100),
              borderWidth: normalize(3),
              borderColor: getMoodTextColor(
                DOMAINPOSTTYPE.get(playlist.domainId)
              ),
            }}
            source={{
              uri: user.profilePicture,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: normalize(10),
            maxWidth: normalize(200),
          }}
        >
          <Text
            style={{
              fontSize: normalize(23),
              fontWeight: "800",
              color: getMoodTextColor(DOMAINPOSTTYPE.get(playlist.domainId)),
            }}
            numberOfLines={1}
          >
            {user.name}
          </Text>
          <Text
            style={{
              fontSize: normalize(18),
              fontWeight: "500",
              color: "white",
              marginTop: normalize(3),
            }}
            numberOfLines={1}
          >
            @{user.profileName}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          //   marginLeft: normalize(20),
          height: normalize(300),
          width: normalize(300),
          backgroundColor: getPlaylistPreviewColor(playlist.domainId),
          borderRadius: normalize(15),
          paddingBottom: normalize(5),
        }}
      >
        <View
          style={{
            marginTop: normalize(10),
            marginHorizontal: normalize(15),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: normalize(28),
              fontWeight: "600",
              color: "white",
            }}
          >
            {playlist.name}
          </Text>
        </View>
        <View
          style={{
            // height: normalize(30),
            // backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <FlatList
            style={{
              marginLeft: normalize(10),
              marginRight: normalize(5),
              flexDirection: "row",
            }}
            data={playlist.moods}
            // numColumns={1}
            horizontal={true}
            scrollEnabled={false}
            renderItem={({ item: mood }) => (
              // Mood
              <View
                // moodContainer
                style={{
                  ...styles.moodContainer,
                  backgroundColor: getMoodContainerColor(
                    DOMAINPOSTTYPE.get(playlist.domainId)
                  ),
                }}
              >
                <Text
                  // moodText
                  style={{
                    ...styles.moodText,
                    color: getMoodTextColor(
                      DOMAINPOSTTYPE.get(playlist.domainId)
                    ),
                  }}
                >
                  {mood.name}
                </Text>
              </View>
            )}
            keyExtractor={(mood) => mood.id.toString()}
          />
        </View>
        <FlatList
          data={posts}
          renderItem={({ item: post }) => (
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                gap: normalize(13),
                marginTop: normalize(10),
              }}
            >
              <Image
                resizeMethod="auto"
                style={{
                  height: normalize(40),
                  width: normalize(40),
                  borderRadius: normalize(10),
                }}
                source={getItemImage(post.mediaItem, post.domainId)}
              />
              <View
                style={{
                  width: normalize(222),
                  height: normalize(40),
                  backgroundColor: getScreenGradientFirstColor(
                    playlist.domainId
                  ),
                  borderRadius: normalize(5),
                  paddingHorizontal: normalize(10),
                  paddingVertical: normalize(2),
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: normalize(18),
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  {getItemTitle(post.mediaItem, post.domainId)}
                </Text>
                {/* <Text
                  numberOfLines={1}
                  style={{
                    fontSize: normalize(8),
                    fontWeight: 400,
                    color: "white",
                    marginTop: normalize(-5),
                  }}
                > */}
                <View
                  style={{
                    marginTop:
                      Platform.OS == "android" ? normalize(-4) : normalize(0),
                  }}
                >
                  {getItemSubTitle(post.mediaItem, post.domainId, styles)}
                </View>
                {/* </Text> */}
              </View>
            </View>
          )}
        />
      </View>
      {playlist.domainId == 0 && playlist.isSpotifySynced && (
        <TouchableOpacity
          style={{
            paddingHorizontal: normalize(20),
            paddingVertical: normalize(5),
            justifyContent: "center",
            alignItems: "center",
            gap: normalize(10),
            borderBottomLeftRadius: normalize(15),
            borderBottomRightRadius: normalize(15),
            flexDirection: "row",
            backgroundColor: "rgba(20, 97, 69, 1)",
            borderBottomWidth: normalize(6),
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
  itemSubtitle: {
    fontSize: normalize(12),
    fontWeight: "400",
    color: "white",
    // marginTop: normalize(-5),
  },
});
