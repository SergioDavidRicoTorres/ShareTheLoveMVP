import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  getButtonsAccentColor,
  getMoodTextColor,
  getMoodContainerColor,
  getItemSubTitle,
} from "../utils";

const { width } = Dimensions.get("window"); // Window Dimensions
const normalize = (value) => width * (value / 390);

export default PostCard = function ({ post }) {
  const [isLiked, setIsLiked] = useState(false);

  const getLikeComponent = (postType) => {
    try {
      if (postType === "Song") {
        if (isLiked) {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsLiked(!isLiked);
              }}
              style={{
                width: normalize(50),
                height: normalize(50),
                right: normalize(21),
                bottom: normalize(386),
                position: "absolute",
                zIndex: 1,
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
                source={require("../assets/icons/LikeSelectedIcon.png")}
                style={{ width: normalize(29), height: normalize(26) }}
              ></Image>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsLiked(!isLiked);
              }}
              style={{
                width: normalize(50),
                height: normalize(50),
                right: normalize(21),
                bottom: normalize(386),
                position: "absolute",
                zIndex: 1,
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
            >
              <Image
                source={require("../assets/icons/MusicLikeNotSelectedIcon.png")}
                style={{ width: normalize(29), height: normalize(26) }}
              ></Image>
            </TouchableOpacity>
          );
        }
      }
      if (postType === "Film/TVShow") {
        if (isLiked) {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsLiked(!isLiked);
              }}
              style={{
                width: normalize(50),
                height: normalize(50),
                right: normalize(21),
                bottom: normalize(561),
                position: "absolute",
                zIndex: 1,
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
                source={require("../assets/icons/LikeSelectedIcon.png")}
                style={{ width: normalize(29), height: normalize(26) }}
              ></Image>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsLiked(!isLiked);
              }}
              style={{
                width: normalize(50),
                height: normalize(50),
                right: normalize(21),
                bottom: normalize(561),
                position: "absolute",
                zIndex: 1,
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
            >
              <Image
                source={require("../assets/icons/FilmsTVShowsLikeNotSelectedIcon.png")}
                style={{ width: normalize(29), height: normalize(26) }}
              ></Image>
            </TouchableOpacity>
          );
        }
      }
      if (postType === "PodcastEpisode") {
        if (isLiked) {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsLiked(!isLiked);
              }}
              style={{
                width: normalize(50),
                height: normalize(50),
                right: normalize(21),
                bottom: normalize(428),
                position: "absolute",
                zIndex: 1,
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
                source={require("../assets/icons/LikeSelectedIcon.png")}
                style={{ width: normalize(29), height: normalize(26) }}
              ></Image>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsLiked(!isLiked);
              }}
              style={{
                width: normalize(50),
                height: normalize(50),
                right: normalize(21),
                bottom: normalize(428),
                position: "absolute",
                zIndex: 1,
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
            >
              <Image
                source={require("../assets/icons/PodcastsEpisodesLikeNotSelectedIcon.png")}
                style={{ width: normalize(29), height: normalize(26) }}
              ></Image>
            </TouchableOpacity>
          );
        }
      }
    } catch (error) {
      console.error(error);
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
      {getLikeComponent(post.type)}
      {/* POST TITLE */}

      <View
        // postTitleContainer
        // style={styles.postTitleContainer}
        style={{
          width: normalize(300),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          // postTitleText
          // style={[
          //   { ...styles.postTitleText },
          //   post.type === "Song"
          //     ? styles.textTitleMusic
          //     : styles.textTitleFilms_TV,
          // ]}
          style={{
            color: getButtonsAccentColor(post.type),
            fontSize: normalize(25),
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {post.name}
        </Text>
      </View>

      {/* POST SUBTITLE */}

      <View
        style={{
          maxWidth: normalize(300),
        }}
      >
        {getItemSubTitle(post, post.type)}
      </View>

      {/* POST IMAGE */}

      <Image
        // postImage
        resizeMethod="auto"
        style={{
          width: normalize(300),
          height: post.type === "Film/TVShow" ? normalize(450) : normalize(300),
          borderRadius: normalize(15),
        }}
        source={{ uri: post.image }}
      />

      {/* MOODS */}

      <View></View>
      <FlatList
        style={{
          marginHorizontal: normalize(50),
          // width: normalize(325),
          height: normalize(38),
        }}
        data={post.moods}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: normalize(10),
            }}
          />
        )}
        horizontal
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
              backgroundColor: getMoodContainerColor(post.type),
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: normalize(18),
                color: getMoodTextColor(post.type),
              }}
            >
              {mood}
              {/* should be mood.name */}
            </Text>
          </View>
        )}
      />

      <View
        // captionContainer
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: normalize(8),
        }}
      >
        <Image
          // profilePicture
          source={{ uri: post.user.profilePicture }}
          style={{
            borderRadius: normalize(100),
            width: normalize(50),
            height: normalize(50),
          }}
          resizeMethod="auto"
        />
        <View
          // captionBox
          style={{
            width: normalize(240),
            // height: normalize(76),
            // paddingVertical: normalize(5),
            borderRadius: normalize(5),
            backgroundColor: getMoodContainerColor(post.type),
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
                color: getMoodTextColor(post.type),
                // textShadowColor: "black",
                // textShadowOffset: { width: 0, height: 0 },
                // textShadowRadius: 15,
              }}
            >
              @{post.user.name}
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
              {post.caption}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  itemSubtitle: {
    color: "white",
    fontSize: normalize(18),
    fontWeight: 400,
  },
});
