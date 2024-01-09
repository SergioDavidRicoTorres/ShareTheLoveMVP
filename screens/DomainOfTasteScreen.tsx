import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCurrentUserData } from "../UserData";
import PlaylistCard from "../components/PlaylistCard";
import { getMoodContainerColor, getMoodTextColor, getScreenGradientFirstColor } from "../utils";
import { normalize } from "../utils";
import { ProfileNavigationProp, DomainOfTasteScreenRouteProp, Playlist, Post, ProfileContentNavigationProp } from "../types";
import { clusterPostsByPlaylistId, getDomainName } from "../utilsData";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { DOMAINPOSTTYPE } from "../constants";
import { getDomainsPlaylistsData, getDomainsPostsData } from "../utilsFirebase";
import { useCurrentUser } from "../CurrentUserContext";

const { width } = Dimensions.get("window"); // screen width constant

const user = getCurrentUserData();
// const normalize = (value) => width * (value / 390);

// moodText
const moodTextFontSize = width * 0.046;
// backButtonImage
const backButtonImageWidth = width * 0.036;
const backButtonImageHeight = width * 0.059;

// const getScreenGradientFirstColor = (category) => {
//   try {
//     if (category.id === 0) {
//       return "rgba(0, 98, 62, 1)";
//     }
//     if (category.id === 1) {
//       return "rgba(99, 0, 101, 1)";
//     }
//     if (category.id === 2) {
//       return "rgba(75, 117, 59, 1)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

export default function DomainOfTasteScreen() {
  const { currentUser } = useCurrentUser();
  const route = useRoute<DomainOfTasteScreenRouteProp>();
  const { domainOfTaste, user, selectedUserId } = route.params;
  const isCurrentUser = user.userId === currentUser?.userId;
  const profileNavigation = useNavigation<ProfileNavigationProp>();
  const profileContentNavigation = useNavigation<ProfileContentNavigationProp>();
  const userId = user.userId !== undefined ? user.userId : "Cannot define userId: no user was passed";
  console.log("userId: ", userId)
  // const userId = isCurrentUser ? selectedUserId : (FIREBASE_AUTH.currentUser?.uid || "defaultUserId");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [clusteredPlaylistsPosts, setClusteredPlaylistsPosts] = useState<Map<string, Post[]>>();

  useEffect(() => {
      const fetchData = async () => {
        try {
          const playlistsData = await getDomainsPlaylistsData(userId, domainOfTaste.domainId);
          setPlaylists(playlistsData);
          const postsData = await getDomainsPostsData(userId, domainOfTaste.domainId);
    // console.log("==================================================")
    // console.log("================= UNCLUSTERED POSTS ===================")
    // console.log(postsData);
    // console.log("==================================================")
          const clusteredPosts = clusterPostsByPlaylistId(postsData);
          setClusteredPlaylistsPosts(clusteredPosts);
        } catch (error) {
          console.error('Error fetching playlists data:', error);
          // Handle the error appropriately
        }
      };
      fetchData();
    }, [userId, domainOfTaste.domainId]); // Dependencies
  // console.log("DOMAIN OF TASTE: ", domainOfTaste)
  // if (userId === null) {
  
  // }
  // const playlists = getDomainsPlaylistsData(userId, domainOfTaste.domainId);
  // console.log("PLAYLISTS: ", playlists)

  return (
    <LinearGradient
      colors={[getScreenGradientFirstColor(domainOfTaste), "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            // backgroundColor: getScreenGradientFirstColor(domainOfTaste),
            width,
            paddingBottom: normalize(5),
          }}
        >

          {/* Back Button */}
          <TouchableOpacity
                  // backButtonContainer
                  onPress={() => profileNavigation.goBack()}
                  style={{
                    left: normalize(10)
                  }}
                >
                  {/* Back Button Image */}
                  <Image
                    source={require("../assets/icons/ArrowBack.png")}
                    style={{
                      width: normalize(17),
                      height: normalize(28),
                    }}
                  />
                </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            {/* <View style={{ marginTop: 25, marginBottom: 150 }}> */}
            {/* Back Button */}
            <Text
              style={{
                marginBottom: normalize(10),
                color: "white",
                fontSize: normalize(40),
                fontWeight: "700",
              }}
            >
              {getDomainName(domainOfTaste.domainId)}
            </Text>
            {/* {console.log(domainOfTaste)} */}
            {isCurrentUser && 
            <TouchableOpacity
                          style={{
                              paddingVertical: normalize(4), 
                              paddingHorizontal: normalize(5), 
                              justifyContent: "center", 
                              alignItems: "center", 
                              borderRadius: normalize(10), 
                              borderWidth: normalize(6),
                              borderColor: getMoodTextColor(
                                DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                              ), 
                              backgroundColor: getMoodContainerColor(
                                DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                              ),
                              marginBottom: normalize(20)
                            }}
                            onPress={() => profileNavigation.navigate("AddPlaylistScreen", {domainId: domainOfTaste.domainId})}
                            // onPress={toggleAddPlaylistModal}
                            >
                          <Text
                            style={{
                                color: getMoodTextColor(
                                  DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                                ), 
                                fontSize: normalize(20), 
                                fontWeight: "700"
                            }}
                            >Add Playlist</Text>
                        </TouchableOpacity>
            }

            <FlatList
              scrollEnabled={false}
              data={playlists}
              style={{ marginBottom: normalize(70) }}
              ItemSeparatorComponent={() => (
                <View style={{ height: normalize(20) }} />
              )}
              renderItem={({ item: playlist, index }) => (
                // <View>
                //   <Text>{playlist.playlistId}</Text>
                  <PlaylistCard
                    playlistId={playlist.playlistId !== undefined ? playlist.playlistId : "DEFAULT_PLAYLIST_ID"}
                    domainOfTaste={domainOfTaste}
                    profileNavigation={isCurrentUser ? profileNavigation : undefined}
                    user={user}
                    posts={clusteredPlaylistsPosts?.get(playlist.playlistId || 'defaultPlaylistId') || []}
                  />
              )}
              keyExtractor={(playlist, index) => index.toString()}
            />
          </View>
        </ScrollView>
        {/* </View> */}
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

  backButtonImage: {
    width: normalize(14),
    height: normalize(23),
  },
});
