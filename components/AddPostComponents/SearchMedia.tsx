import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Spotify Authorization data
import axios from "axios";
// import { getUserData, refreshTokens } from "../AuthorizationSpotify";
// TMDB credentials
import { TMDBCredentials } from "../../secrets";
// Next Modal Component
import MoodsTags from "./MoodsTags";
import {
  getButtonsAccentColor,
  getGradientsFirstColor,
  getSearchBarColor,
  getItemSubTitle,
  getItemImage,
  getItemTitle,
  normalize,
  getMoodTextColor,
  getMoodContainerColor,
} from "../../utils";
import { searchSong, searchPodcastEpisode } from "../../utilsData";
import { SearchMediaProps } from "../../types";
import { checkTokenValidity } from "../../AuthorizationSpotify";
import { sharedStyles } from "../../sharedStyles";
import { MEDIATYPENAME } from "../../constants";

const { width } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

function SearchMedia({
  visible,
  onClose,
  postType,
  domainId,
}: SearchMediaProps) {
  // Media Search Input (string):
  useEffect(() => {
    if (visible) {
      checkTokenValidity();
    }
  }, [visible]);
  const [searchInput, setSearchInput] = useState("");
  // Media Search Results (array):
  const [searchResults, setSearchResults] = useState([]);
  // Selected Media Item (object):
  const [selectedItem, setSelectedItem] = useState(null);
  // First Search (boolean):
  // const [isFirstSearch, setIsFirstSearch] = useState(true);

  // // SEARCH PodcastEpisode FUNCTION::::::::::::::::::::::
  // const searchPodcastEpisode = async (searchTerm: string) => {
  //   try {
  //     if (isFirstSearch) {
  //       // Refresh tokens only on the first search
  //       await refreshToken();
  //       setIsFirstSearch(false); // Set to false after the first search
  //     }

  //     const accessToken = await getUserData("accessToken");
  //     const expirationTime = await getUserData("expirationTime");
  //     let tokenExpirationTime = null;
  //     if (expirationTime !== null) {
  //       tokenExpirationTime = JSON.parse(expirationTime);
  //     }
  //     // const tokenExpirationTime = JSON.parse(
  //     //   await getUserData("expirationTime")
  //     // );

  //     if (
  //       !accessToken ||
  //       !tokenExpirationTime ||
  //       new Date().getTime() >= tokenExpirationTime
  //     ) {
  //       await refreshToken();
  //     }

  //     const response = await fetch(
  //       `https://api.spotify.com/v1/search?q=${searchTerm}&type=episode&limit=50`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Conten-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     console.log("Response.status: ", response.status);

  //     if (response.status === 403) {
  //       console.log(
  //         "403 Forbidden: You don't have permission to access this resource."
  //       );
  //     } else if (!response.ok) {
  //       console.error(`HTTP Error: ${response.status} ${response.statusText}`);
  //     }
  //     const data = await response.json();
  //     // console.log("Response data: ", data); // Log the actual response data
  //     // console.log("Fetch result: ", data.episodes.items);
  //     return data.episodes.items;
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // };

  // SEARCH SONG FUNCTION:::::::::::::::::::::::::::::
  // const searchSong = async (searchTerm: string) => {
  //   try {
  //     if (isFirstSearch) {
  //       // Refresh tokens only on the first search
  //       await refreshToken();
  //       setIsFirstSearch(false); // Set to false after the first search
  //     }
  //     const accessToken = await getUserData("accessToken");
  //     // check if token is valid
  //     const expirationTime = await getUserData("expirationTime");
  //     let tokenExpirationTime = null;
  //     if (expirationTime !== null) {
  //       tokenExpirationTime = JSON.parse(expirationTime);
  //     }
  //     // const tokenExpirationTime = JSON.parse(
  //     //   await getUserData("expirationTime")
  //     // );
  //     if (
  //       !accessToken ||
  //       !tokenExpirationTime ||
  //       new Date().getTime() >= tokenExpirationTime
  //     ) {
  //       // token is not valid, so it will be refreshed
  //       await refreshToken();
  //     }

  //     // fetch list of results from the search
  //     const response = await fetch(
  //       `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=50`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Conten-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log("Response.status: ", response.status); //status of the fetch statement
  //     const data = await response.json(); // parse response into json format
  //     return data.tracks.items;
  //   } catch (error) {
  //     // console.log("THERE WAS AN ERROR");
  //     console.error(error);
  //     return [];
  //   }
  // };

  // SEARCH FILM AND TVSHOW FUNCTION::::::::::::::::::::
  const searchFilmAndTVShow = async (query: string) => {
    try {
      const API_KEY = TMDBCredentials.api_key;

      // Make the request to the TMDB API
      const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false`;
      const response = await axios.get(url);
      const { data } = response;

      // Filter the results to include only movies and TV shows, excluding persons
      const filteredResults = data.results.filter(
        (result: any) =>
          result.media_type === "movie" || result.media_type === "tv"
      );

      // Process the filtered results as needed
      // console.log(filteredResults);
      return filteredResults;
    } catch (error) {
      console.error(error);
    }
  };

  // Next Modal boolean state:
  const [isMoodsTagsModalVisible, setIsMoodsTagsModalVisible] = useState(false);
  // Next Modal show function
  const toggleMoodsTagsModal = () => {
    setIsMoodsTagsModalVisible(!isMoodsTagsModalVisible);
  };

  // HANDLE EVENT FUNCTIONS:
  // store search input:
  const handleInputChange = (text: string) => {
    setSearchInput(text);
  };

  // stores the results for the given search input
  const handleEnterPress = async () => {
    try {
      if (postType === "PodcastEpisode") {
        const results = await searchPodcastEpisode(searchInput);
        setSearchResults(results);
        // setSelectedItemIndex(null);
        setSelectedItem(null);
      }
      if (postType === "Song") {
        const results = await searchSong(searchInput);
        setSearchResults(results);
        // setSelectedItemIndex(null);
        setSelectedItem(null);
      }
      if (postType === "Film/TVShow") {
        const results = await searchFilmAndTVShow(searchInput);
        setSearchResults(results);
        // setSelectedItemIndex(null);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //---------------------------------------------------------------------------------
  // -------------------------------- RENDERING --------------------------------------
  //---------------------------------------------------------------------------------

  return (
    <View style={{ flex: 1 }}>
      {/* Modal(SearchMedia) */}
      <Modal visible={visible} animationType="slide" transparent>
        {/* Modal Container */}
        <View style={{ ...styles.modalContainer }}>
          {/* Modal Background Gradient */}
          <LinearGradient
            colors={[getGradientsFirstColor(postType), "rgba(58, 17, 90, 1)"]}
            style={{
              ...styles.backgroundGradient,
              height: Platform.OS === "android" ? width * 1.75 : normalize(756),
              borderColor: getButtonsAccentColor(postType),
              borderWidth: normalize(3),
            }}
          >
            {/* Modal Content */}
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View
                // modalHeaderContainer
                style={styles.modalHeaderContainer}
              >
                {/* Back Button */}
                <TouchableOpacity
                  // backButtonContainer
                  onPress={onClose}
                  style={{
                    left: normalize(8),
                  }}
                >
                  {/* Back Button Image */}
                  <Image
                    source={require("../../assets/icons/ArrowBack.png")}
                    style={{
                      width: normalize(20),
                      height: normalize(33),
                    }}
                  />
                </TouchableOpacity>
                {/* Progress Tracker */}
                <View
                  // progressTrackerContainer
                  style={styles.progressTrackerContainer}
                >
                  <View
                    // achievedProgressState(1.)
                    style={{
                      ...styles.achievedProgressState,
                      backgroundColor: getMoodContainerColor(postType),
                    }}
                  />
                  <View
                    // followingProgressState(2.)
                    style={styles.followingProgressState}
                  />
                  <View
                    // followingProgressState(3.)
                    style={styles.followingProgressState}
                  />
                  <View
                    // followingProgressState(4.)
                    style={styles.followingProgressState}
                  />
                </View>
                {/* Cancel Button */}
                <TouchableOpacity
                  // cancelButtonContainer
                  onPress={onClose}
                >
                  <Text
                    // cancelText
                    style={styles.cancelText}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Search Container */}
              <View
                // searchContainer
                style={{
                  ...styles.searchContainer,
                  backgroundColor: getSearchBarColor(postType),
                  borderColor: getMoodContainerColor(postType),
                  borderWidth: normalize(3),
                }}
              >
                <Image
                  // searchIcon
                  style={{
                    width: normalize(20),
                    height: normalize(20),
                    top: normalize(5),
                    marginRight: normalize(5),
                  }}
                  source={require("../../assets/icons/SearchIcon.png")}
                />
                <TextInput
                  // searchInput
                  value={searchInput}
                  onChangeText={handleInputChange}
                  onSubmitEditing={handleEnterPress}
                  returnKeyType="done"
                  style={styles.searchInput}
                  placeholder={`Search ${MEDIATYPENAME.get(domainId)}...`}
                />
              </View>
              {/* Search Result List */}
              <FlatList
                // searchResultListContainer
                style={styles.searchResultListContainer}
                data={searchResults}
                ItemSeparatorComponent={() => (
                  <View style={styles.searchResultListItemSeparator} />
                )}
                renderItem={({ item }) => {
                  // boolean attribute for selection of each Item
                  const isSelected = item === selectedItem;
                  return (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        if (selectedItem === item) {
                          // setSelectedItemIndex(null);
                          setSelectedItem(null);
                        } else {
                          //   setSelectedItemIndex(item.id);
                          setSelectedItem(item);
                        }
                      }}
                      style={styles.searchResultItemContainer}
                    >
                      {/* Search Result Item */}
                      <View
                        // searchResultItemContainer
                        style={[
                          !isSelected
                            ? styles.searchResultItemContainer
                            : {
                                ...sharedStyles.selectedMediaItemContainer,
                                backgroundColor:
                                  getMoodContainerColor(postType),
                                borderColor: getMoodContainerColor(postType),
                                borderWidth: normalize(3),
                                alignItems: "center",
                              }, // Change style if selected
                        ]}
                      >
                        {getItemImage(item, domainId) && (
                          <Image
                            // searchResultItemImage
                            source={getItemImage(item, domainId)}
                            style={{
                              width: normalize(55),
                              height: normalize(55),
                              borderTopLeftRadius: normalize(5),
                              borderBottomLeftRadius: normalize(5),
                            }}
                          />
                        )}
                        <View
                          // searchResultItemTextContainer
                          style={styles.searchResultItemTextContainer}
                        >
                          <Text
                            // searchResultItemText
                            numberOfLines={domainId == 2 ? 2 : 1}
                            style={styles.searchResultItemText}
                          >
                            {getItemTitle(item, domainId)}
                          </Text>
                          {domainId != 2 && getItemSubTitle(item, domainId)}
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                }}
                keyExtractor={(media, index) => index.toString()}
              />
            </View>
            {/* Next Modal (Moods/Tags) */}
            {isMoodsTagsModalVisible && (
              <MoodsTags
                visible={isMoodsTagsModalVisible}
                // onClose={toggleMoodsTagsModal}
                onCloseAll={() => {
                  setIsMoodsTagsModalVisible(!isMoodsTagsModalVisible);
                  onClose();
                }}
                onClose={toggleMoodsTagsModal}
                postSelectedMedia={selectedItem}
                postType={postType}
                domainId={domainId}
              />
            )}
          </LinearGradient>
          {selectedItem === null ? (
            <View style={sharedStyles.chooseButtonContainer}>
              <Text style={sharedStyles.chooseButtonText}>
                Choose
                {" " + MEDIATYPENAME.get(domainId)}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                ...sharedStyles.touchableChooseButtonContainer,
                backgroundColor: getGradientsFirstColor(postType),
                borderColor: getButtonsAccentColor(postType),
                borderWidth: normalize(4),
                shadowColor: getButtonsAccentColor(postType),
              }}
              onPress={() => {
                toggleMoodsTagsModal();
                onClose;
              }}
            >
              <Text style={sharedStyles.chooseButtonText}>
                Choose
                {" " + postType}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundGradient: {
    borderRadius: normalize(10),
    marginBottom: -normalize(22),
    width: normalize(360),
    // height: width * 1.8,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeaderContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: normalize(20),
    marginTop: normalize(10),
  },
  progressTrackerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: normalize(6),
  },
  achievedProgressState: {
    width: normalize(50),
    height: normalize(7),
    // backgroundColor: "rgba(105, 51, 172, 0.79)",
    borderRadius: normalize(30),
  },
  followingProgressState: {
    width: normalize(50),
    height: normalize(7),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: normalize(30),
  },
  cancelText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: normalize(22),
    lineHeight: normalize(26),
    color: "rgba(255, 255, 255, 0.75)",
  },
  // chooseButtonContainer: {
  //   position: "absolute",
  //   paddingHorizontal: normalize(24),
  //   paddingVertical: normalize(9),
  //   // height: normalize(40),
  //   borderRadius: normalize(15),
  //   bottom: normalize(50),
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "background: rgba(152, 152, 152, 1)",
  //   // marginBottom: normalize(10),
  // },
  // touchableChooseButtonContainer: {
  //   position: "absolute",
  //   paddingHorizontal: normalize(20),
  //   paddingVertical: normalize(5),
  //   // height: normalize(40),
  //   borderRadius: normalize(15),
  //   bottom: normalize(50),
  //   justifyContent: "center",
  //   alignItems: "center",
  //   shadowOffset: {
  //     width: 0,
  //     height: 0,
  //   },
  //   shadowOpacity: 0.5,
  //   shadowRadius: normalize(10),
  //   // marginBottom: normalize(10),
  // },
  // chooseButtonText: {
  //   fontWeight: "700",
  //   fontSize: normalize(22),
  //   // lineHeight: normalize(21),
  //   color: "white",
  // },
  searchContainer: {
    flexDirection: "row",
    width: normalize(337),
    height: normalize(31),
    borderRadius: normalize(20),
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
  },
  searchInput: {
    color: "white",
    marginRight: normalize(25),
    width: normalize(273),
    fontSize: normalize(17),
  },
  searchResultListContainer: {
    marginTop: normalize(12),
    width: normalize(337),
  },
  searchResultListItemSeparator: {
    height: normalize(12),
  },
  searchResultItem: {
    width: normalize(339),
    height: normalize(50),
    borderRadius: normalize(6),
    flexDirection: "row",
  },
  searchResultItemContainer: {
    width: normalize(339),
    // height: normalize(50),
    alignItems: "center",
    borderRadius: normalize(6),
    flexDirection: "row",
    backgroundColor: "rgba(203, 203, 203, 0.5)",
  },
  // selectedMediaItemContainer: {
  //   width: normalize(339),
  //   paddingVertical: 0,
  //   borderRadius: normalize(6),
  //   flexDirection: "row",
  // },
  searchResultItemImage: {
    width: normalize(50),
    // height: normalize(50),
    borderTopLeftRadius: normalize(5),
    borderBottomLeftRadius: normalize(5),
  },
  searchResultItemTextContainer: {
    width: normalize(265),
    paddingVertical: normalize(4),
    marginLeft: normalize(15),
  },
  searchResultItemText: {
    width: normalize(265),
    fontWeight: "700",
    fontSize: normalize(20),
    lineHeight: normalize(23),
    color: "white",
  },
  itemSubtitle: {
    fontWeight: "300",
    fontSize: normalize(12),
    lineHeight: normalize(12),
    color: "white",
  },
});

export default SearchMedia;
