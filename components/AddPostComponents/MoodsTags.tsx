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
  normalize,
  transformMoodsToStringArray
} from "../../utils";
import { Mood, MoodsAndTagsCategory, MoodsTagsProps } from "../../types";
import { getMoodsAndTagsCategories } from "../../utilsData";
import { sharedStyles } from "../../sharedStyles";

// screen WIDTH constant:
const { width } = Dimensions.get("window");

function MoodsTags({
  visible,
  onClose,
  onCloseAll,
  postSelectedMedia,
  postType,
  domainId
}: MoodsTagsProps) {

  const MOODSANDTAGS = getMoodsAndTagsCategories(postType);

  // const MOODSANDTAGS = getMoodsAndTagsCategories(postType).map(category => ({
  //   ...category,
  //   moodsTagsList: category.moodsTagsList.map(mood => ({
  //     ...mood, 
  //     isSelected: false 
  //   }))
  // }));
  // const MOODSANDTAGS: any =
  //   postType === "Song"
  //     ? MoodsAndTags["Music"]
  //     : postType === "Film/TVShow"
  //     ? MoodsAndTags["FilmsAndTVShows"]
  //     : MoodsAndTags["PodcastsEpisodes"];
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
  // Initialize postSelectedMoodsTags with initially selected moods
  const getInitiallySelectedMoods = () => {
    const initiallySelectedMoods = [];
    for (const category of MOODSANDTAGS) {
      for (const mood of category.moodsTagsList) {
        if (mood.isSelected) {
          initiallySelectedMoods.push(mood);
        }
      }
    }
    return initiallySelectedMoods;
  };

  // selected Items (array):
  const [postSelectedMoodsTags, setPostSelectedMoodsTags] = useState(
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
  const handleElementSelection = (categoryId: number, itemId: number) => {
    const modifiedData = [...MOODSANDTAGS];

    // Toggle the isSelected attribute of the selected element
    modifiedData[categoryId].moodsTagsList[itemId].isSelected =
      !modifiedData[categoryId].moodsTagsList[itemId].isSelected;

    // Update the selectedMoodsTags array based on the isSelected attribute
    const updatedPostSelectedMoodsTags = modifiedData.reduce((acc: Mood[], category: MoodsAndTagsCategory) => {
      const selectedItems = category.moodsTagsList.filter((item) => item.isSelected);
      return [...acc, ...selectedItems];
    }, []);

    setPostSelectedMoodsTags(updatedPostSelectedMoodsTags);
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
            style={{
              ...styles.backgroundGradient, 
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
                    style={{
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
                style={{... sharedStyles.selectedMediaItemContainer,
                  backgroundColor: getMoodContainerColor(postType),
                  borderColor: getMoodContainerColor(postType),
                  borderWidth: normalize(3), 
                  marginTop: normalize(10),
                }}
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
                    getItemImage(postSelectedMedia, domainId)
                  }
                  style={{
                    width: normalize(50),
                    height: normalize(50),
                    borderTopLeftRadius: normalize(5),
                    borderBottomLeftRadius: normalize(5),
                  }}
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
                    {getItemTitle(postSelectedMedia, domainId)}
                  </Text>
                  {getItemSubTitle(postSelectedMedia, domainId)}
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
                      data={category.moodsTagsList}
                      style={styles.moodsCategoryContainer}
                      renderItem={({ item: mood, index: itemIndex }) => {
                        const isSelected = mood.isSelected || false;
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
                              {mood.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </>
                )}
                keyExtractor={(category) => category.categoryId.toString()}
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
                postSelectedMedia={postSelectedMedia}
                postSelectedMoodsTags={postSelectedMoodsTags}
                postType={postType}
                domainId={domainId}
              />
            )}
            {isAddMoodModalVisible && (
              <AddMood
                visible={isAddMoodModalVisible}
                // onCloseAll={() => {
                //   setIsAddMoodModalVisible(false);
                //   onCloseAll();
                // }}
                onClose={toggleAddMoodModal}
                // selectedMedia={selectedMedia}
                // postSelectedMoodsTags={postSelectedMoodsTags}
                // postType={postType}
              />
            )}
          </LinearGradient>
          {postSelectedMoodsTags.length !== 0 ? (
            <TouchableOpacity
              style={{
                ...styles.touchableChooseButtonContainer,
                backgroundColor: getGradientsFirstColor(postType),
                borderColor: getButtonsAccentColor(postType),
                borderWidth: normalize(4), 
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
  addMoodButtonContainer: {
    marginTop: normalize(10),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(5),
    backgroundColor: "rgba(199, 144, 4, 1)",
    borderRadius: normalize(10),
    shadowColor: "rgba(105, 51, 172, 1)",
    shadowOffset: {
      width: 0,
      height: normalize(4),
    },
    shadowOpacity: 1,
    shadowRadius: normalize(5),
    borderColor: "rgba(105, 51, 172, 1)", 
    borderWidth: normalize(3)
  },
  addMoodButtonText: {
    fontWeight: "700",
    fontSize: normalize(18),
    color: "white",
  },
  selectedMediaItemContainer: {
    marginTop: 15,
    width: normalize(339),
    // height: normalize(50),
    paddingVertical: 0,
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
  // mediaItemImage: {
  //   width: normalize(50),
  //   height: normalize(50),
  //   borderTopLeftRadius: normalize(5),
  //   borderBottomLeftRadius: normalize(5),
  // },
  mediaItemTextContainer: {
    width: normalize(265),
    marginTop: normalize(4),
    marginBottom: normalize(4),
    marginLeft: normalize(15),
  },
  mediaItemText: {
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
    fontWeight: "700",
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
    fontWeight: "700",
    fontSize: normalize(24),
    left: normalize(36),
    marginTop: normalize(20),
  },
  moodsCategoryContainer: {
    marginTop: normalize(15),
  },
  moodText: {
    fontWeight: "600",
    fontSize: normalize(18),
  },
});

//---------------------------------------------------------------------------------
// -------------------------------- Styles -----------------------------------------
//---------------------------------------------------------------------------------

export default MoodsTags;
