import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  RefreshControl,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../components/PostCard";
import { normalize } from "../utils";
import { HomeNavigationProp, Post } from "../types";
import { getChronologicallySortedPosts, getPosts } from "../utilsData";
import { fetchLastPosts } from "../utilsFirebase";
import { useCurrentUser } from "../CurrentUserContext";
// import { StatusBar } from "expo-status-bar";

const postCardsExamples = [
  {
    userId: 0,
    domainId: 0,
    playlistId: 1,
    creationTime: 230,
    likesCount: 80,
    moods: [
      { id: 19, name: "Luxus", isSelected: false, creator: "Share The Love" },
      {
        id: 24,
        name: "Turn it up",
        isSelected: false,
        creator: "Share The Love",
      },
      {
        id: 21,
        name: "Unleashed",
        isSelected: false,
        creator: "Share The Love",
      },
    ],
    caption: "This is the kind of stuff that feeds the egomaniac inside me",
    mediaItem: {
      name: "Wake Up In The Sky",
      mediaType: "Song",
      album: "Evil Genius",
      artists: [" Bruno Mars", "Kodak Black", "Gucci Mane"],
      image: "https://i.scdn.co/image/ab67616d0000b273b64fc7036d0fccef26f9f7e8",
    },
  },
  {
    userId: 0,
    domainId: 0,
    playlistId: 1,
    creationTime: 120,
    likesCount: 75,
    moods: [
      {
        id: 16,
        name: "Beast mode",
        isSelected: false,
        creator: "Share The Love",
      },
      { id: 13, name: "Dancy", isSelected: false, creator: "Share The Love" },
      {
        id: 24,
        name: "Turn it up",
        isSelected: false,
        creator: "Share The Love",
      },
      {
        id: 15,
        name: "Speeding Up",
        isSelected: false,
        creator: "Share The Love",
      },
    ],
    caption: "I guess i'm letting it out tonight!",
    mediaItem: {
      name: "Party Monster",
      mediaType: "Song",
      album: "Starboy",
      artists: ["The Weeknd"],
      image: "https://i.scdn.co/image/ab67616d0000b273df1cfe1218748681e348e763",
    },
  },
];

// ELEMENT DIMENSIONS:

// feedContainer
// const feedContainerPaddingTop = width * 0.02;
// const feedContainerPaddingBottom = width * 0.2;
// feedItemSeparator
// const feedItemSeparatorHeight = width * 0.089;
export default function HomeScreen() {
  const { currentUser } = useCurrentUser();
  const { width } = Dimensions.get("window"); // screen width constant
  const navigation = useNavigation<HomeNavigationProp>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch data function
  const fetchAndSetPosts = async () => {
    const followingUsersList = currentUser?.followingUsersList ?? [];
    const fetchedPosts = await fetchLastPosts(followingUsersList, 50);
    setPosts(fetchedPosts);
  };

  // Initial data fetch
  useEffect(() => {
    fetchAndSetPosts();
  }, [currentUser]);

  // Refresh function
  const pullRefresh = useCallback(async () => {
    setRefresh(true);
    await fetchAndSetPosts();
    setTimeout(() => {
      setRefresh(false);
    }, 5000);
  }, [currentUser]); // Ensure this depends on currentUser if your fetching logic needs it
  // console.log(AuthSession.getRedirectUrl());  //outputs the redirect uri link for the spotify API
  // firestore()
  // .collection('posts')
  // .get()
  // .then(querySnapshot => {
  //   const posts = querySnapshot.docs.map(doc => ({
  //     id: doc.id, // Capture the document ID
  //     ...doc.data()
  //   }));
  //   // Now 'posts' is an array of objects, each with an 'id' property
  // });
  console.log("width: ", width);
  return (
    <LinearGradient // Background Color
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]}
      style={{
        ...styles.container,
        // paddingVertical: Platform.OS === "android" ? normalize(50) : 0,
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
            width: normalize(390),
            // marginHorizontal: normalize(40),
            height: normalize(30),
            marginTop: normalize(20),
          }}
        >
          <Image // AppTitle image
            source={require("../assets/icons/ShareTheLoveIcon.png")}
            resizeMode="contain"
            style={styles.appTitle}
          />
          <TouchableOpacity
            // SearchButton container
            onPress={() => {
              navigation.navigate("SearchUserScreen");
            }}
          >
            <Image
              // Search Button Image
              source={require("../assets/icons/SearchIcon.png")}
              resizeMode="contain"
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>

        <View
          // Feed container
          style={styles.feedContainer}
        >
          <FlatList
            // Feed
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={styles.feedItemSeparator} />
            )}
            keyExtractor={(item, index) => index.toString()} // keyExtractor={(item) => item.id}
            data={posts}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => pullRefresh()}
              />
            }
            renderItem={({ item: post }) => (
              // Post card
              <PostCard post={post} />
            )}
          />
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
  },

  appTitle: {
    position: "absolute",
    width: normalize(200),
    height: normalize(35),
  },
  searchButton: {
    position: "absolute",
    width: normalize(27),
    height: normalize(27),
    right: normalize(20),
  },
  feedContainer: {
    paddingTop: normalize(8),
    paddingBottom: normalize(78),
    alignItems: "center",
    // flex: 1,
    // backgroundColor: "green",
  },
  feedItemSeparator: {
    height: normalize(35),
  },
});
