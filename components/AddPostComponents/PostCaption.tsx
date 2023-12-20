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
  ScrollView,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { getCurrentUserData } from "../../UserData";
import SearchPlaylist from "./SearchPlaylist";
import {
  getGradientsFirstColor,
  getItemSubTitle,
  getItemTitle,
  getButtonsAccentColor,
  getItemImage,
  getMoodContainerColor,
  getMoodTextColor,
  getImageHeight,
  getImageWidth,
  normalize
} from "../../utils";
import { PostCaptionProps } from "../../types";

const { width } = Dimensions.get("window"); // screen width constant

function PostCaption({
  visible,
  onClose,
  onCloseAll,
  postSelectedMedia,
  postType,
  postSelectedMoodsTags,
  domainId
}: PostCaptionProps) {
  //---------------------------------------------------------------------------------
  // ----------------------- NEXT MODAL (SearchPlaylist) -----------------------------
  //---------------------------------------------------------------------------------
  // Next Modal Boolean State
  const [isSearchPlaylistModalVisible, setIsSearchPlaylistModalVisible] =
    useState(false);
  // Next Modal show Function
  const toggleSearchPlaylistModal = () => {
    setIsSearchPlaylistModalVisible(!isSearchPlaylistModalVisible);
  };
  //---------------------------------------------------------------------------------
  // ----------------------- NEXT MODAL (SearchPlaylist) -----------------------------
  //---------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  // --------------------- STATES CURRENT MODAL (PostCaption)---------------------
  //---------------------------------------------------------------------------------
  // input Caption text (string)
  const [caption, setCaption] = useState("");
  // boolean variable that checks if something has been written in the Caption box (boolean)
  const [hasCaption, setHasCaption] = useState(false);
  //---------------------------------------------------------------------------------
  // --------------------- STATES CURRENT MODAL (PostCaption)---------------------
  //---------------------------------------------------------------------------------

  // stores the given input(queue)
  const handleCaptionChange = (value: string) => {
    setCaption(value);
    setHasCaption(value != "");
  };

  const handleEnterPress = () => {
    try {
      toggleSearchPlaylistModal();
    } catch (error) {
      console.error(error);
    }
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
                    style={{...styles.achievedProgressState, 
                      backgroundColor: getMoodContainerColor(postType)
                    }}
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
              {/* MediaItem */}
              <View>
                {/* mediaItemText */}
                <Text
                  // mediaItemTitle
                  numberOfLines={1}
                  style={styles.mediaItemTitle}
                >
                  {getItemTitle(postSelectedMedia, domainId)}
                </Text>
                {/* mediaItemSubtitle */}
                {getItemSubTitle(postSelectedMedia, domainId)}
              </View>
              {/* mediaItemImage */}
              <View
                // medieItemImageContainer
                style={{
                  ...styles.mediaItemImageContainer,
                  // shadowColor: getMoodTextColor(postType),
                  width: getImageWidth(postType),
                  height: getImageHeight(postType),
                  backgroundColor: getGradientsFirstColor(postType),
                }}
                >
                <Image
                  // mediaItemImage
                  source={getItemImage(postSelectedMedia, domainId)}
                  style={{
                    borderRadius: normalize(5),
                    width: getImageWidth(postType),
                    height: getImageHeight(postType),
                    borderColor: getMoodContainerColor(postType),
                    borderWidth: normalize(4), 
                  }}
                  />
              </View>

              {/* Moods */}
              <ScrollView
                // moodsScrollContainer
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.moodsScrollContainer}
              >
                <View
                  // outerMoodsContainer
                  style={styles.outerMoodsContainer}
                >
                  {postSelectedMoodsTags.map((mood) => (
                    // Mood
                    <View
                      // moodContainer
                      key={mood.id}
                      style={{
                        ...styles.moodContainer,
                        backgroundColor: getMoodContainerColor(postType),
                      }}
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
                    </View>
                  ))}
                </View>
              </ScrollView>
              {/* Caption */}
              <View
                // CaptionContainer
                style={styles.CaptionContainer}
              >
                {/* User Image */}
                <View
                  // userImageContainer
                  style={{
                    ...styles.userImageContainer,
                    backgroundColor: getButtonsAccentColor(postType),
                    shadowColor: getButtonsAccentColor(postType),
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: normalize(8),
                  }}
                >
                  <Image
                    // userImage
                    style={{
                      height: normalize(70),
                      width: normalize(70),
                      borderRadius: normalize(100),
                      borderColor: getButtonsAccentColor(postType),
                      borderWidth: normalize(4), 
                    }}
                    source={{
                      uri: getCurrentUserData().profilePicture,
                    }}
                  />
                </View>
                {/* Caption Box */}
                <View
                  // CaptionBoxContainer
                  style={{
                    ...styles.CaptionBoxContainer,
                    backgroundColor: getMoodContainerColor(postType),
                    shadowColor: getButtonsAccentColor(postType),
                    borderColor: getButtonsAccentColor(postType),
                  }}
                >
                  <TextInput
                    // CaptionBoxTextInput
                    value={caption}
                    onSubmitEditing={Keyboard.dismiss}
                    returnKeyType="done"
                    onChangeText={handleCaptionChange}
                    style={styles.CaptionBoxTextInput}
                    placeholder="Write your caption..."
                    multiline
                    textAlignVertical="top"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    blurOnSubmit
                  />
                </View>
              </View>
            </View>
            {/* Next Modal (SearchPlaylist) */}
            {isSearchPlaylistModalVisible && (
              <SearchPlaylist
                visible={isSearchPlaylistModalVisible}
                onCloseAll={() => {
                  setIsSearchPlaylistModalVisible(false);
                  onCloseAll();
                }}
                onClose={toggleSearchPlaylistModal}
                postSelectedMoodsTags={postSelectedMoodsTags}
                postSelectedMedia={postSelectedMedia}
                postInsertedCaption={caption}
                postType={postType}
                domainId={domainId}
              />
            )}
          </LinearGradient>
          {hasCaption === false ? (
            <View style={styles.chooseButtonContainer}>
              <Text style={styles.chooseButtonText}>Save Post</Text>
            </View>
          ) : (
            <TouchableOpacity
            style={{
              ...styles.touchableChooseButtonContainer,
              backgroundColor: getGradientsFirstColor(postType),
              borderColor: getButtonsAccentColor(postType),
              borderWidth: normalize(4), 
              shadowColor: getButtonsAccentColor(postType),
            }}
              onPress={toggleSearchPlaylistModal}
            >
              <Text style={styles.chooseButtonText}>Save Post</Text>
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
  mediaItemImageContainer: {
    width: normalize(298),
    height: normalize(298),
    borderRadius: normalize(5),
    marginTop: normalize(10),
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: normalize(10),
  },
  // mediaItemImage: {
  //   // width: normalize(298),
  //   // height: normalize(298),
  //   borderRadius: normalize(5),
  // },
  mediaItemTitle: {
    width: normalize(265),
    fontWeight: "700",
    fontSize: normalize(20),
    color: "white",
    marginTop: normalize(10),
  },
  itemSubtitle: {
    fontWeight: "300",
    fontSize: normalize(18),
    color: "white",
  },
  moodsScrollContainer: {
    marginHorizontal: normalize(30),
  },
  outerMoodsContainer: {
    flexDirection: "row",
    height: normalize(40),
    marginTop: normalize(15),
    alignItems: "center",
  },
  moodContainer: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    marginVertical: normalize(8),
    marginHorizontal: normalize(5),
  },
  moodText: {
    fontWeight: "600",
    fontSize: normalize(18),
  },
  CaptionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -normalize(10),
  },
  userImageContainer: {
    height: normalize(70),
    width: normalize(70),
    borderRadius: normalize(100),

    bottom: -normalize(20),
    zIndex: 1,

  },
  // userImage: {
  //   height: normalize(70),
  //   width: normalize(70),
  //   borderRadius: normalize(100),
  // },
  CaptionBoxContainer: {
    paddingTop: normalize(18),
    paddingBottom: normalize(5),
    // backgroundColor: "#371C5D",
    width: normalize(315),
    height: normalize(114),
    borderRadius: normalize(15),
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: normalize(10),
    borderWidth: normalize(4),
    borderStyle: "solid",
    zIndex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  CaptionBoxTextInput: {
    flex: 1,
    width: normalize(275),
    height: normalize(114),
    color: "white",
    fontSize: normalize(17),
    marginHorizontal: normalize(8),
  },
});

//---------------------------------------------------------------------------------
// -------------------------------- Styles -----------------------------------------
//---------------------------------------------------------------------------------

export default PostCaption;
