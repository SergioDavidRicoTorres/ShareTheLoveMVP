import React, { useState, useEffect } from "react";
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
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AddPlaylist from "./AddPlaylist";
import {
  getMoodContainerColor,
  getButtonsAccentColor,
  getGradientsFirstColor,
  getMoodTextColor,
  getSearchBarColor,
  getPlaylistCardBackgroundColor,
  normalize
} from "../../utils";
import { getCurrentUserData } from "../../UserData";
import { DOMAINID } from "../../constants";
import { Playlist, Post, SearchPlaylistProps } from "../../types";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { addPostToDB, getDomainsPlaylistsData } from "../../utilsFirebase";

// screen WIDTH constant:
const { width } = Dimensions.get("window");

//---------------------------------------------------------------------------------
// ---------------------- FUNCTIONS CURRENT MODAL (SearchPlaylist)------------------
//---------------------------------------------------------------------------------
// HANDLE EVENT FUNCTIONS:
// stores the given input(queue)
// COLOR FUNCTIONS:

// const getGradientFirstColor = (postType) => {
//   try {
//     if (postType === "Song") {
//       return "rgba(0, 209, 134, 1)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(110, 212, 73, 1)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(207, 0, 211, 1)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getMoodTextColor = (postType) => {
//   try {
//     if (postType === "Song") {
//       return "rgba(153, 255, 218, 1)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(197, 238, 182, 1)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(253, 153, 255, 1)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getMoodContainerColor = (postType) => {
//   try {
//     if (postType === "Song") {
//       return "rgba(0, 255, 163, 0.4)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(110, 212, 73, 0.4)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(250, 0, 255, 0.4)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getButtonsAccentColor = (postType) => {
//   try {
//     if (postType === "Song") {
//       return "rgba(0, 255, 163, 1)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(110, 212, 73, 1)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(250, 0, 255, 1)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getPlaylistCardBackgroundColor = (postType) => {
//   try {
//     if (postType === "Song") {
//       return "rgba(0, 255, 163, 0.75)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(110, 212, 73, 0.75)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(250, 0, 255, 0.75)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getSearchBarColor = (postType) => {
//   try {
//     if (postType === "Song") {
//       return "rgba(20, 169, 115, 0.75)";
//     }
//     if (postType === "PodcastEpisode") {
//       return "rgba(105, 146, 91, 0.75)";
//     }
//     if (postType === "Film/TVShow") {
//       return "rgba(134, 0, 137, 0.75)";
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
//---------------------------------------------------------------------------------
// ---------------------- FUNCTIONS CURRENT MODAL (SearchPlaylist)------------------
//---------------------------------------------------------------------------------
function SearchPlaylist({
  visible,
  onClose,
  onCloseAll,
  postSelectedMedia,
  postType,
  postSelectedMoodsTags,
  postInsertedCaption,
  domainId
}: SearchPlaylistProps) {
  const userId = FIREBASE_AUTH.currentUser?.uid;
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          if(userId === undefined) {
            return [];
          }
          // console.log("[userId]: ", userId); 
          // console.log("[domainId]: ", domainId); 
          const data = await getDomainsPlaylistsData(userId, domainId);
          // console.log("[playlists]: ", data);
          setPlaylists(data);
        } catch (error) {
          console.error('Error fetching playlists data:', error);
          // Handle the error appropriately
        }
      };
    
      fetchData();
    }, [userId, domainId]); // Dependencies
  // const domainPlaylists = getDomainsPlaylistsData(userId, DOMAINID.get(postType));

  // Optional Modal Visible State
  const [isAddPlaylistModalVisible, setIsAddPlaylistModalVisible] =
    useState(false);
  // Optional Modal Show Function
  const toggleAddPlaylistModal = () => {
    setIsAddPlaylistModalVisible(!isAddPlaylistModalVisible);
  };
  // selected Playlist (Object):
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  // search states (input)
  const [searchInput, setSearchInput] = useState("");
  // search results
  const [searchResults, setSearchResults] = useState(playlists);
  // const handleSearch = (text: string) => {
  //   setSearchInput(text);
  
  //   const playlistTypeIndex = {
  //     Song: 0,
  //     "Film/TVShow": 1,
  //     PodcastEpisode: 2,
  //   };
  
  //   const filteredData = userPlaylists[
  //     playlistTypeIndex[postType]
  //   ].playlists.filter((item) =>
  //     item.name.toLowerCase().includes(text.toLowerCase())
  //   );
  
  //   setSearchResults(filteredData);
  // };
  const handleSearch = (text: string) => {
    setSearchInput(text);
  
    const playlistTypeIndex = {
      Song: 0,
      "Film/TVShow": 1,
      PodcastEpisode: 2,
    };
  
    const filteredData = playlists.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
  
    setSearchResults(filteredData);
  };

  const handlePress = async () => {
    const currentUserId = FIREBASE_AUTH.currentUser?.uid; 
    if (currentUserId === undefined || domainId == undefined || selectedPlaylist?.playlistId == undefined) {
      // Handle the case where signedUpUID is null
      console.error('No "currentUserId" or "domaindId" or "selectedPlaylist?.playlistId" found');
      return; // Exit the function or handle this case appropriately
    }

    const postObject: Post = {
        userId: currentUserId,
        domainId: domainId,
        playlistId: selectedPlaylist?.playlistId, 
        moods: postSelectedMoodsTags,
        caption: postInsertedCaption,
        likesCount: 0,
        creationTime: Date.now(),
        mediaItem: postSelectedMedia
    }

    await addPostToDB(postObject);
    console.log("[USER]: ", postObject);
    onCloseAll();
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Modal(MoodsTags) */}
      <Modal visible={visible} animationType="slide" transparent>
        {/* Modal Container */}
        <View style={styles.modalContainer}>
          {/* Modal Gradient */}
          <LinearGradient
            colors={[getGradientsFirstColor(postType), "rgba(58, 17, 90, 1)"]}
            style={{...styles.backgroundGradient, 
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
                >
                  {/* Back Button Image */}
                  <Image
                    source={require("../../assets/icons/ArrowBack.png")}
                    // style={styles.backButtonImage}
                    style = {{
                      width: normalize(14),
                      height: normalize(23),
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
                    style={{...styles.achievedProgressState, 
                      backgroundColor: getMoodContainerColor(postType)
                    }}
                  />
                  <View
                    // achivedProgressState(2.)
                    style={{...styles.achievedProgressState, 
                      backgroundColor: getMoodContainerColor(postType)
                    }}
                  />
                  <View
                    // followingProgressState(3.)
                    style={{...styles.achievedProgressState, 
                      backgroundColor: getMoodContainerColor(postType)
                    }}
                  />
                  <View
                    // followingProgressState(4.)
                    style={{...styles.achievedProgressState, 
                      backgroundColor: getMoodContainerColor(postType)
                    }}
                  />
                </View>
                {/* Cancel Button */}
                <TouchableOpacity
                  // cancelButtonContainer
                  onPress={onCloseAll}
                >
                  <Text
                    // cancelText
                    style={styles.cancelText}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Search */}
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
                  // style={styles.searchIcon}
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
                  onChangeText={(text) => {
                    if (searchInput !== "" && text == "") {
                      setSearchResults(playlists)}
                    setSearchInput(text);
                  }}
                  onSubmitEditing={() => handleSearch(searchInput)}
                  returnKeyType="done"
                  style={styles.searchInput}
                  placeholder="Search..."
                />
              </View>
              {/* Playlist */}
              <FlatList
                // playlistSearchResults
                style={styles.playlistSearchResults}
                data={searchResults}
                renderItem={({ item }) => {
                  const backgroundColorItem =
                    selectedPlaylist === item
                      ? getPlaylistCardBackgroundColor(postType)
                      : "rgba(58, 17, 90, 0.7)";
                  const backgroundColorMoods =
                    selectedPlaylist === item
                      ? getMoodContainerColor(postType)
                      : "rgba(58, 17, 90, 0.6)";
                  return (
                    <TouchableWithoutFeedback
                      // playlist
                      onPress={() => {
                        if (selectedPlaylist === item) {
                          // setSelectedPlaylistIndex(null);
                          setSelectedPlaylist(null);
                        } else {
                          // setSelectedPlaylistIndex(Playlist.id);
                          setSelectedPlaylist(item);
                        }
                      }}
                    >
                      <View
                        // playlistContainer
                        style={{
                          ...styles.playlistContainer,
                          backgroundColor: backgroundColorItem,
                        }}
                      >
                        <ImageBackground
                          // playlistBackgroundImage
                          source={{ uri: item.image }}
                          style={styles.playlistBackgroundImage}
                          resizeMode="cover"
                          // imageStyle={styles.playlistBackgroundImageStyle}
                          imageStyle = {{
                            opacity: 0.5,
                            borderRadius: normalize(10),
                          }}
                          blurRadius={8}
                        >
                          <Text
                            // playlistTitle
                            style={{
                              ...styles.playlistTitle,
                              color: getButtonsAccentColor(postType),
                            }}
                          >
                            {item.name}
                          </Text>
                          {/* Playlist Moods */}
                          <FlatList
                            // playlistMoodsContainer
                            columnWrapperStyle={{ flexWrap: "wrap" }}
                            numColumns={3}
                            data={item.moods}
                            // keyExtractor={(item) => item.id.toString()}
                            keyExtractor={(mood) => mood.id.toString()}
                            style={styles.playlistMoodsContainer}
                            renderItem={({ item: mood }) => (
                              <View
                                // playlistMoodItemContainer
                                // key={index.toString()}
                                style={{
                                  ...styles.playlistMoodItemContainer,
                                  backgroundColor: backgroundColorMoods,
                                }}
                              >
                                <Text
                                  // playlistMoodItemText
                                  style={{
                                    ...styles.playlistMoodItemText,
                                    color: getMoodTextColor(postType),
                                  }}
                                >
                                  {mood.name}
                                </Text>
                              </View>
                            )}
                          />
                        </ImageBackground>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                }}
                keyExtractor={(playlist, index) => index.toString()}
              />
            </View>
            {isAddPlaylistModalVisible && (
              <AddPlaylist
                visible={isAddPlaylistModalVisible}
                onCloseAll={() => {
                  setIsAddPlaylistModalVisible(false);
                  onCloseAll();
                }}
                onClose={toggleAddPlaylistModal}
                postSelectedMedia={postSelectedMedia}
                postSelectedMoodsTags={postSelectedMoodsTags}
                postInsertedCaption={postInsertedCaption}
                domainId={domainId}
                postType={postType}
                hasNewPost={true}
              />
            )}
          </LinearGradient>
          {selectedPlaylist === null ? (
            <TouchableOpacity
              style={styles.touchableAddNewPlaylistButtonContainer}
              onPress={toggleAddPlaylistModal}
            >
              <Text style={styles.chooseButtonText}>Add New Playlist</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                ...styles.touchableChooseButtonContainer,
                backgroundColor: getButtonsAccentColor(postType),
                shadowColor: getButtonsAccentColor(postType),
              }}
              onPress={() => {
                handlePress();
              }}
            >
              <Text style={styles.chooseButtonText}>Choose Playlist</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
}
//---------------------------------------------------------------------------------
// -------------------------------- RENDERING --------------------------------------
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// -------------------------------- Styles -----------------------------------------
//---------------------------------------------------------------------------------
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
    height: normalize(761),
  },
  modalContent: {
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
  // backButtonImage: {
  //   width: normalize(14),
  //   height: normalize(23),
  // },
  progressTrackerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: normalize(6),
  },
  achievedProgressState: {
    width: normalize(50),
    height: normalize(7),
    backgroundColor: "rgba(105, 51, 172, 0.79)",
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
  chooseButtonContainer: {
    position: "absolute",
    paddingHorizontal: normalize(20),
    height: normalize(40),
    borderRadius: normalize(15),
    bottom: normalize(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "background: rgba(152, 152, 152, 1)",
    marginBottom: normalize(10),
  },
  touchableChooseButtonContainer: {
    position: "absolute",
    paddingHorizontal: normalize(20),
    height: normalize(40),
    borderRadius: normalize(15),
    bottom: normalize(30),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: normalize(10),
    marginBottom: normalize(10),
  },
  chooseButtonText: {
    fontWeight: "700",
    fontSize: normalize(18),
    lineHeight: normalize(21),
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    width: normalize(337),
    height: normalize(31),
    borderRadius: normalize(20),
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
  },
  searchIcon: {
    width: normalize(20),
    height: normalize(20),
    top: normalize(5),
    marginRight: normalize(5),
  },
  searchInput: {
    color: "white",
    marginRight: normalize(25),
    width: normalize(273),
    fontSize: normalize(17),
  },
  playlistSearchResults: {
    marginTop: normalize(22),
  },
  playlistContainer: {
    width: normalize(340),
    height: normalize(136),
    borderRadius: normalize(10),
    marginBottom: normalize(12),
    overflow: "hidden",
  },
  playlistBackgroundImage: {
    width: normalize(340),
    height: normalize(136),
  },
  // playlistBackgroundImageStyle: {
  //   opacity: 0.5,
  //   borderRadius: normalize(10),
  // },
  playlistTitle: {
    fontWeight: "700",
    fontSize: normalize(20),
    marginBottom: -normalize(64),
    marginLeft: normalize(16),
    marginTop: normalize(16),
  },
  playlistMoodsContainer: {
    marginTop: normalize(65),
  },
  playlistMoodItemContainer: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    marginVertical: normalize(2),
    marginHorizontal: normalize(8),
  },
  playlistMoodItemText: {
    fontWeight: "600",
    fontSize: normalize(16),
  },
  touchableAddNewPlaylistButtonContainer: {
    position: "absolute",
    height: normalize(40),
    borderRadius: normalize(15),
    bottom: normalize(30),
    paddingHorizontal: normalize(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 184, 0, 1)",
    shadowColor: "rgba(255, 184, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: normalize(10),
    marginBottom: normalize(10),
  },
});

//---------------------------------------------------------------------------------
// -------------------------------- Styles -----------------------------------------
//---------------------------------------------------------------------------------

export default SearchPlaylist;
