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
  } from "react-native";
  
  import { LinearGradient } from "expo-linear-gradient";
  import { useNavigation, useRoute } from "@react-navigation/native";
  // import { getCurrentUserData } from "../UserData";
  import Settings from "../components/Settings";
  import { useEffect, useState } from "react";
  import Carousel from "react-native-snap-carousel";

  import { normalize } from "../utils";
  import { Domain, ExternalProfileScreenRouteProp, ProfileNavigationProp, ProfileScreenRouteProp, User } from "../types";
  import { getUsersDomains, DEFAULT_USER } from "../utilsData";
  import { FIREBASE_AUTH } from "../firebaseConfig";
  import AddPlaylist from "../components/AddPostComponents/AddPlaylist";
  import DomainOfTasteCard from "../components/DomainOfTasteCard";
  import { fetchUserById } from "../utilsFirebase";
import FollowButton from "../components/FollowButton";
  
  
  const { width } = Dimensions.get("window"); // screen width constant
  // const normalize = (value) => width * (value / 390);
  
  
  export default function ExternalProfileScreen() {
    const route = useRoute<ExternalProfileScreenRouteProp>();
    const { user } = route.params;
    const userId: string = user.userId !== undefined ? user.userId : "Error: NO USER ID";
    const [domainsArray, setDomainsArray] = useState<Domain[]> ([]);
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

    const handlePress = () =>{
      setIsFollowing(!isFollowing)
    }
  
    useEffect(() => {
      const getUserDataAndDomains = async () => {
        try {
          if (user !== null) {
            setDomainsArray(getUsersDomains(user));
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      if (userId) {
        getUserDataAndDomains();
      }
    }, [route]); // Depends on userId
  
    return (
      <LinearGradient
        colors={[ "rgba(1, 4, 43, 1)", "rgba(69, 22, 129, 1)"]} // Specify the colors for the gradient
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                <FollowButton profileUserId={userId}></FollowButton>
                {/* <TouchableOpacity
                  style={{
                    shadowColor: "rgba(156, 75, 255, 1)",
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: isFollowing ? 0:1,
                    shadowRadius: 10,
                    borderRadius: normalize(15),
                    backgroundColor: "rgba(156, 75, 255, 1)",

                  }}
                  onPress={handlePress}
                >
                  {!isFollowing ? 
                  <LinearGradient
                    colors={[ "rgba(156, 75, 255, 1)", "rgba(95, 110, 231, 1)"]} // Specify the colors for the gradient
                    style={{
                      paddingVertical: normalize(2),
                      paddingHorizontal: normalize(30),
                      borderRadius: normalize(15),
                      justifyContent: "center",
                      alignItems: "center",
                      // backgroundColor: "rgba(156, 75, 255, 1)",
                      borderColor: "rgba(91, 46, 167, 1)",
                      borderWidth: normalize(5),
                    }}
                  >
                  <Text
                    style={{
                      color: "white",
                      fontSize: normalize(25),
                      fontWeight: "700",
                    }}
                    >
                    Follow
                  </Text>
                  </LinearGradient>
                  :
                <View
                  style={{
                    paddingVertical: normalize(2),
                    paddingHorizontal: normalize(30),
                    borderRadius: normalize(15),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(1, 4, 43, 1)",
                    borderColor: "rgba(91, 46, 167, 1)",
                    borderWidth: normalize(5),
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(186, 129, 255, 1)",
                      fontSize: normalize(25),
                      fontWeight: "700",
                    }}
                    >
                    Following
                  </Text>
                </View>
                }
                </TouchableOpacity> */}
                {/* <View style={{ justifyContent: "center", left: normalize(11) }}>
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
                </View> */}
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
                  marginTop: normalize(25),
                  marginBottom: normalize(150),
                  alignItems: "center",
                }}
                >
                <Carousel
                  data={domainsArray}
                  sliderWidth={width}
                  firstItem={1}
                  inactiveSlideOpacity={0.5} // Sets the opacity of inactive items to 60%
                  itemWidth={normalize(270)} // Taking into account the horizontal margin
                  activeSlideAlignment={"center"}
                  renderItem={({ item: category }) => (
                    <DomainOfTasteCard isCurrentUser = {false} navigation = {navigation} category = {category} user = {user} toggleAddPlaylistModal = {toggleAddPlaylistModal} userId = {userId} isAddPlaylistModalVisible = {isAddPlaylistModalVisible}></DomainOfTasteCard>
                  )}
                />
              </View>
            </View>
          </ScrollView>
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