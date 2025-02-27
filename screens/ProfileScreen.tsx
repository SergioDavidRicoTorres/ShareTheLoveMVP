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
import { useCallback, useEffect, useRef, useState } from "react";
// import Carousel from "react-native-snap-carousel";
import {
  getDomainOfTasteScoreIcon,
  getMoodContainerColor,
  getMoodTextColor,
  getDomainsOfTasteGradientsFirstColor,
  getButtonsAccentColor,
  getDomainsName,
} from "../utils";
import { DOMAINPOSTTYPE } from "../constants";
import { normalize } from "../utils";
import {
  Domain,
  ProfileContentNavigationProp,
  ProfileNavigationProp,
  ProfileScreenRouteProp,
  User,
} from "../types";
import { getUsersDomains, DEFAULT_USER } from "../utilsData";
import { FIREBASE_AUTH } from "../firebaseConfig";
import AddPlaylist from "../components/AddPostComponents/AddPlaylist";
import DomainOfTasteCard from "../components/DomainOfTasteCard";
import { fetchUserById } from "../utilsFirebase";
import { useCurrentUser } from "../CurrentUserContext";
import Carousel from "react-native-reanimated-carousel";
import { RefreshControl } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

export default function ProfileScreen() {
  const route = useRoute<ProfileScreenRouteProp>();
  // const selectedUserId = route.params?.selectedUserId;
  // const { selectedUserId } = route.params;
  // const [userId, setUserId] = useState<string>("")
  // const userId: string = selectedUserId !== undefined ?  selectedUserId : (FIREBASE_AUTH.currentUser?.uid || "defaultUserId");
  // const [user, setUser] = useState<User>(DEFAULT_USER); // State to store the user data
  const { currentUser, setCurrentUser } = useCurrentUser();
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
  const [domainsArray, setDomainsArray] = useState<Domain[]>([]);
  // const user: User = getUserDataById(userId);
  //   useEffect(() => {
  //     console.log(getUsersDomains(user));
  //     if (user) {
  //         setDomainsArray(getUsersDomains(user));
  //     }
  // }, [user]);
  const navigation = useNavigation();
  // const profileNavigation = useNavigation<ProfileNavigationProp>();
  // const profileContentNavigation = useNavigation<ProfileContentNavigationProp>();

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
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch user data
      // console.log("###################### USER #########################")
      // console.log(user);
      // const user: User | null = await fetchUserById(userId);
      if (currentUser !== null) {
        // setUser(user); // Set the user

        // Now get domains
        // console.log(":::::::::::::::::::: USER'S DOMAINS:::::::::::::::::")
        // console.log(getUsersDomains(user));
        setDomainsArray(getUsersDomains(currentUser));
      } else {
        setCurrentUser(DEFAULT_USER);
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Refresh function
  const pullRefresh = useCallback(async () => {
    setRefresh(true);
    await fetchData();
    setTimeout(() => {
      setRefresh(false);
    }, 5000);
  }, [route]);
  // useEffect(() => {
  //   const getUserDataById = async () => {
  //     try {
  //       const user: User | null = await fetchUserById(userId);
  //       if (user) {
  //         // User is found
  //         console.log(user);
  //         setUser(user);
  //       } else {
  //         // User is not found, throw an error
  //         throw new Error('User not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //       throw error; // Re-throw the error to be handled by the caller
  //     }
  //   };

  //   getUserDataById();

  // }, [userId]); // The useEffect hook will run when the userId changes

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [route]); // Depends on userId

  const domainWidth = width * 0.7; // Adjust item width to decrease spacing
  const domainSpacing = (width - domainWidth) / 2; // Calculate spacing to center items
  // Create a reference to the ScrollView
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Function to scroll to the top of the ScrollView
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  return (
    <LinearGradient
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={{
        ...styles.container,
        // paddingVertical: Platform.OS === "android" ? normalize(50) : 0,
      }}
      // style={styles.container}
    >
      <StatusBar
        backgroundColor="rgba(105, 51, 172, 1)"
        barStyle="light-content"
      />
      <SafeAreaView
        style={{
          ...styles.container,
          // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }} // External Container
      >
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullRefresh()}
          />
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                fontSize: normalize(30),
                fontWeight: "700",
              }}
            >
              {currentUser.name}
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
                  {currentUser.followersCount}
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
                    uri: currentUser.profilePicture,
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
                  {currentUser.followingCount}
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
              <TouchableOpacity
                style={{
                  paddingVertical: normalize(7),
                  paddingHorizontal: normalize(20),
                  borderRadius: normalize(15),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(156, 75, 255, 1)",
                  // borderColor: "rgba(58, 17, 90, 1)",
                  // borderWidth: normalize(5)
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(22),
                    fontWeight: "700",
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <View style={{ justifyContent: "center", left: normalize(11) }}>
                <TouchableOpacity
                  onPress={() => {
                    toggleSettingsModal();
                  }}
                  style={{ position: "absolute" }}
                >
                  <Image
                    source={require("../assets/icons/ProfileSettingsButton.png")}
                    style={{ width: normalize(40), height: normalize(35) }}
                  />
                </TouchableOpacity>
              </View>
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
                  @{currentUser.profileName}
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
                  {currentUser.profileDescription}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(0),
                marginBottom: normalize(0),
                justifyContent: "center",
              }}
            >
              {/* <Carousel
                data={domainsArray}
                sliderWidth={width}
                firstItem={0}
                inactiveSlideOpacity={0.5} // Sets the opacity of inactive items to 60%
                itemWidth={normalize(270)} // Taking into account the horizontal margin
                activeSlideAlignment={"center"}
                renderItem={({ item: category }) => (
                  <DomainOfTasteCard
                    isCurrentUser={true}
                    navigation={navigation}
                    category={category}
                    user={currentUser}
                    toggleAddPlaylistModal={toggleAddPlaylistModal}
                    userId={userId}
                    isAddPlaylistModalVisible={isAddPlaylistModalVisible}
                  ></DomainOfTasteCard>
                )}
              /> */}
              <Carousel
                width={width}
                height={height}
                data={domainsArray}
                renderItem={({ item: category }) => (
                  <View
                    style={{
                      marginLeft: (width - width * 0.9) / 2,
                    }}
                  >
                    <DomainOfTasteCard
                      isCurrentUser={true}
                      navigation={navigation}
                      category={category}
                      user={currentUser}
                      toggleAddPlaylistModal={toggleAddPlaylistModal}
                      userId={userId}
                      isAddPlaylistModalVisible={isAddPlaylistModalVisible}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </View>
                )}
                mode="parallax"
                style={{
                  paddingHorizontal: domainSpacing,
                }} // Center the items
              />
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
            // marginBottom: normalize(10),
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
