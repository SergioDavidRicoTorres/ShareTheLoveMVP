import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
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
} from "../utils";
import { PlaylistCardProps, ProfileContentNavigationProp } from "../types";

import { DOMAINPOSTTYPE } from "../constants";
import { getPlaylistId, getPlaylistsPostsData, getPosts } from "../utilsData";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

export default function PlaylistCard ({
  playlist,
  domainOfTaste,
  profileNavigation,
  user,
  posts
}: PlaylistCardProps) {
  const [score, setScore] = useState(playlist.score);
  const profileContentNavigation = useNavigation<ProfileContentNavigationProp>();
  // const DOMAINPOSTTYPE = {
  //   0: "Song",
  //   1: "Film/TVShow",
  //   2: "PodcastEpisode",
  // };
  // const playlistId = getPlaylistId(playlist); 
  // const playlistsPosts = getPlaylistsPostsData(playlistId);
  return (
    <ImageBackground
      // playlistBackgroundImage
      source={{ uri: playlist.image }}
      // resizeMode="cover"
      style={{
        borderColor: getMoodContainerColor(DOMAINPOSTTYPE.get(domainOfTaste.domainId)),
        borderWidth: normalize(4), 
        borderRadius: normalize(15)
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
          borderRadius: normalize(15),
          backgroundColor: getPlaylistBigCardBackgroundColor(domainOfTaste),
        }}
      >
        <View>
          <ScrollView
          horizontal>

          <Text
            style={{
              marginLeft: normalize(10),
              marginTop: normalize(10),
              color: "white",
              fontSize: normalize(35),
              fontWeight: "500",
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
                    color: getMoodTextColor(DOMAINPOSTTYPE.get(domainOfTaste.domainId)),
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
            renderItem={({ item }) =>
            // <Text>
            //   {item.toString()}
            // </Text>
              getPlaylistsMediaItemComponent({
                domainOfTaste,
                item,
                profileContentNavigation: profileContentNavigation,
                user,
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
            }}
          >
            {/* <Slider
              style={{ width: normalize(273), height: normalize(20) }}
              trackStyle={{
                height: normalize(10),
                borderRadius: normalize(20),
              }}
              minimumValue={0}
              maximumValue={10}
              value={score}
              onValueChange={(newScore) => setScore(parseFloat(newScore.toFixed(1)))}
              minimumTrackTintColor={getPlaylistAccentColor(domainOfTaste)}
              maximumTrackTintColor="rgba(58, 17, 90, 1)"
              thumbStyle={{
                width: width * 0.035,
                height: width * 0.035,
                backgroundColor: getPlaylistAccentColor(domainOfTaste),
              }}
            /> */}
            <Slider
              style={{ width: normalize(273), height: normalize(20) }}
              minimumValue={0}
              maximumValue={10}
              value={score}
              onValueChange={(newScore) =>
                setScore(parseFloat(newScore.toFixed(1)))
              }
              step={1}
              minimumTrackTintColor={getButtonsAccentColor(
                DOMAINPOSTTYPE.get(domainOfTaste.domainId)
              )}
              maximumTrackTintColor="rgba(58, 17, 90, 1)"
              thumbTintColor={getButtonsAccentColor(
                DOMAINPOSTTYPE.get(domainOfTaste.domainId)
              )}
            />
            <Image
              source={getPlaylistScoreIcon(domainOfTaste)}
              style={{ width: normalize(35), height: normalize(45) }}
            />
            <Text
              style={{
                color: getButtonsAccentColor(DOMAINPOSTTYPE.get(domainOfTaste.domainId)),
                fontSize: normalize(20),
                fontWeight: "900",
              }}
            >
              {score}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

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
