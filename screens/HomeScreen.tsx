import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../components/PostCard";
import { normalize } from "../utils";
import { HomeNavigationProp, Post } from "../types";
import { getChronologicallySortedPosts, getPosts } from "../utilsData";
import { fetchLastPosts } from "../utilsFirebase";

const postCardsExamples = [
  {
    "userId": 0,
    "domainId": 0,
    "playlistId": 1,
    "creationTime": 230,
    "likesCount": 80,
    "moods": [
      { "id": 19, "name": "Luxus", "isSelected": false, "creator": "Share The Love" },
      { "id": 24, "name": "Turn it up", "isSelected": false, "creator": "Share The Love" },
      { "id": 21, "name": "Unleashed", "isSelected": false, "creator": "Share The Love" }
    ],
    "caption": "This is the kind of stuff that feeds the egomaniac inside me",
    "mediaItem": {
      "name": "Wake Up In The Sky",
      "mediaType": "Song",
      "album": "Evil Genius",
      "artists": [
        " Bruno Mars",
        "Kodak Black",
        "Gucci Mane"
      ],
      "image": "https://i.scdn.co/image/ab67616d0000b273b64fc7036d0fccef26f9f7e8"
    }
  },
  {
    "userId": 0,
    "domainId": 0,
    "playlistId": 1,
    "creationTime": 120,
    "likesCount": 75,
    "moods": [
      { "id": 16, "name": "Beast mode", "isSelected": false, "creator": "Share The Love" },
      { "id": 13, "name": "Dancy", "isSelected": false, "creator": "Share The Love" },
      { "id": 24, "name": "Turn it up", "isSelected": false, "creator": "Share The Love" },
      { "id": 15, "name": "Speeding Up", "isSelected": false, "creator": "Share The Love" }
    ],
    "caption": "I guess i'm letting it out tonight!",
    "mediaItem": {
      "name": "Party Monster",
      "mediaType": "Song",
      "album": "Starboy",
      "artists": [
        "The Weeknd"
      ],
      "image": "https://i.scdn.co/image/ab67616d0000b273df1cfe1218748681e348e763"
    }
  }
];

// ELEMENT DIMENSIONS:

// feedContainer
// const feedContainerPaddingTop = width * 0.02;
// const feedContainerPaddingBottom = width * 0.2;
// feedItemSeparator
// const feedItemSeparatorHeight = width * 0.089;
export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      const fetchedPosts = await fetchLastPosts();
      setPosts(fetchedPosts);
    };

    fetchAndSetPosts();
  }, []);

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
  return (
    <LinearGradient // Background Color
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]}
      style={styles.container}
    >
      <SafeAreaView
        style={styles.container} // External Container
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
    // backgroundColor: "blue",
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
