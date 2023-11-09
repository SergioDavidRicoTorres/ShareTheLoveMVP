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
} from "../utils";

import { DOMAINPOSTTYPE } from "../constants";

const { width } = Dimensions.get("window"); // screen width constant
const normalize = (value) => width * (value / 390);

export default PlaylistCard = function ({
  playlist,
  domainOfTaste,
  navigation,
  user,
}) {
  const [score, setScore] = useState(playlist.score);
  // const DOMAINPOSTTYPE = {
  //   0: "Song",
  //   1: "Film/TVShow",
  //   2: "PodcastEpisode",
  // };

  return (
    <ImageBackground
      // playlistBackgroundImage
      source={{ uri: playlist.image }}
      resizeMode="cover"
      imageStyle={{
        opacity: 0.5,
        borderRadius: normalize(15),
        // marginBottom: normalize(10),
      }}
      blurRadius={5}
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
          <Text
            style={{
              marginLeft: normalize(10),
              marginTop: normalize(10),
              color: "white",
              fontSize: normalize(35),
              fontWeight: 500,
            }}
          >
            {playlist.name}
          </Text>
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
                    DOMAINPOSTTYPE[domainOfTaste.id]
                  ),
                }}
              >
                <Text
                  // moodText
                  style={{
                    ...styles.moodText,
                    color: getMoodTextColor(DOMAINPOSTTYPE[domainOfTaste.id]),
                  }}
                >
                  {mood.name}
                </Text>
              </View>
            )}
          />
          <FlatList
            style={{ marginTop: normalize(12), marginLeft: normalize(10) }}
            data={playlist.posts}
            horizontal
            renderItem={({ item }) =>
              getPlaylistsMediaItemComponent({
                domainOfTaste,
                item,
                navigation,
                user,
              })
            }
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
                DOMAINPOSTTYPE[domainOfTaste.id]
              )}
              maximumTrackTintColor="rgba(58, 17, 90, 1)"
              thumbTintColor={getButtonsAccentColor(
                DOMAINPOSTTYPE[domainOfTaste.id]
              )}
            />
            <Image
              source={getPlaylistScoreIcon(domainOfTaste)}
              style={{ width: normalize(35), height: normalize(45) }}
            />
            <Text
              style={{
                color: getButtonsAccentColor(DOMAINPOSTTYPE[domainOfTaste.id]),
                fontSize: normalize(20),
                fontWeight: 900,
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
    fontWeight: 600,
    fontSize: normalize(18),
  },
});
