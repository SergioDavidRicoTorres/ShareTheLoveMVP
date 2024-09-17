import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  RefreshControl,
  ScrollView,
  Text,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../components/PostCard";
import {
  getMoodContainerColor,
  getMoodTextColor,
  getPlaylistPreviewColor,
  normalize,
  shuffleArray,
} from "../utils";
import { HomeNavigationProp, Playlist, Post, User } from "../types";
import {
  DEFAULT_USER,
  fetchAllPlaylists,
  fetchAllUsers,
  fetchLastPosts,
  fetchPlaylistsExcludingUser,
  fetchPostsExcludingUser,
  fetchUsersExcludingUser,
  getDomainsPostsData,
  getPlaylistsPostsData,
} from "../utilsFirebase";
import { useCurrentUser } from "../CurrentUserContext";
import { DOMAINPOSTTYPE } from "../constants";
import PlaylistPreviewCard from "../components/PlaylistPreviewCard";
import UserPreviewCard from "../components/UserPreviewCard";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

export default function NotificationsScreen() {
  const { currentUser } = useCurrentUser();
  const { width, height } = Dimensions.get("window"); // screen width constant

  return (
    <LinearGradient // Background Color
      colors={["rgba(1, 4, 43, 1)", "rgba(105, 51, 172, 1)"]}
      style={{
        ...styles.container,
      }}
    >
      <StatusBar
        backgroundColor="rgba(105, 51, 172, 1)"
        barStyle="light-content"
      />
      <SafeAreaView
        style={{
          ...styles.container,
          marginTop: Platform.OS === "android" ? normalize(10) : 0,
        }} // External Container
      >
        <View
          style={{
            paddingVertical: normalize(20),
            paddingHorizontal: normalize(20),
            backgroundColor: "rgba(46, 27, 172, 1)",
            borderRadius: normalize(30),
            marginTop: normalize(30),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: normalize(25),
              fontWeight: 700,
              color: "rgba(194, 144, 255, 1)",
            }}
          >
            Notifications are coming soon!!!
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: normalize(30),
  },
});
