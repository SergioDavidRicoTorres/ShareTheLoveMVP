import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// moods and tags catalogue:
import MoodsAndTags from "../../DummyData/MoodsAndTags.json";
// Next Modal Component:
import PostCaption from "./PostCaption";
// Optional Modal Component:
import AddMood from "./AddMood";
import {
  getItemImage,
  getItemSubTitle,
  getItemTitle,
  getMoodTextColor,
  getMoodContainerColor,
  getButtonsAccentColor,
  getGradientsFirstColor,
} from "../../utils";

// screen WIDTH constant:
const { width } = Dimensions.get("window");
const normalize = (value) => width * (value / 390);

function MoodsTagsMusic({
  visible,
  onClose,
  onCloseAll,
  selectedMedia,
  postType,
}) {
  const MOODSANDTAGS =
    postType === "Song"
      ? MoodsAndTags["Music"]
      : postType === "Film/TVShow"
      ? MoodsAndTags["FilmsAndTVShows"]
      : MoodsAndTags["PodcastsEpisodes"];
  //---------------------------------------------------------------------------------
  // ----------------------- NEXT MODAL (PostCaption) ----------------------------
  //---------------------------------------------------------------------------------
  // Next Modal Boolean State
  const [isPostCaptionModalVisible, setIsPostCaptionModalVisible] =
    useState(false);
  // Next Modal show Function
  const togglePostCaptionModal = () => {
    setIsPostCaptionModalVisible(!isPostCaptionModalVisible);
  };
  //---------------------------------------------------------------------------------
  // ----------------------- NEXT MODAL (PostCaption) ----------------------------
  //---------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  // ----------------------- OPTIONAL MODAL (AddMood) ----------------------------
  //---------------------------------------------------------------------------------
  // Optional Modal Boolean State
  const [isAddMoodModalVisible, setIsAddMoodModalVisible] = useState(false);
  // Optional Modal show Function
  const toggleAddMoodModal = () => {
    setIsAddMoodModalVisible(!isAddMoodModalVisible);
  };
  //---------------------------------------------------------------------------------
  // ----------------------- OPTIONAL MODAL (AddMood) ----------------------------
  //---------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  // ---------------------- STATES CURRENT MODAL (MoodsTags)--------------------------
  //---------------------------------------------------------------------------------
  // Initialize selectedMoodsTags with initially selected moods
  const getInitiallySelectedMoods = () => {
    const initiallySelectedMoods = [];
    for (const category of MOODSANDTAGS) {
      for (const mood of category.list) {
        if (mood.isSelected) {
          initiallySelectedMoods.push(mood);
        }
      }
    }
    return initiallySelectedMoods;
  };

  // selected Items (array):
  const [selectedMoodsTags, setSelectedMoodsTags] = useState(
    getInitiallySelectedMoods()
  );
  //---------------------------------------------------------------------------------
  // ---------------------- STATES CURRENT MODAL (MoodsTags)--------------------------
  //---------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  // ---------------------- FUNCTIONS CURRENT MODAL (SearchMedia)---------------------
  //---------------------------------------------------------------------------------
  // HANDLE EVENT FUNCTIONS:
  // inserts the selected item (mood) to the selectedMoodsTags array
  const handleElementSelection = (categoryId, itemId) => {
    const modifiedData = [...MOODSANDTAGS];

    // Toggle the isSelected attribute of the selected element
    modifiedData[categoryId].list[itemId].isSelected =
      !modifiedData[categoryId].list[itemId].isSelected;

    // Update the selectedMoodsTags array based on the isSelected attribute
    const updatedselectedMoodsTags = modifiedData.reduce((acc, category) => {
      const selectedItems = category.list.filter((item) => item.isSelected);
      return [...acc, ...selectedItems];
    }, []);

    setSelectedMoodsTags(updatedselectedMoodsTags);
  };

  //---------------------------------------------------------------------------------
  // -------------------------------- RENDERING --------------------------------------
  //---------------------------------------------------------------------------------

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
                    style={styles.backButtonImage}
                  />
                </TouchableOpacity>
                {/* Progress Tracker */}
                <View
                  // progressTrackerContainer
                  style={styles.progressTrackerContainer}
                >
                  <View
                    // achievedProgressState(1.)
                    style={styles.achievedProgressState}
                  />
                  <View
                    // achivedProgressState(2.)
                    style={styles.achievedProgressState}
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
              {/* Add Mood Button */}
              <TouchableOpacity
                // addMoodButtonContainer
                style={styles.addMoodButtonContainer}
                onPress={() => {
                  toggleAddMoodModal();
                  onClose;
                }}
              >
                <Text
                  // addMoodButtonText
                  style={styles.addMoodButtonText}
                >
                  Add your own mood
                </Text>
              </TouchableOpacity>
              {/* Media Item */}
              <View
                // mediaItemContainer
                style={styles.selectedMediaItemContainer}
              >
                <Image
                  // mediaItemImage
                  source={
                    // // logic for image fetching depending postType (it didn't work by defining a separating function)
                    // postType === "Song"
                    //   ? { uri: selectedMedia.album.images[0].url }
                    //   : postType === "PodcastEpisode"
                    //   ? { uri: selectedMedia.images[0].url }
                    //   : postType === "Film/TVShow"
                    //   ? {
                    //       uri: `https://image.tmdb.org/t/p/original/${selectedMedia.poster_path}`,
                    //     }
                    //   : require("../assets/default/image.png") // default image source
                    getItemImage(selectedMedia, postType)
                  }
                  style={styles.mediaItemImage}
                />
                <View
                  // mediaItemTextContainer
                  style={styles.mediaItemTextContainer}
                >
                  <Text
                    // mediaItemText
                    numberOfLines={1}
                    style={styles.mediaItemText}
                  >
                    {getItemTitle(selectedMedia, postType)}
                  </Text>
                  {getItemSubTitle(selectedMedia, postType)}
                </View>
              </View>

              {/* Title (How does it make you feel) */}
              <Text
                // titleText
                style={styles.titleText}
              >
                How does it make you feel:
              </Text>
              {/* Moods Catalogue */}
              <FlatList
                // moodsCatalogueOuterContainer
                data={MOODSANDTAGS}
                style={{
                  ...styles.moodsCatalogueOuterContainer,
                  marginBottom: width * 0.15,
                }}
                renderItem={({ item: category, index: categoryIndex }) => (
                  <>
                    {/* Moods Category */}
                    <Text
                      // moodsCategoryTitleText
                      style={{
                        ...styles.moodsCategoryTitleText,
                        color: getMoodTextColor(postType),
                      }}
                    >
                      {`${category.name}:`}
                    </Text>
                    {/* Moods Category */}
                    <FlatList
                      // moodsCategoryContainer
                      columnWrapperStyle={{ flexWrap: "wrap" }}
                      numColumns={6}
                      data={category.list}
                      style={styles.moodsCategoryContainer}
                      renderItem={({ item, index: itemIndex }) => {
                        const isSelected = item.isSelected || false;
                        return (
                          // {Mood}
                          <TouchableOpacity
                            // moodContainer
                            style={
                              isSelected
                                ? {
                                    ...styles.selectedMoodContainer,
                                    backgroundColor:
                                      getMoodContainerColor(postType),
                                  }
                                : styles.moodContainer
                            }
                            onPress={() =>
                              handleElementSelection(categoryIndex, itemIndex)
                            }
                          >
                            <Text
                              // moodText
                              style={{
                                ...styles.moodText,
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
                  </>
                )}
                keyExtractor={(category) => category.id.toString()}
              />
              {/* </View> */}
            </View>
            {isPostCaptionModalVisible && (
              <PostCaption
                visible={isPostCaptionModalVisible}
                onCloseAll={() => {
                  setIsPostCaptionModalVisible(false);
                  onCloseAll();
                }}
                onClose={togglePostCaptionModal}
                selectedMedia={selectedMedia}
                selectedMoodsTags={selectedMoodsTags}
                postType={postType}
              />
            )}
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
          {selectedMoodsTags.length !== 0 ? (
            <TouchableOpacity
              style={{
                ...styles.touchableChooseButtonContainer,
                backgroundColor: getButtonsAccentColor(postType),
                shadowColor: getButtonsAccentColor(postType),
              }}
              onPress={() => {
                togglePostCaptionModal();
                onClose;
              }}
            >
              <Text style={styles.chooseButtonText}>Choose Moods/Tags</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.chooseButtonContainer}>
              <Text style={styles.chooseButtonText}>Choose Moods/Tags</Text>
            </View>
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
  backButtonImage: {
    width: normalize(14),
    height: normalize(23),
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
    fontWeight: 600,
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
    fontWeight: 700,
    fontSize: normalize(18),
    lineHeight: normalize(21),
    color: "white",
  },
  addMoodButtonContainer: {
    marginTop: normalize(10),
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
  },
  addMoodButtonText: {
    fontWeight: 700,
    fontSize: normalize(18),
    color: "white",
  },
  selectedMediaItemContainer: {
    marginTop: 15,
    width: normalize(339),
    height: normalize(50),
    borderRadius: normalize(6),
    flexDirection: "row",
    backgroundColor: "rgba(84, 42, 146, 1)",
    shadowColor: "#6933AC",
    shadowOffset: {
      width: 0,
      height: normalize(4),
    },
    shadowOpacity: normalize(1),
    shadowRadius: normalize(20),
  },
  mediaItemImage: {
    width: normalize(50),
    height: normalize(50),
    borderTopLeftRadius: normalize(5),
    borderBottomLeftRadius: normalize(5),
  },
  mediaItemTextContainer: {
    width: normalize(265),
    marginTop: normalize(4),
    marginBottom: normalize(4),
    marginLeft: normalize(15),
  },
  mediaItemText: {
    width: normalize(265),
    fontWeight: 700,
    fontSize: normalize(20),
    lineHeight: normalize(23),
    color: "white",
  },
  itemSubtitle: {
    fontWeight: 300,
    fontSize: normalize(12),
    lineHeight: normalize(12),
    color: "white",
  },
  selectedMoodContainer: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    marginVertical: normalize(8),
    marginHorizontal: normalize(10),
  },
  moodContainer: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(20),
    backgroundColor: "rgba(58, 17, 90, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    marginVertical: normalize(8),
    marginHorizontal: normalize(10),
  },
  titleText: {
    fontWeight: 700,
    fontSize: normalize(24),
    color: "white",
    left: -normalize(20),
    marginTop: normalize(10),
  },
  moodsCatalogueOuterContainer: {
    flex: 1,
    // marginTop: normalize(10),
    paddingBottom: normalize(55),
  },
  moodsCategoryTitleText: {
    fontWeight: 700,
    fontSize: normalize(24),
    left: normalize(36),
    marginTop: normalize(20),
  },
  moodsCategoryContainer: {
    marginTop: normalize(15),
  },
  moodText: {
    fontWeight: 600,
    fontSize: normalize(18),
  },
});

//---------------------------------------------------------------------------------
// -------------------------------- Styles -----------------------------------------
//---------------------------------------------------------------------------------

export default MoodsTagsMusic;
