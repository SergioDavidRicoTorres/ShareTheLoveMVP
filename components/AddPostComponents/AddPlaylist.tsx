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
import AddMood from "./AddMood";
import {
  getGradientsFirstColor,
  getButtonsAccentColor,
  getMoodContainerColor,
  getMoodTextColor,
  normalize
} from "../../utils";
import { AddPlaylistProps } from "../../types";

const { width } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

const handleTitleChange = (value) => {
  setPlaylistTitle(value);
};

const getCarouselNumColumns = (listLength) => listLength / 5;
function AddPlaylist({
  visible,
  onClose,
  onCloseAll,
  selectedMedia,
  postType,
}: AddPlaylistProps) {
  // search states (input, results)
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [hasCover, setHasCover] = useState(false);
  // select Item state
  // Initialize selectedMoodsTags with initially selected moods
  const getInitiallySelectedMoods = () => {
    const initiallySelectedMoods = [];
    for (const mood of allMoods[0].list) {
      if (mood.isSelected) {
        initiallySelectedMoods.push(mood);
      }
    }
    return initiallySelectedMoods;
  };
  const [selectedMoodsTags, setselectedMoodsTags] = useState(
    getInitiallySelectedMoods()
  );
  const [isAnyElementSelected, setIsAnyElementSelected] = useState(false);

  const [isAddMoodModalVisible, setIsAddMoodModalVisible] = useState(false);
  // Optional Modal show Function
  const toggleAddMoodModal = () => {
    setIsAddMoodModalVisible(!isAddMoodModalVisible);
  };
  //---------------------------------------------------------------------------------
  // ----------------------- OPTIONAL MODAL (AddMood) ----------------------------
  //---------------------------------------------------------------------------------

  const handleElementSelection = (categoryId, itemId) => {
    const modifiedData = [...allMoods];

    // Toggle the isSelected attribute of the selected element
    modifiedData[categoryId].list[itemId].isSelected =
      !modifiedData[categoryId].list[itemId].isSelected;

    // Update the selectedMoodsTags array based on the isSelected attribute
    const updatedselectedMoodsTags = modifiedData.reduce((acc, category) => {
      const selectedItems = category.list.filter((item) => item.isSelected);
      return [...acc, ...selectedItems];
    }, []);

    setselectedMoodsTags(updatedselectedMoodsTags);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Modal(MoodsTags) */}
      <Modal visible={visible} animationType="slide" transparent>
        {/* Modal Container */}
        <View style={styles.modalContainer}>
          {/* Modal Gradient */}
          <LinearGradient
            colors={[getGradientsFirstColor(postType), "rgba(58, 17, 90, 1)"]}
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
                    backgroundColor: getMoodContainerColor(postType),
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
                    style={{ left: normalize(12) }}
                    onPress={() => {
                      setHasCover(true);
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
                    uri: "https://www.billboard.com/wp-content/uploads/media/01-bruno-mars-gucci-mane-kodak-black-wake-up-in-the-sky-MV-vid-2018-billboard-1548.jpg",
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
                    fontWeight: 700,
                    fontSize: normalize(24),
                    color: "white",
                    left: "-5%",
                    marginTop: normalize(10),
                  }}
                >
                  How does it make you feel:
                </Text>
                <FlatList
                  data={allMoods}
                  horizontal
                  renderItem={({ item: category, index: categoryIndex }) => (
                    <View style={styles.horizontalContainer}>
                      <FlatList
                        scrollEnabled={false}
                        columnWrapperStyle={
                          getCarouselNumColumns(allMoods[0].list.length) > 1
                            ? { flexWrap: "wrap" }
                            : undefined
                        }
                        numColumns={Math.ceil(
                          getCarouselNumColumns(allMoods[0].list.length)
                        )}
                        data={allMoods[0].list}
                        style={{ paddingTop: normalize(10) }}
                        renderItem={({ item, index: itemIndex }) => {
                          const isSelected = item.isSelected || false;

                          const itemStyle = isSelected
                            ? {
                                paddingVertical: normalize(2),
                                paddingHorizontal: normalize(20),
                                backgroundColor:
                                  getMoodContainerColor(postType),
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
                              };

                          return (
                            <TouchableOpacity
                              style={itemStyle}
                              onPress={() =>
                                handleElementSelection(categoryIndex, itemIndex)
                              }
                            >
                              <Text
                                style={{
                                  fontWeight: 600,
                                  fontSize: normalize(18),
                                  color: getMoodTextColor(postType),
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
                  keyExtractor={(category) => category.id.toString()}
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
                      fontWeight: 700,
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
                onCloseAll={() => {
                  setIsAddMoodModalVisible(false);
                  onCloseAll();
                }}
                onClose={toggleAddMoodModal}
                selectedMedia={selectedMedia}
                selectedMoodsTags={selectedMoodsTags}
                postType={postType}
              />
            )}
          </LinearGradient>
          {selectedMoodsTags.length !== 0 && playlistTitle != "" ? (
            <TouchableOpacity
              style={{
                ...styles.touchableChooseButtonContainer,
                backgroundColor: getButtonsAccentColor(postType),
                shadowColor: getButtonsAccentColor(postType),
              }}
              onPress={() => {
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
    height: normalize(761),
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
    fontWeight: 700,
    fontSize: normalize(18),
    lineHeight: normalize(21),
    color: "white",
  },
});

export default AddPlaylist;
