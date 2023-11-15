import React, { useState } from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import SearchMedia from "./SearchMedia";
import { normalize } from "../../utils";

function AddButtons() {
  const [isMusicPostModalVisible, setIsMusicPostModalVisible] = useState(false);
  const [isEpisodePostModalVisible, setIsEpisodePostModalVisible] =
    useState(false);
  const [isFilmTVShowPostModalVisible, setIsFilmTVShowPostModalVisible] =
    useState(false);

  const toggleMusicPostModal = () => {
    setIsMusicPostModalVisible(!isMusicPostModalVisible);
  };
  const toggleEpisodePostModal = () => {
    setIsEpisodePostModalVisible(!isEpisodePostModalVisible);
  };
  const toggleFilmTVShowPostModal = () => {
    setIsFilmTVShowPostModalVisible(!isFilmTVShowPostModalVisible);
  };

  const { width } = Dimensions.get("window"); // screen width constant
  // const normalize = (value) => width * (value / 390);
  const [opened, setOpened] = React.useState(false);

  return (
    <View
      style={{
        position: "relative",
        marginTop: -normalize(39),
        alignItems: "center",
        flex: 1,
      }}
    >
      {opened && (
        <View
          style={{
            position: "absolute",
            top: -normalize(39),
            left: -normalize(39),
            alignItems: "center",
            justifyContent: "center",
            width: normalize(50),
            height: normalize(50),
          }}
        >
          <TouchableOpacity onPress={toggleEpisodePostModal}>
            <Image
              resizeMode="contain"
              style={{
                height: normalize(80),
                width: normalize(80),
              }}
              source={require("../../assets/icons/AddEpisodeIcon.png")}
            />
          </TouchableOpacity>
        </View>
      )}
      {opened && (
        <View
          style={{
            position: "absolute",
            top: -normalize(98),
            alignItems: "center",
            justifyContent: "center",
            width: normalize(50),
            height: normalize(50),
          }}
        >
          <TouchableOpacity onPress={toggleMusicPostModal}>
            <Image
              resizeMode="contain"
              style={{
                height: normalize(80),
                width: normalize(80),
              }}
              source={require("../../assets/icons/AddMusicIcon.png")}
            />
          </TouchableOpacity>
        </View>
      )}
      {opened && (
        <View
          style={{
            position: "absolute",
            top: -normalize(39),
            right: -normalize(39),
            alignItems: "center",
            justifyContent: "center",
            width: normalize(50),
            height: normalize(50),
          }}
        >
          <TouchableOpacity onPress={toggleFilmTVShowPostModal}>
            <Image
              resizeMode="contain"
              style={{
                height: normalize(80),
                width: normalize(80),
              }}
              source={require("../../assets/icons/AddFilmsTVShowsIcon.png")}
            />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setOpened(!opened)}
        style={{
          shadowColor: "black",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            top: 0,
          }}
        >
          <Image
            source={require("../../assets/icons/AddButton.png")}
            resizeMode="contain"
            style={{
              width: normalize(102),
              height: normalize(102),
            }}
          />
        </View>
      </TouchableOpacity>
      <SearchMedia
        visible={isEpisodePostModalVisible}
        onClose={toggleEpisodePostModal}
        postType="PodcastEpisode"
      />
      <SearchMedia
        visible={isMusicPostModalVisible}
        onClose={toggleMusicPostModal}
        postType="Song"
      />
      <SearchMedia
        visible={isFilmTVShowPostModalVisible}
        onClose={toggleFilmTVShowPostModal}
        postType="Film/TVShow"
      />
    </View>
  );
}

export default AddButtons;
