import React, { useState } from "react";
import { View, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
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
        // marginTop: -normalize(20),
        bottom: normalize(30),
        alignItems: "center",
        flex: 1,
      }}
    >
      {opened && (

          <TouchableOpacity
          style={{
            position: "absolute",
            bottom: normalize(55),
            right: normalize(100),
            alignItems: "center",
            justifyContent: "center",
            width: normalize(80),
            height: normalize(80),
            borderRadius: normalize(50),
            backgroundColor: "rgba(75, 117, 59, 1)",
            borderColor: "rgba(197, 238, 182, 1)", 
            borderWidth: normalize(5)
          }}
          onPress={toggleEpisodePostModal}
          >
            <Image
              resizeMode="contain"
              style={{
                height: normalize(80),
                width: normalize(80),
              }}
              source={require("../../assets/icons/AddPodcastEpisodeIcon.png")}
            />
          </TouchableOpacity>
      )}
      {opened && (
        // <View
        // >
          <TouchableOpacity 
          style={{
            position: "absolute",
            bottom: normalize(120),
            alignItems: "center",
            justifyContent: "center",
            width: normalize(80),
            height: normalize(80),
            borderRadius: normalize(50),
            backgroundColor: "rgba(0, 98, 62, 1)",
            borderColor: "rgba(153, 255, 218, 1))", 
            borderWidth: normalize(5)
          }}
          onPress={toggleMusicPostModal}
          >
            <Image
              resizeMode="contain"
              style={{
                height: normalize(80),
                width: normalize(80),
              }}
              source={require("../../assets/icons/AddSongIcon.png")}
            />
          </TouchableOpacity>
        // </View>
      )}
      {opened && (
        <View
        style={{
          position: "absolute",
          bottom: normalize(55),
          left: normalize(100),
          alignItems: "center",
          justifyContent: "center",
          width: normalize(80),
          height: normalize(80),
          borderRadius: normalize(50),
          backgroundColor: "rgba(99, 0, 101, 1)",
          borderColor: "rgba(253, 153, 255, 1)", 
          borderWidth: normalize(5)
        }}
        >
          <TouchableOpacity 
          onPress={toggleFilmTVShowPostModal}
          >
            <Image
              resizeMode="contain"
              style={{
                height: normalize(80),
                width: normalize(80),
              }}
              source={require("../../assets/icons/AddFilmTVShowIcon.png")}
            />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setOpened(!opened)}
        // style={{
          // shadowColor: "black",
          // shadowOpacity: 0.3,
          // shadowOffset: { width: 0, height: 2 },
        // }}
      >
        <View
          style={ opened ? styles.unselectedAddBotton : styles.selectedAddButton}
        >
          <Image
            source={require("../../assets/icons/AddButton.png")}
            resizeMode="contain"
            style={{
              width: normalize(80),
              height: normalize(80),
            }}
          />
        </View>
      </TouchableOpacity>
      <SearchMedia
        visible={isEpisodePostModalVisible}
        onClose={toggleEpisodePostModal}
        postType="PodcastEpisode"
        domainId={2}
      />
      <SearchMedia
        visible={isMusicPostModalVisible}
        onClose={toggleMusicPostModal}
        postType="Song"
        domainId={0}
      />
      <SearchMedia
        visible={isFilmTVShowPostModalVisible}
        onClose={toggleFilmTVShowPostModal}
        postType="Film/TVShow"
        domainId={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  unselectedAddBotton: {
      alignItems: "center",
      justifyContent: "center",
      top: 0,
      width: normalize(70),
      height: normalize(70),
      backgroundColor: "rgba(156, 75, 255, 1)",
      borderRadius: normalize(100),
      shadowColor: "rgba(77, 159, 217, 1)",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: normalize(20),
    }, 
    selectedAddButton: {
      alignItems: "center",
      justifyContent: "center",
      top: 0,
      width: normalize(70),
      height: normalize(70),
      backgroundColor: "rgba(156, 75, 255, 1)",
      borderRadius: normalize(100),
    }
  });
export default AddButtons;
