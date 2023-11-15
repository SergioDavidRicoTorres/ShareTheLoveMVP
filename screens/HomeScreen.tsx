import React from "react";
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
import { HomeNavigationProp } from "../types";
import { getChronologicallySortedPosts } from "../utilsData";

const postCardsExamples = [
  {
    id: "song-1",
    type: "Song",
    image: "https://cdn.albumoftheyear.org/album/511391-ferxxo-100.jpg",
    name: "Ferxxo 100",
    artists: [{ name: "Feid" }],
    user: {
      name: "Jake82",
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
    },
    moods: ["maleanteo", "moody", "nostalgic", "in my feelings"],
    caption: "Insane Beat!!!",
  },
  {
    id: "song-2",
    type: "Song",
    image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    name: "Starboy",
    artists: [{ name: "The Weeknd" }, { name: "Daft Punk" }],
    user: {
      name: "Chris",
      profilePicture:
        "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    moods: [
      "beast mode",
      "anthem",
      "badass",
      "heartless eyes",
      "monster",
      "night lights",
    ],
    caption: "Beat mode on!!!",
  },
  {
    id: "post_4",
    image: "https://i.scdn.co/image/ab6765630000ba8a563ebb538d297875b10114b7",
    name: "#373 – Manolis Kellis: Evolution of Human Civilization and Superintelligent AI",
    type: "PodcastEpisode",
    description:
      "Manolis Kellis is a computational biologist at MIT. Please support this podcast by checking out our sponsors:  - Eight Sleep: https://www.eightsleep.com/lex to get special savings  - NetSuite: http://netsuite.com/lex to get free product tour  - ExpressVPN: https://expressvpn.com/lexpod to get 3 months free  - InsideTracker: https://insidetracker.com/lex to get 20% off   EPISODE LINKS:  Manolis Website: http://web.mit.edu/manoli/  Manolis Twitter: https://twitter.com/manoliskellis  Manolis YouTube: https://youtube.com/@ManolisKellis1   PODCAST INFO:  Podcast website: https://lexfridman.com/podcast  Apple Podcasts: https://apple.co/2lwqZIr  Spotify: https://spoti.fi/2nEwCF8  RSS: https://lexfridman.com/feed/podcast/  YouTube Full Episodes: https://youtube.com/lexfridman  YouTube Clips: https://youtube.com/lexclips   SUPPORT & CONNECT:  - Check out the sponsors above, it's the best way to support this podcast  - Support on Patreon: https://www.patreon.com/lexfridman  - Twitter: https://twitter.com/lexfridman  - Instagram: https://www.instagram.com/lexfridman  - LinkedIn: https://www.linkedin.com/in/lexfridman  - Facebook: https://www.facebook.com/lexfridman  - Medium: https://medium.com/@lexfridman   OUTLINE:  Here's the timestamps for the episode. On some podcast players you should be able to click the timestamp to jump to that time.  (00:00) - Introduction  (00:34) - Humans vs AI  (09:40) - Evolution  (31:24) - Nature vs Nurture  (43:53) - AI alignment  (50:17) - Impact of AI on the job market  (1:01:57) - Human gatherings  (1:06:57) - Human-AI relationships  (1:17:01) - Being replaced by AI  (1:29:27) - Fear of death  (1:41:23) - Consciousness  (1:48:48) - AI rights and regulations  (1:54:31) - Halting AI development  (2:07:42) - Education  (2:13:06) - Biology research  (2:20:26) - Meaning of life  (2:22:59) - Loneliness",
    user: {
      name: "tv_guru",
      profilePicture:
        "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    moods: ["existential", "moody", "meaning search"],
    caption: "Refreshing perception on AI, and simply wonderful Human!",
  },
  {
    id: "TV-show-3",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    name: "Bojack Horeseman",
    type: "Film/TVShow",
    media_type: "TV-Show",
    user: {
      name: "tv_guru",
      profilePicture:
        "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    moods: ["existential", "moody", "meaning search"],
    caption: "Way too deep for an animated TV Show ...more",
  },
];

// ELEMENT DIMENSIONS:

// feedContainer
// const feedContainerPaddingTop = width * 0.02;
// const feedContainerPaddingBottom = width * 0.2;
// feedItemSeparator
// const feedItemSeparatorHeight = width * 0.089;
export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const posts = getChronologicallySortedPosts();
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
            keyExtractor={(index) => index.toString()} // keyExtractor={(item) => item.id}
            data={posts}
            renderItem={({ item }) => (
              // Post card
              <PostCard post={item} />
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
