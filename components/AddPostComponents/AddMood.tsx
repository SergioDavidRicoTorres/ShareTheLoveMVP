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
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { normalize } from "../../utils";

import { getCurrentUserData } from "../../UserData";
import SearchPlaylist from "./SearchPlaylist";
import { AddMoodProps } from "../../types";
import { useCurrentUser } from "../../CurrentUserContext";

const { width } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

function AddMood({ visible, onClose }: AddMoodProps) {
  //---------------------------------------------------------------------------------
  // ----------------------- NEXT MODAL (SearchPlaylist) -----------------------------
  //---------------------------------------------------------------------------------
  // Next Modal Boolean State
  const [isSearchPlaylistModalVisible, setIsSearchPlaylistModalVisible] =
    useState(false);
  // Next Modal show Function
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    // Handle the case where currentUser is null
    // This could be a loading indicator, a message, or a redirect
    return <div>Loading user data...</div>;
  }
  const userId = currentUser?.userId;
  if (!userId) {
    // Handle the case where currentUser is null
    // This could be a loading indicator, a message, or a redirect
    return <div>Loading userId...</div>;
  }
  // const toggleSearchPlaylistModal = () => {
  //   setIsSearchPlaylistModalVisible(!isSearchPlaylistModalVisible);
  // };
  //---------------------------------------------------------------------------------
  // ----------------------- NEXT MODAL (SearchPlaylist) -----------------------------
  //---------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  // --------------------- STATES CURRENT MODAL (AddMood)---------------------
  //---------------------------------------------------------------------------------
  // input description text (string)
  const [moodName, setMoodName] = useState("");
  // boolean variable that checks if something has been written in the description box (boolean)
  const [hasMoodName, setHasMoodName] = useState(false);
  // check box boolean variable (boolean)
  const [isChecked, setIsChecked] = useState(false);
  //---------------------------------------------------------------------------------
  // --------------------- STATES CURRENT MODAL (AddMood)---------------------
  //---------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  // -------------------- FUNCTIONS CURRENT MODAL (AddMood)-------------------
  //---------------------------------------------------------------------------------
  // HANDLE EVENT FUNCTIONS:
  // stores the given input(queue)
  const handleMoodNameChange = (value: string) => {
    setMoodName(value);
    setHasMoodName(value != "");
  };

  const handlePress = () => {
    Alert.alert(
      "Great Idea!!",
      "Send your new MOOD idea to Rico (+436766683322 on whatsapp), he'll be VERY EXCITED to check it out!",
      [
        {
          text: "OK",
          onPress: () => {
            console.log("Alert closed");
            onClose();
          },
        },
      ],
      { cancelable: false }
    );
  };
  // const handleEnterPress = () => {
  //   try {
  //     toggleSearchPlaylistModal();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //---------------------------------------------------------------------------------
  // -------------------- FUNCTIONS CURRENT MODAL (AddMood)-------------------
  //---------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  // -------------------------------- RENDERING --------------------------------------
  //---------------------------------------------------------------------------------
  return (
    <View style={{ flex: 0.2 }}>
      {/* Modal(MoodsTags) */}
      <Modal visible={visible} animationType="slide" transparent>
        {/* Modal Container */}
        <View style={styles.modalContainer}>
          {/* Modal Gradient */}
          <View style={styles.backgroundGradient}>
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
                    source={require("../../assets/icons/CancelButtonLightPurple.png")}
                    style={{
                      top: 9,
                      position: "absolute",
                      width: 20,
                      height: 20,
                      right: 9,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {/* MediaItem */}

              {/* Description */}
              <View
                // descriptionContainer
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: 29,
                  gap: 5,
                }}
              >
                {/* User Image */}
                <View
                  // userImageContainer
                  style={{
                    height: normalize(60),
                    width: normalize(60),
                    borderRadius: normalize(100),
                    backgroundColor: "black",
                    // bottom: userImageContainerBottom,
                    // zIndex: 1,
                    shadowColor: "black",
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
                      height: normalize(60),
                      width: normalize(60),
                      borderRadius: normalize(100),
                    }}
                    source={{
                      uri: currentUser.profilePicture,
                    }}
                  />
                </View>
                {/* Description Box */}
                <View
                  // descriptionBoxContainer
                  style={{
                    // paddingVertical: 2,
                    backgroundColor: "#371C5D",
                    width: normalize(260),
                    height: normalize(31),
                    borderRadius: normalize(15),
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: normalize(20),
                    borderWidth: normalize(2),
                    borderStyle: "solid",
                    zIndex: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "rgba(58, 17, 90, 0.75)",
                    borderColor: "rgba(255, 184, 0, 1)",
                  }}
                >
                  <TextInput
                    // descriptionBoxTextInput
                    value={moodName}
                    onSubmitEditing={Keyboard.dismiss}
                    returnKeyType="done"
                    onChangeText={handleMoodNameChange}
                    style={{
                      flex: 1,
                      color: "white",
                      fontSize: normalize(17),
                      marginRight: normalize(10),
                      width: normalize(210),
                    }}
                    placeholder="Write your Mood..."
                    // multiline={true}
                    // textAlignVertical="top"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: normalize(15),
                  marginTop: normalize(11),
                  marginLeft: normalize(20),
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    setIsChecked(!isChecked);
                  }}
                >
                  <View
                    style={{
                      width: normalize(25),
                      height: normalize(25),
                      borderRadius: normalize(5),
                      borderWidth: normalize(4),
                      borderColor: "rgba(156, 75, 255, 1)",
                      backgroundColor: isChecked
                        ? "rgba(156, 75, 255, 1)"
                        : "rgba(58, 17, 90, 0)",
                      justifyContent: "center",
                    }}
                  >
                    {isChecked && (
                      <Image
                        source={require("../../assets/icons/CheckIcon.png")}
                        style={{
                          width: normalize(14),
                          height: normalize(11),
                          left: normalize(1),
                        }}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>

                <View style={{ width: normalize(273), height: normalize(43) }}>
                  <Text
                    style={{
                      // color: "rgba(58, 17, 90, 0.75)",
                      color: "rgba(156, 75, 255, 1)",
                      fontSize: normalize(12),
                      fontStyle: "normal",
                      fontWeight: "500",
                      // lineHeight: "normal",
                    }}
                  >
                    I want to associate my username with this 'mood' so that
                    other users can identify the author of this 'mood'
                  </Text>
                </View>
              </View>
            </View>
            {/* Next Modal (SearchPlaylist) */}
            {/* {isSearchPlaylistModalVisible && (
              <SearchPlaylist
                visible={isSearchPlaylistModalVisible}
                onCloseAll={() => {
                  setIsSearchPlaylistModalVisible(false);
                  onCloseAll();
                }}
                onClose={toggleSearchPlaylistModal}
                selectedMoodsTags={selectedMoodsTags}
                selectedMedia={selectedMedia}
                insertedMoodName={moodName}
                postType={postType}
              />
            )} */}
            {hasMoodName === false ? (
              <View style={styles.chooseButtonContainer}>
                <Text style={styles.chooseButtonText}>Submit Mood</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  ...styles.touchableChooseButtonContainer,
                  backgroundColor: "rgba(105, 51, 172, 1)",
                  shadowColor: "rgba(58, 17, 90, 0.75)",
                }}
                onPress={handlePress}
              >
                <Text style={styles.chooseButtonText}>Submit Mood</Text>
              </TouchableOpacity>
            )}
          </View>
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
    position: "absolute",
    bottom: normalize(20),
    alignSelf: "center",
    alignItems: "center",
  },
  backgroundGradient: {
    borderRadius: normalize(10),
    width: normalize(363),
    // height: normalize(201),
    backgroundColor: "rgba(22, 0, 39, 1)",
    borderWidth: normalize(4),
    borderColor: "rgba(156, 75, 255, 1)",
  },
  modalContent: {
    alignItems: "center",
  },
  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chooseButtonContainer: {
    // position: "absolute",
    paddingHorizontal: normalize(20),
    width: normalize(200),
    height: normalize(40),
    borderRadius: normalize(15),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(152, 152, 152, 1)",
    // bottom: normalize(12),
    marginVertical: normalize(20),
  },
  touchableChooseButtonContainer: {
    // position: "absolute",
    paddingHorizontal: normalize(20),
    height: normalize(40),
    borderRadius: normalize(15),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: normalize(10),
    // bottom: normalize(12),
    width: normalize(200),
    alignSelf: "center",
    marginVertical: normalize(20),
  },
  chooseButtonText: {
    fontWeight: "700",
    fontSize: normalize(18),
    lineHeight: normalize(21),
    color: "white",
  },
  mediaItemImageContainer: {
    backgroundColor: "white",
    width: normalize(297),
    height: normalize(297),
    borderRadius: normalize(5),
    marginTop: normalize(10),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: normalize(10),
  },
  mediaItemImage: {
    width: normalize(297),
    height: normalize(297),
    borderRadius: normalize(5),
  },
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
  descriptionContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: -normalize(10),
  },
  userImageContainer: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
    backgroundColor: "black",
    zIndex: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: normalize(8),
  },
  // userImage: {
  //   height: normalize(60),
  //   width: normalize(60),
  //   borderRadius: normalize(100),
  // },
  descriptionBoxContainer: {
    paddingVertical: 2,
    backgroundColor: "#371C5D",
    width: normalize(260),
    height: normalize(31),
    borderRadius: normalize(15),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: normalize(20),
    borderWidth: normalize(2),
    borderStyle: "solid",
    zIndex: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(58, 17, 90, 0.75)",
    borderColor: "rgba(255, 184, 0, 1)",
  },
  descriptionBoxTextInput: {
    flex: 1,
    color: "white",
    fontSize: normalize(17),
    marginRight: 10,
    width: normalize(210),
  },
});

//---------------------------------------------------------------------------------
// -------------------------------- Styles -----------------------------------------
//---------------------------------------------------------------------------------

export default AddMood;
