import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { getCurrentUserData } from "../UserData";
import Settings from "../components/Settings";
import { useEffect, useRef, useState } from "react";
// import Carousel from "react-native-snap-carousel";
import Carousel from "react-native-reanimated-carousel";

import { normalize } from "../utils";
import {
  Domain,
  ExternalProfileScreenRouteProp,
  ProfileNavigationProp,
  ProfileScreenRouteProp,
  User,
} from "../types";
import { getUsersDomains, DEFAULT_USER } from "../utilsData";
import { FIREBASE_AUTH } from "../firebaseConfig";
import AddPlaylist from "../components/AddPostComponents/AddPlaylist";
import DomainOfTasteCard from "../components/DomainOfTasteCard";
import { fetchUserById } from "../utilsFirebase";
import FollowButton from "../components/FollowButton";
import { interpolate, useAnimatedStyle } from "react-native-reanimated";
// import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

export default function ExternalProfileScreen() {
  const route = useRoute<ExternalProfileScreenRouteProp>();
  const user = route.params?.user ?? DEFAULT_USER;
  const userId: string =
    user.userId !== undefined ? user.userId : "Error: NO USER ID";
  const [domainsArray, setDomainsArray] = useState<Domain[]>([]);
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState(false);

  // console.log("userId: ", userId);
  // const [user, setUser] = useState<User>(DEFAULT_USER); // State to store the user data
  // Optional Modal Boolean State
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  // Optional Modal show Function
  const toggleSettingsModal = () => {
    setIsSettingsModalVisible(!isSettingsModalVisible);
  };

  // Optional Modal Visible State
  const [isAddPlaylistModalVisible, setIsAddPlaylistModalVisible] =
    useState(false);
  // Optional Modal Show Function
  const toggleAddPlaylistModal = () => {
    setIsAddPlaylistModalVisible(!isAddPlaylistModalVisible);
  };

  const handlePress = () => {
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    const getUserDataAndDomains = async () => {
      try {
        if (user !== null) {
          const userDomains = getUsersDomains(user);
          console.log(
            "[ExternalProfileScreen]: this are the userDomains:",
            userDomains
          );
          setDomainsArray(userDomains);
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (userId) {
      getUserDataAndDomains();
    }
  }, [route]); // Depends on userId

  const scrollViewRef = useRef<ScrollView | null>(null);

  // Function to scroll to the top of the ScrollView
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  return (
    <LinearGradient
      colors={["rgba(1, 4, 43, 1)", "rgba(69, 22, 129, 1)"]} // Specify the colors for the gradient
      style={{
        ...styles.container,
        // paddingVertical: Platform.OS === "android" ? normalize(50) : 0,
      }}
    >
      <StatusBar backgroundColor="rgba(1, 4, 43, 1)" barStyle="light-content" />
      <SafeAreaView
        style={{
          ...styles.container,
          // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }} // External Container
      >
        <View
          style={{
            // backgroundColor: getScreenGradientFirstColor(domainOfTaste),
            width,
            paddingBottom: normalize(5),
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
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                fontSize: normalize(30),
                fontWeight: "700",
              }}
            >
              {user.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: normalize(10),
                marginTop: normalize(9),
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(25),
                    fontWeight: "900",
                    letterSpacing: -1,
                  }}
                >
                  {user.followersCount}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(17),
                    fontWeight: "300",
                    letterSpacing: -0.68,
                  }}
                >
                  Followers
                </Text>
              </View>
              <View
                // userImageContainer
                style={{
                  height: normalize(140),
                  width: normalize(140),
                  borderRadius: normalize(100),
                  backgroundColor: "rgba(156, 75, 255, 1)",
                  shadowColor: "rgba(156, 75, 255, 1)",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                }}
              >
                <Image
                  // userImage
                  style={{
                    height: normalize(140),
                    width: normalize(140),
                    borderRadius: normalize(100),
                    borderColor: "rgba(156, 75, 255, 1)",
                    borderWidth: normalize(4),
                  }}
                  source={{
                    uri: user.profilePicture,
                  }}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(25),
                    fontWeight: "900",
                    letterSpacing: -1,
                  }}
                >
                  {user.followingCount}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(17),
                    fontWeight: "300",
                    letterSpacing: -0.68,
                  }}
                >
                  Following
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: normalize(18),
              }}
            >
              <FollowButton profileUserId={userId} />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: normalize(14),
              }}
            >
              <View
                style={{
                  width: normalize(271),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(20),
                    fontWeight: "700",
                  }}
                >
                  @{user.profileName}
                </Text>
              </View>
              <View
                style={{
                  width: normalize(300),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(20),
                    fontWeight: "300",
                  }}
                  numberOfLines={2}
                >
                  {user.profileDescription}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(0),
                marginBottom: normalize(0),
                alignItems: "center",
                // backgroundColor: "black"
              }}
            >
              {/* <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width * 0.75}
                layout={"default"}
              /> */}
              {/* <Carousel
                data={[0, 1, 2]}
                sliderWidth={width}
                firstItem={0}
                inactiveSlideOpacity={0.5} // Sets the opacity of inactive items to 60%
                itemWidth={normalize(270)} // Taking into account the horizontal margin
                activeSlideAlignment={"center"}
                removeClippedSubviews={false}
                renderItem={({ item: category }) => (
                  // <View
                  //   style={{
                  //     width: 100,
                  //     height: 100,
                  //     backgroundColor: "white",
                  //   }}
                  // />
                  <DomainOfTasteCard
                    isCurrentUser={false}
                    navigation={navigation}
                    category={category}
                    user={user}
                    toggleAddPlaylistModal={toggleAddPlaylistModal}
                    userId={userId}
                    isAddPlaylistModalVisible={isAddPlaylistModalVisible}
                  />
                )}
              /> */}
              {/* <Carousel
                data={domainsArray}
                width={width}
                height={normalize(500)}
                autoPlay={false}
                onSnapToItem={(index) => console.log("current index:", index)}
                renderItem={({ item: category }) => (
                  <View
                    style={{
                      width: normalize(270), // Adjusting item width
                      alignItems: "center", // Center aligning the content
                      marginLeft: (width - normalize(270)) / 2,
                    }}
                  >
                    <DomainOfTasteCard
                      isCurrentUser={false}
                      navigation={navigation}
                      category={category}
                      user={user}
                      toggleAddPlaylistModal={toggleAddPlaylistModal}
                      userId={userId}
                      isAddPlaylistModalVisible={isAddPlaylistModalVisible}
                    />
                  </View>
                )}
                pagingEnabled
                snapEnabled
              /> */}
              <Carousel
                width={width}
                height={height}
                data={domainsArray}
                scrollAnimationDuration={1000}
                autoPlayInterval={3000}
                renderItem={({ item: category }) => (
                  <View
                    style={{
                      marginLeft: (width - width * 0.9) / 2,
                    }}
                  >
                    <DomainOfTasteCard
                      isCurrentUser={false}
                      navigation={navigation}
                      category={category}
                      user={user}
                      toggleAddPlaylistModal={toggleAddPlaylistModal}
                      userId={userId}
                      isAddPlaylistModalVisible={isAddPlaylistModalVisible}
                    />
                  </View>
                )}
                mode="parallax"
                autoPlay
              />
              {/* <View
                style={{
                  height: 700,
                  width: 100,
                  backgroundColor: "white",
                }}
              /> */}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            position: "absolute",
            flexDirection: "row",
            alignSelf: "flex-end",
            bottom: Platform.OS === "android" ? normalize(70) : normalize(110),
            right: normalize(20),
            marginBottom: normalize(10),
            backgroundColor: "rgba(58, 17, 90, 1)",
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(15),
            borderRadius: normalize(15),
            borderColor: "rgba(156, 75, 255, 1)",
            borderWidth: normalize(4),
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 10,
          }}
          onPress={scrollToTop}
        >
          <Image
            style={{
              height: normalize(16),
              width: normalize(18),
            }}
            source={require("../assets/icons/DoubleUpArrowIcon.png")}
          />
        </TouchableOpacity>
        {isSettingsModalVisible && (
          <Settings
            visible={isSettingsModalVisible}
            onClose={toggleSettingsModal}
            // navigation={navigation}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
