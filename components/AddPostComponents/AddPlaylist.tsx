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
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import allMoods from "../../DummyData/AllMoods.json";
import MOODSANDTAGS from "../../Database/moodsAndTags.json";
import AddMood from "./AddMood";
import {
  getGradientsFirstColor,
  getButtonsAccentColor,
  getMoodContainerColor,
  getMoodTextColor,
  normalize,
  getCarouselNumColumns,
} from "../../utils";
import {
  AddPlaylistProps,
  Mood,
  MoodsAndTagsCatalogue,
  Playlist,
  Post,
} from "../../types";
import { getAllMoodsAndTagsArray } from "../../utilsData";
import { DOMAINPOSTTYPE } from "../../constants";
import {
  addPlaylistToDB,
  addPostToDB,
  pickImage,
  uploadImage,
} from "../../utilsFirebase";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const { width } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

// const getCarouselNumColumns = (listLength: number) => listLength / 5;
function AddPlaylist({
  visible,
  onClose,
  onCloseAll,
  postSelectedMedia,
  postSelectedMoodsTags,
  postInsertedCaption,
  domainId,
  hasNewPost,
}: AddPlaylistProps) {
  // const postType = DOMAINPOSTTYPE.get(domainId);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const handleTitleChange = (value: string) => {
    setPlaylistTitle(value);
  };
  const [hasCover, setHasCover] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");
  // console.log("[postSelectedMoodsTags]: ", postSelectedMoodsTags)

  // const allMoodsObject: MoodsAndTagsCatalogue = {"AllMoods": [{
  //   "categoryId": 0,
  //   "name": "AllMoods",
  //   "moodsTagsList": allMoods
  // }]}

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

  // Call resetMoodsSelection to set all moods isSelected to false
  useEffect(() => {
    resetMoodsSelection();
  }, []);

  const getInitiallySelectedMoods = () => {
    const initiallySelectedMoods = [];
    for (const mood of allMoodsObject.AllMoods[0].moodsTagsList) {
      if (mood.isSelected) {
        initiallySelectedMoods.push(mood);
      }
    }
    return initiallySelectedMoods;
  };
  const [selectedMoodsTags, setselectedMoodsTags] = useState(
    getInitiallySelectedMoods()
  );

  const [isAddMoodModalVisible, setIsAddMoodModalVisible] = useState(false);
  // Optional Modal show Function
  const toggleAddMoodModal = () => {
    setIsAddMoodModalVisible(!isAddMoodModalVisible);
  };
  //---------------------------------------------------------------------------------
  // ----------------------- OPTIONAL MODAL (AddMood) ----------------------------
  //---------------------------------------------------------------------------------

  // const handleElementSelection = (itemId: number) => {
  //   const modifiedData = [...allMoodsObject.AllMoods[0].moodsTagsList];

  //   // Toggle the isSelected attribute of the selected element
  //   modifiedData[itemId].isSelected =
  //   !modifiedData[itemId].isSelected;

  //   // Update the selectedMoodsTags array based on the isSelected attribute
  //   // const updatedselectedMoodsTags = allMoodsObject.AllMoods[0].moodsTagsList.filter((item) => item.isSelected);
  //   const updatedselectedMoodsTags = [...selectedMoodsTags, modifiedData[itemId]];

  //   // console.log("[updatedselectedMoodsTags]", updatedselectedMoodsTags);

  //   // const updatedselectedMoodsTags = modifiedData.reduce((acc, category) => {
  //     //   const selectedItems = category.list.filter((item) => item.isSelected);
  //     //   return [...acc, ...selectedItems];
  //     // }, []);

  //     setselectedMoodsTags(updatedselectedMoodsTags);
  //   };
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
    setselectedMoodsTags(updatedselectedMoodsTags);
  };

  const handleSavePost = async (newPlaylistId: string) => {
    const currentUserId = FIREBASE_AUTH.currentUser?.uid;
    if (
      currentUserId === undefined ||
      domainId === undefined ||
      newPlaylistId === undefined ||
      postSelectedMoodsTags === undefined ||
      postInsertedCaption === undefined
    ) {
      // Handle the case where signedUpUID is null
      console.error(
        'No "currentUserId" or "domaindId" or "newPlaylist?.playlistId" found'
      );
      return; // Exit the function or handle this case appropriately
    }

    const postObject: Post = {
      userId: currentUserId,
      domainId: domainId,
      playlistId: newPlaylistId,
      moods: postSelectedMoodsTags,
      caption: postInsertedCaption,
      likesCount: 0,
      creationTime: Date.now(),
      mediaItem: postSelectedMedia,
      likesUserIdsList: [],
    };

    await addPostToDB(postObject);
    console.log("[USER]: ", postObject);
    onCloseAll();
  };

  const handleSavePlaylist = async () => {
    try {
      const uploadedImageUrl = await uploadImage(selectedImageUri);
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
          reviewsCount: 0,
          reviewsList: [],
        };
        const newPlaylistId = await addPlaylistToDB(newPlaylist);
        return newPlaylistId;
      }
    } catch (error) {
      console.error("Error adding the playlist to the database: ", error);
      return "[ERROR]: Playlist wasn't handled properly";
    }
  };

  const handleCreatePlaylistButton = async () => {
    try {
      if (hasNewPost) {
        const playlistId = await handleSavePlaylist();
        if (playlistId !== undefined) {
          handleSavePost(playlistId);
        }
      } else {
        const playlistId = await handleSavePlaylist();
        console.log("[STEP 1 WORKED]");
        // console.log(playlistId);
      }
    } catch (error) {
      console.error("Error Creating Playlist: ", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Modal(MoodsTags) */}
      <Modal visible={visible} animationType="slide" transparent>
        {/* Modal Container */}
        <View style={styles.modalContainer}>
          {/* Modal Gradient */}

          <View
            style={{
              padding: normalize(5),
              height: normalize(766),
              backgroundColor: "rgba(156, 75, 255, 1)",
              borderRadius: normalize(10),
            }}
          >
            <LinearGradient
              colors={["rgba(156, 75, 255, 1)", "rgba(58, 17, 90, 1)"]}
              style={styles.backgroundGradient}
            >
              {/* Modal Content */}
              <View style={styles.modalContent}>
                {/* <TouchableOpacity> */}
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
                    {/* Back Button */}
                    <TouchableOpacity
                      // backButtonContainer
                      onPress={onClose}
                      style={{
                        position: "absolute",
                        top: normalize(10),
                        left: normalize(24),
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
                    <TouchableOpacity
                      style={{ left: normalize(12) }}
                      onPress={() => {
                        pickImage(setSelectedImageUri).then(() => {
                          setHasCover(true);
                        });
                      }}
                    >
                      <Image
                        source={require("../../assets/icons/AddImageIconPurple.png")}
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
                      onPress={onClose}
                    >
                      <Image
                        source={require("../../assets/icons/ArrowBack.png")}
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
                      onPress={onClose}
                    >
                      <Image
                        source={require("../../assets/icons/MusicPlaylistCoverOptionsButton.png")}
                        style={{
                          width: normalize(7),
                          height: normalize(28),
                        }}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                )}
                {/* </TouchableOpacity> */}
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
                                style={
                                  item.isSelected
                                    ? {
                                        paddingVertical: normalize(2),
                                        paddingHorizontal: normalize(20),
                                        backgroundColor:
                                          "rgba(72, 43, 255, 0.75)",
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
                                        backgroundColor:
                                          "rgba(58, 17, 90, 0.4)",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: normalize(10),
                                        marginVertical: normalize(8),
                                        marginHorizontal: normalize(10),
                                      }
                                }
                                onPress={() =>
                                  handleElementSelection(itemIndex)
                                }
                              >
                                <Text
                                  style={{
                                    fontWeight: "600",
                                    fontSize: normalize(18),
                                    color: "rgba(201, 157, 255, 1)",
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
                      onClose;
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
                shadowColor: "rgba(72, 43, 255, 1)",
              }}
              onPress={() => {
                handleCreatePlaylistButton();
                onCloseAll();
              }}
            >
              <Text style={styles.chooseButtonText}>Create Playlist</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.chooseButtonContainer}>
              <Text style={styles.chooseButtonText}>Create Playlist</Text>
            </View>
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
    height: normalize(756),
    // borderColor: "rgba(72, 43, 255, 1)",
    // borderWidth: normalize(5),
    // padding: normalize(5),
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
  },
  backButtonImage: {
    width: normalize(14),
    height: normalize(23),
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
    marginBottom: normalize(30),
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
    marginBottom: normalize(30),
  },
  chooseButtonText: {
    fontWeight: "700",
    fontSize: normalize(18),
    lineHeight: normalize(21),
    color: "white",
  },
});

export default AddPlaylist;
