import { useState } from "react";
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
  Platform,
  StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCurrentUserData } from "../UserData";
import MediaItemInfo from "../components/MediaItemInfo";
import {
  Domain,
  PostsViewScreenRouteProp,
  ProfileNavigationProp,
} from "../types";
import {
  getScreenGradientFirstColor,
  getMoodTextColor,
  getMoodContainerColor,
  getItemImage,
} from "../utils";
import { DOMAINPOSTTYPE } from "../constants";
import { normalize } from "../utils";
// import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window"); // screen width constant
// const normalize = (value: number) => width * (value / 390);

const user = getCurrentUserData();

// const getGradientFirstColor = (domain: Domain) => {
//   // try {
//     if (domain.domainId === 0) {
//       return "rgba(0, 98, 62, 1)";
//     }
//     if (domain.domainId === 1) {
//       return "rgba(99, 0, 101, 1)";
//     }
//     if (domain.domainId === 2) {
//       return "rgba(75, 117, 59, 1)";
//     }
//     console.log('Invalid "domain" was passed!');
//     return "rgba(105, 51, 172, 1)"
//   // } catch (error) {
//   //   console.error(error);
//   //   return [];
//   // }
// };

// const getPlaylistContainerColor = (category) => {
//   try {
//     if (category.domainId === 0) {
//       return "rgba(0, 255, 163, 0.3)";
//     }
//     if (category.domainId === 1) {
//       return "rgba(250, 0, 255, 0.3)";
//     }
//     if (category.domainId === 2) {
//       return "rgba(120, 190, 94, 0.3)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const getMoodTextColor = (category: Domain) => {
//   try {
//     if (category.domainId === 0) {
//       return "rgba(153, 255, 218, 1)";
//     }
//     if (category.domainId === 1) {
//       return "rgba(253, 153, 255, 1)";
//     }
//     if (category.domainId === 2) {
//       return "rgba(197, 238, 182, 1)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

const getPlaylistAccentColor = (category: Domain) => {
  if (category.domainId === 0) {
    return "rgba(0, 255, 163, 1)";
  }
  if (category.domainId === 1) {
    return "rgba(250, 0, 255, 1)";
  }
  if (category.domainId === 2) {
    return "rgba(154, 255, 118, 1)";
  }
  console.log('Invalid "domain" was passed!');
  return "rgba(105, 51, 172, 1)";
};

// const getMoodContainerColor = (category) => {
//   try {
//     if (category.domainId === 0) {
//       return "rgba(0, 255, 163, 0.6)";
//     }
//     if (category.domainId === 1) {
//       return "rgba(250, 0, 255, 0.6)";
//     }
//     if (category.domainId === 2) {
//       return "rgba(110, 212, 73, 0.6)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

export default function PostsViewScreen() {
  const handleButtonPress = () => {
    // Handle button press event
  };
  const route = useRoute<PostsViewScreenRouteProp>();
  const navigation = useNavigation<ProfileNavigationProp>();

  const { domainOfTaste, post, user } = route.params;
  //---------------------------------------------------------------------------------
  // ----------------------- OPTIONAL MODAL (MediaItemInfo) ----------------------------
  //---------------------------------------------------------------------------------
  // Optional Modal Boolean State
  const [isMediaItemInfoModalVisible, setIsMediaItemInfoModalVisible] =
    useState(false);
  // Optional Modal show Function
  const toggleMediaItemInfoModal = () => {
    setIsMediaItemInfoModalVisible(!isMediaItemInfoModalVisible);
  };
  //---------------------------------------------------------------------------------
  // ----------------------- OPTIONAL MODAL (MediaItemInfo) ----------------------------
  //---------------------------------------------------------------------------------

  return (
    <LinearGradient
      colors={[getScreenGradientFirstColor(domainOfTaste), "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={{
        ...styles.container,
        // paddingVertical: Platform.OS === "android" ? normalize(50) : 0,
      }}
    >
      <StatusBar
        backgroundColor={getScreenGradientFirstColor(domainOfTaste)}
        barStyle="light-content"
      />
      <SafeAreaView
        style={{
          ...styles.container,
          // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }} // External Container
      >
        {/* <ScrollView> */}
        <View
          style={{
            // backgroundColor: getGradientFirstColor(domainOfTaste),
            width,
            // paddingBottom: normalize(2),
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            // backButtonContainer
            onPress={() => navigation.goBack()}
            style={{
              left: normalize(10),
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
        {/* <ScrollView
          style={{
            maxWidth: normalize(325)
          }}
          horizontal
        > */}

        <Text
          style={{
            marginBottom: normalize(10),
            color: "white",
            fontSize: normalize(24),
            fontWeight: "700",
            textAlign: "center",
            maxWidth: normalize(325),
          }}
          numberOfLines={1}
        >
          {post.mediaItem.name}
        </Text>
        {/* </ScrollView> */}

        <View
          style={{
            width: normalize(325),
            alignItems: "center",
            backgroundColor: getPlaylistAccentColor(domainOfTaste),
            //   height: 660,
            shadowColor: getPlaylistAccentColor(domainOfTaste),
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: normalize(8),
            bottom: normalize(2),
            borderRadius: normalize(15),
            // borderColor: getMoodContainerColor(DOMAINPOSTTYPE.get(domainOfTaste.domainId)),
            // borderWidth: normalize(2)
            //   overflow: "hidden", // Clip the shadow if needed
          }}
        >
          <ImageBackground
            source={
              // { uri: post.mediaItem.image }
              getItemImage(post.mediaItem, domainOfTaste.domainId)
            }
            resizeMode="cover"
            imageStyle={{
              opacity: 0.9,
              borderRadius: normalize(15),
            }}
            blurRadius={3}
          >
            <View
              style={{
                alignItems: "center",
                width: normalize(327),
                height:
                  Platform.OS === "android" ? width * 1.45 : normalize(630),
                borderRadius: normalize(15),
                justifyContent: "flex-end",
              }}
            >
              {/* <View> */}
              <View
                style={{
                  width: normalize(300),
                  height: normalize(180),
                  borderRadius: normalize(10),
                  backgroundColor: "rgba(58, 17, 90, 0.9)",
                  backfaceVisibility: "hidden",
                  marginBottom: normalize(10),
                  alignItems: "center",
                  borderColor: getMoodTextColor(
                    DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                  ),
                  borderWidth: normalize(2),
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: normalize(70),
                    height: normalize(70),
                    borderRadius: normalize(70),
                    shadowColor: getPlaylistAccentColor(domainOfTaste),
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: normalize(8),
                    bottom: normalize(50),
                  }}
                >
                  {/* <Text>{user.name}</Text> */}
                  <Image
                    style={{
                      width: normalize(70),
                      height: normalize(70),
                      borderRadius: normalize(70),
                      borderColor: getMoodTextColor(
                        DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                      ),
                      borderWidth: normalize(3),
                    }}
                    source={{ uri: user.profilePicture }}
                  />
                </View>
                <View style={{ height: normalize(25), bottom: normalize(40) }}>
                  <FlatList
                    data={post.moods}
                    // style={{ marginLeft: normalize(10), marginRight: 5 }}
                    horizontal
                    renderItem={({ item: mood }) => (
                      // Mood

                      <View
                        // moodContainer
                        style={{
                          ...styles.moodContainer,
                          backgroundColor: getMoodContainerColor(
                            DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                          ),
                        }}
                      >
                        <Text
                          // moodText
                          style={{
                            ...styles.moodText,
                            color: getMoodTextColor(
                              DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                            ),
                          }}
                        >
                          {mood.name}
                        </Text>
                      </View>
                    )}
                    keyExtractor={(mood) => mood.id.toString()}
                  />
                </View>
                <View
                  style={{ alignItems: "flex-start", bottom: normalize(30) }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: normalize(18),
                      fontWeight: "600",
                      marginHorizontal: normalize(2),
                    }}
                  >
                    @{user.profileName}
                  </Text>
                  <View style={{ width: normalize(280) }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: normalize(18),
                        fontWeight: "300",
                        marginHorizontal: normalize(10),
                      }}
                      numberOfLines={4}
                    >
                      {post.caption}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  toggleMediaItemInfoModal();
                }}
                style={{
                  backgroundColor: getMoodContainerColor(
                    DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                  ),
                  paddingHorizontal: normalize(20),
                  paddingVertical: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                  marginBottom: normalize(30),
                  borderColor: getMoodTextColor(
                    DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                  ),
                  borderWidth: normalize(2),
                }}
              >
                <Text
                  style={{
                    color: getMoodTextColor(
                      DOMAINPOSTTYPE.get(domainOfTaste.domainId)
                    ),
                    fontSize: normalize(20),
                    fontWeight: "700",
                    // marginHorizontal: normalize(20),

                    // marginVertical: normalize(10),
                  }}
                >
                  More Info
                </Text>
              </TouchableOpacity>
              {/* </View> */}
            </View>
          </ImageBackground>
        </View>
        {isMediaItemInfoModalVisible && (
          <MediaItemInfo
            visible={isMediaItemInfoModalVisible}
            // onCloseAll={() => {
            //   setIsMediaItemInfoModalVisible(false);
            //   onCloseAll();
            // }}
            onClose={toggleMediaItemInfoModal}
            post={post}
          />
        )}
        {/* </View> */}
        {/* </ScrollView> */}
        {/* </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },

  // moodContainer: {
  //   paddingVertical: moodContainerPaddingVertical,
  //   paddingHorizontal: moodContainerPaddingHorizontal,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: moodContainerBorderRadius,
  //   // marginVertical: moodContainerMarginVertical,
  //   marginHorizontal: moodContainerMarginHorizontal,
  // },
  // moodText: {
  //   fontWeight: "600",
  //   fontSize: moodTextFontSize,
  // },
  moodContainer: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    // marginVertical: normalize(8),
    marginHorizontal: normalize(5),
  },
  moodText: {
    fontWeight: "600",
    fontSize: normalize(18),
  },
  backButtonImage: {
    width: normalize(14),
    height: normalize(23),
  },
});
