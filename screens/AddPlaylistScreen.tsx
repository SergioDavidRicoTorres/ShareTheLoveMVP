import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AddPlaylistScreenRouteProp,
  Mood,
  Playlist,
  ProfileNavigationProp,
} from "../types";
import { useEffect, useState } from "react";
import { getAllMoodsAndTagsArray } from "../utilsData";
import { addPlaylistToDB, pickImage, uploadImage } from "../utilsFirebase";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { getCarouselNumColumns, normalize } from "../utils";
import AddMood from "../components/AddPostComponents/AddMood";
import AddPlaylist from "../components/AddPostComponents/AddPlaylist";
// import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window"); // screen width constant

export default function AddPlaylistScreen() {
  const route = useRoute<AddPlaylistScreenRouteProp>();
  const navigation = useNavigation<ProfileNavigationProp>();
  const { domainId } = route.params;
  // console.log("-----------", domainId)

  // const postType = DOMAINPOSTTYPE.get(domainId);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const handleTitleChange = (value: string) => {
    setPlaylistTitle(value);
  };
  const [hasCover, setHasCover] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");

  // search states (input, results)
  const allMoods = getAllMoodsAndTagsArray();
  const [allMoodsObject, setAllMoodsObject] = useState({
    AllMoods: [
      {
        categoryId: 0,
        name: "AllMoods",
        moodsTagsList: allMoods,
      },
    ],
  });

  const resetMoodsSelection = () => {
    setAllMoodsObject((prevState) => {
      const updatedMoods = prevState.AllMoods[0].moodsTagsList.map((mood) => ({
        ...mood,
        isSelected: false,
      }));

      return {
        ...prevState,
        AllMoods: [{ ...prevState.AllMoods[0], moodsTagsList: updatedMoods }],
      };
    });
  };
  // Optional Modal Visible State
  const [isAddPlaylistModalVisible, setIsAddPlaylistModalVisible] =
    useState(false);
  // Optional Modal Show Function
  const toggleAddPlaylistModal = () => {
    setIsAddPlaylistModalVisible(!isAddPlaylistModalVisible);
  };

  // Call resetMoodsSelection to set all moods isSelected to false
  useEffect(() => {
    resetMoodsSelection();
  }, []);

  //   const getInitiallySelectedMoods = () => {
  //     const initiallySelectedMoods = [];
  //     for (const mood of allMoodsObject.AllMoods[0].moodsTagsList) {
  //       if (mood.isSelected) {
  //         initiallySelectedMoods.push(mood);
  //       }
  //     }
  //     return initiallySelectedMoods;
  //   };
  const [selectedMoodsTags, setSelectedMoodsTags] = useState<Mood[]>(
    []
    // getInitiallySelectedMoods()
  );

  const [isAddMoodModalVisible, setIsAddMoodModalVisible] = useState(false);
  // Optional Modal show Function
  const toggleAddMoodModal = () => {
    setIsAddMoodModalVisible(!isAddMoodModalVisible);
  };
  const handleElementSelection = (itemId: number) => {
    // Copy and modify the moodsTagsList
    const modifiedData = allMoodsObject.AllMoods[0].moodsTagsList.map(
      (mood, index) => {
        if (index === itemId) {
          return { ...mood, isSelected: !mood.isSelected };
        }
        return mood;
      }
    );

    // Update the allMoodsObject state
    setAllMoodsObject((prevState) => ({
      ...prevState,
      AllMoods: [{ ...prevState.AllMoods[0], moodsTagsList: modifiedData }],
    }));

    // Update the selectedMoodsTags array based on the isSelected attribute
    const updatedselectedMoodsTags = modifiedData.filter(
      (mood) => mood.isSelected
    );

    // Update the selectedMoodsTags state
    setSelectedMoodsTags(updatedselectedMoodsTags);
  };
  // console.log("PostType: ", postType)
  // console.log("[selectedMoodsTags]: ", selectedMoodsTags)
  // console.log("[selectedMoodsTags.length]: ", selectedMoodsTags.length)
  const handleSavePlaylist = async () => {
    try {
      const uploadedImageUrl = await uploadImage(selectedImageUri);
      console.log("handleSavePlaylist() has been called!");
      const currentUserId = FIREBASE_AUTH.currentUser?.uid;
      console.log("domainId: ", domainId);
      console.log("uploadedImageUrl", uploadedImageUrl);
      console.log("currentUserId", currentUserId);
      if (
        domainId !== null &&
        domainId !== undefined &&
        uploadedImageUrl &&
        currentUserId
      ) {
        const newPlaylist: Playlist = {
          userId: currentUserId,
          domainId: domainId,
          name: playlistTitle,
          image: uploadedImageUrl,
          moods: selectedMoodsTags,
          score: 0,
          reviewsList: [],
          reviewsCount: 0,
        };

        await addPlaylistToDB(newPlaylist);
        console.log("[STEP 4 WORKED]");
      }
    } catch (error) {
      console.error("Error adding the playlist to the database: ", error);
    }
  };

  const handleCreatePlaylistButton = async () => {
    try {
      const playlistId = await handleSavePlaylist();
      console.log("[STEP 1 WORKED]");
    } catch (error) {
      console.error("Error Creating Playlist: ", error);
    }
  };
  return (
    <LinearGradient
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={{
        ...styles.container,
        // paddingTop: Platform.OS === "android" ? normalize(50) : 0,
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
        <AddPlaylist
          visible={true}
          onClose={navigation.goBack}
          onCloseAll={navigation.goBack}
          hasNewPost={false}
          domainId={domainId}
        />

        {/* <View style={{padding: normalize(5), height: normalize(766),backgroundColor: "rgba(156, 75, 255, 1)", borderRadius: normalize(10)}}>

          <LinearGradient
            colors={["rgba(156, 75, 255, 1)", "rgba(58, 17, 90, 1)"]}
            style={styles.backgroundGradient}
            >
            <View style={styles.modalContent}>
              {!hasCover && (
                <View
                  style={{
                    width,
                    height: normalize(272),
                    flexDirection: "row",
                    backgroundColor: "rgba(156, 75, 255, 1)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: normalize(10),
                      left: normalize(24),
                    }}
                    onPress={navigation.goBack}
                  >
                    <Image
                      source={require("../assets/icons/ArrowBack.png")}
                      style={{
                        width: normalize(14),
                        height: normalize(23),
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ left: normalize(12) }}
                    onPress={() => {
                      pickImage(setSelectedImageUri).then(() => {
                        setHasCover(true);
                      });
                    }}
                  >
                    <Image
                      source={require("../assets/icons/AddImageIconPurple.png")}
                      style={{
                        width: normalize(76),
                        height: normalize(76),
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {hasCover && (
                <ImageBackground
                  source={{
                    uri: selectedImageUri,
                  }}
                  style={{
                    width,
                    height: normalize(272),
                    flexDirection: "row",
                  }}
                  resizeMode="cover"
                  imageStyle={{ opacity: 1, borderRadius: normalize(10) }}
                  // blurRadius={8}
                >
                  <TouchableOpacity
                    style={{
                      marginTop: normalize(10),
                      marginLeft: normalize(24),
                    }}
                    onPress={navigation.goBack}
                  >
                    <Image
                      source={require("../assets/icons/ArrowBack.png")}
                      style={{
                        width: normalize(14),
                        height: normalize(23),
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: normalize(8),
                      marginLeft: normalize(315),
                    }}
                    onPress={navigation.goBack}
                  >
                    <Image
                      source={require("../assets/icons/MusicPlaylistCoverOptionsButton.png")}
                      style={{
                        width: normalize(7),
                        height: normalize(28),
                      }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              )}
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: normalize(18),
                }}
              >
                <TextInput
                  value={playlistTitle}
                  returnKeyType="done"
                  onChangeText={handleTitleChange}
                  style={{
                    color: "white",
                    fontSize: normalize(22),
                    marginHorizontal: normalize(8),
                  }}
                  placeholder="Write Your Playlist Title..."
                  textAlignVertical="top"
                  textAlign="center"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                />
                <View
                  style={{
                    marginTop: normalize(5),
                    width: normalize(300),
                    height: normalize(3),
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    borderRadius: normalize(10),
                    shadowColor: "#6933AC",
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: normalize(5),
                  }}
                />
              </View>
              <View
                style={{
                  width: normalize(363),
                  height: normalize(290),
                  backgroundColor: "rgba(203, 203, 203, 0.5)",
                  borderRadius: normalize(10),
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: normalize(22), // should be less
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: normalize(24),
                    color: "white",
                    left: "-5%",
                    marginTop: normalize(10),
                  }}
                >
                  How does it make you feel:
                </Text>
                <FlatList
                  data={allMoodsObject.AllMoods}
                  horizontal
                  renderItem={({ item: category, index: categoryIndex }) => (
                    <View 
                    // style={styles.horizontalContainer} // HERE THERE MIGHT BE AN ERROR
                    >
                      <FlatList
                        scrollEnabled={false}
                        columnWrapperStyle={
                          getCarouselNumColumns(allMoods.length) > 1
                            ? { flexWrap: "wrap" }
                            : undefined
                        }
                        numColumns={Math.ceil(
                          getCarouselNumColumns(allMoods.length)
                        )}
                        data={category.moodsTagsList}
                        style={{ paddingTop: normalize(10) }}
                        renderItem={({ item, index: itemIndex }) => {
                          // 

                          return (
                            <TouchableOpacity
                              style={item.isSelected
                                ? {
                                    paddingVertical: normalize(2),
                                    paddingHorizontal: normalize(20),
                                    backgroundColor:"rgba(72, 43, 255, 0.75)",
                                      // getMoodContainerColor(postType),
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: normalize(10),
                                    marginVertical: normalize(8),
                                    marginHorizontal: normalize(10),
                                  }
                                : {
                                    paddingVertical: normalize(2),
                                    paddingHorizontal: normalize(20),
                                    backgroundColor: "rgba(58, 17, 90, 0.4)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: normalize(10),
                                    marginVertical: normalize(8),
                                    marginHorizontal: normalize(10),
                                  }}
                              onPress={() =>
                                handleElementSelection(itemIndex)
                              }
                            >
                              <Text
                                style={{
                                  fontWeight: "600",
                                  fontSize: normalize(18),
                                  color: "rgba(201, 157, 255, 1)"
                                  // color: getMoodTextColor(postType),
                                }}
                              >
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    </View>
                  )}
                  keyExtractor={(category, index) => index.toString()}
                />
                <TouchableOpacity
                  onPress={() => {
                    toggleAddMoodModal();
                  }}
                  style={{
                    top: normalize(16),
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: normalize(20),
                    paddingVertical: normalize(5),
                    backgroundColor: "rgba(255, 184, 0, 1)",
                    borderRadius: normalize(10),
                    shadowColor: "#6933AC",
                    shadowOffset: {
                      width: 0,
                      height: normalize(4),
                    },
                    shadowOpacity: 1,
                    shadowRadius: normalize(5),
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: normalize(18),
                      color: "white",
                    }}
                  >
                    Add your own mood
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {isAddMoodModalVisible && (
              <AddMood
                visible={isAddMoodModalVisible}
                onClose={toggleAddMoodModal}
              />
            )}
          </LinearGradient>
          </View>
          {selectedMoodsTags.length !== 0 && playlistTitle != "" ? (
            <TouchableOpacity
              style={{
                ...styles.touchableChooseButtonContainer,
                // backgroundColor: getButtonsAccentColor(postType),
                // shadowColor: getButtonsAccentColor(postType),
                backgroundColor: "rgba(72, 43, 255, 1)", 
                shadowColor: "rgba(72, 43, 255, 1)"
              }}
              onPress={() => {
                handleCreatePlaylistButton();
                navigation.goBack();
              }}
            >
              <Text style={styles.chooseButtonText}>Create Playlist</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.chooseButtonContainer}>
              <Text style={styles.chooseButtonText}>Create Playlist</Text>
            </View>
          )}
               */}
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundGradient: {
    borderRadius: normalize(10),
    marginBottom: -normalize(22),
    width: normalize(360),
    height: normalize(756),
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
  },
  chooseButtonContainer: {
    position: "absolute",
    paddingHorizontal: normalize(20),
    height: normalize(40),
    borderRadius: normalize(15),
    bottom: normalize(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(152, 152, 152, 1)",
    marginBottom: normalize(60),
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
    marginBottom: normalize(60),
  },
  chooseButtonText: {
    fontWeight: "700",
    fontSize: normalize(18),
    lineHeight: normalize(21),
    color: "white",
  },
});
