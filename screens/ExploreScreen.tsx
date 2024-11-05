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

export default function ExploreScreen() {
  const { currentUser } = useCurrentUser();
  const { width, height } = Dimensions.get("window"); // screen width constant
  const navigation = useNavigation<HomeNavigationProp>();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [refresh, setRefresh] = useState(false);

  const userId = currentUser?.userId;
  if (!userId) {
    // Handle the case where currentUser is null
    // This could be a loading indicator, a message, or a redirect
    return <div>Loading userId...</div>;
  }
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  // Fetch data function
  const fetchAndSetPlaylists = async () => {
    const fetchedPlaylists = await fetchPlaylistsExcludingUser(userId);
    const shuffledPlaylists = shuffleArray(fetchedPlaylists);
    setPlaylists(shuffledPlaylists);
  };
  const fetchAndSetUsers = async () => {
    const fetchedUsers = await fetchUsersExcludingUser(userId);
    const shuffledUsers = shuffleArray(fetchedUsers);
    setUsers(shuffledUsers);
  };
  const fetchAndSetPosts = async () => {
    const fetchedPosts = await fetchPostsExcludingUser(userId);
    setPosts(fetchedPosts);
  };

  // Initial data fetch
  useEffect(() => {
    fetchAndSetPlaylists();
    fetchAndSetUsers();
    fetchAndSetPosts();
  }, [currentUser]);

  // Refresh function
  const pullRefresh = useCallback(async () => {
    setRefresh(true);
    await fetchAndSetPlaylists();
    setTimeout(() => {
      setRefresh(false);
    }, 5000);
  }, [currentUser]); // Ensure this depends on currentUser if your fetching logic needs it

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient // Background Color
        colors={["rgba(1, 4, 43, 1)", "rgba(105, 51, 172, 1)"]}
        style={{
          ...styles.container,
        }}
      >
        <StatusBar
          backgroundColor="rgba(1, 4, 43, 1)"
          barStyle="light-content"
        />
        <SafeAreaView
          style={{
            ...styles.container,
            marginTop: Platform.OS === "android" ? normalize(10) : 0,
          }} // External Container
        >
          <ScrollView
            // Feed container
            style={{
              height: height,
              width: width,
              // flex: 1,
              // backgroundColor: "white",
            }}
          >
            <View
              style={{
                paddingVertical: normalize(5),
                paddingHorizontal: normalize(10),
                backgroundColor: "rgba(46, 27, 172, 1)",
                borderRadius: normalize(30),
                marginTop: normalize(30),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: normalize(28),
                  fontWeight: "700",
                  color: "rgba(194, 144, 255, 1)",
                }}
              >
                Find some cool playlists:
              </Text>
            </View>
            <FlatList
              horizontal={true}
              data={playlists}
              style={{
                marginTop: normalize(25),
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                paddingVertical: normalize(20),
                borderRadius: normalize(25),
                paddingLeft: normalize(20),
              }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: normalize(20),
                    height: normalize(300),
                  }}
                />
              )}
              renderItem={({ item: playlist }) => {
                const user: User =
                  users.find((user) => user.userId === playlist.userId) ||
                  DEFAULT_USER;
                const playlistsPosts: Post[] = posts.filter(
                  (post) => post.playlistId === playlist.playlistId
                );
                return (
                  <PlaylistPreviewCard
                    playlist={playlist}
                    user={user}
                    posts={playlistsPosts}
                  />
                );
              }}
            />

            <View
              style={{
                paddingVertical: normalize(5),
                paddingHorizontal: normalize(10),
                backgroundColor: "rgba(46, 27, 172, 1)",
                borderRadius: normalize(30),
                marginTop: normalize(30),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: normalize(28),
                  fontWeight: "700",
                  color: "rgba(194, 144, 255, 1)",
                }}
              >
                Some people you might like:
              </Text>
            </View>

            <FlatList
              data={users}
              horizontal
              scrollEnabled={false}
              nestedScrollEnabled={true}
              ref={flatListRef}
              snapToAlignment="center"
              snapToInterval={width}
              style={{
                marginTop: normalize(25),
                marginBottom: normalize(40),
              }}
              renderItem={({ item: user, index }) => {
                const usersPlaylists: Playlist[] = playlists.filter(
                  (playlist) => playlist.userId === user.userId
                );
                return (
                  <UserPreviewCard
                    playlists={usersPlaylists}
                    user={user}
                    index={index}
                    usersCount={users.length}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                  />
                );
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </GestureHandlerRootView>
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
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
});
