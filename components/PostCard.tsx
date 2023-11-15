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
  normalize
} from "../utils";
import { PostCardProps } from "../types";
import { DOMAINPOSTTYPE } from "../constants";
import { getUserData } from "../utilsData";

const { width } = Dimensions.get("window"); // Window Dimensions

export default function PostCard ({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const user = getUserData(post.userId);

  const getLikeComponent = (postType?: string) => {
      switch (postType) {
        case "Song" :{
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
      case "Film/TVShow" : {
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
      case "PodcastEpisode" : {
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
      default : {
        return (<View
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
        />)
      }
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
      {getLikeComponent(DOMAINPOSTTYPE.get(post.domainId))}
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
          //   DOMAINPOSTTYPE.get(post.domainId) === "Song"
          //     ? styles.textTitleMusic
          //     : styles.textTitleFilms_TV,
          // ]}
          style={{
            color: getButtonsAccentColor(DOMAINPOSTTYPE.get(post.domainId)),
            fontSize: normalize(25),
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {post.mediaItem.name}
        </Text>
      </View>

      {/* POST SUBTITLE */}

      <View
        style={{
          maxWidth: normalize(300),
        }}
      >
        {getItemSubTitle(post, DOMAINPOSTTYPE.get(post.domainId))}
      </View>

      {/* POST IMAGE */}

      <Image
        // postImage
        resizeMethod="auto"
        style={{
          width: normalize(300),
          height: DOMAINPOSTTYPE.get(post.domainId) === "Film/TVShow" ? normalize(450) : normalize(300),
          borderRadius: normalize(15),
        }}
        source={{ uri: post.mediaItem.image }}
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
              backgroundColor: getMoodContainerColor(DOMAINPOSTTYPE.get(post.domainId)),
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: normalize(18),
                color: getMoodTextColor(DOMAINPOSTTYPE.get(post.domainId)),
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
          source={{ uri: user.profilePicture }}
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
            backgroundColor: getMoodContainerColor(DOMAINPOSTTYPE.get(post.domainId)),
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
                color: getMoodTextColor(DOMAINPOSTTYPE.get(post.domainId)),
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
    fontWeight: "400",
  },
});
