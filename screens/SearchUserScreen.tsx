import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
// import sampleUsers from "../DummyData/sampleUsers.json";
import { normalize } from "../utils";
import { HomeNavigationProp, ProfileNavigationProp, User } from "../types";
import { getUsers } from "../utilsData";
import { fetchAllUsers } from "../utilsFirebase";
import { useCurrentUser } from "../CurrentUserContext";
// import { StatusBar } from "expo-status-bar";

export default function SearchUser() {
  // const USERS = getUsers();
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    // Handle the case where currentUser is null
    // This could be a loading indicator, a message, or a redirect
    return <div>Loading user data...</div>;
  }
  const { width } = Dimensions.get("window"); // screen width constant
  const homeNavigation = useNavigation<HomeNavigationProp>();
  // const profileNavigation = useNavigation<ProfileNavigationProp>();

  const [users, setUsers] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = (text: string) => {
    setSearchInput(text);

    const filteredData: User[] = users.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setSearchResults(filteredData);
  };

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      const fetchedPosts = await fetchAllUsers();
      setUsers(fetchedPosts);
    };

    fetchAndSetUsers();
  }, []);

  const handlePress = (user: User | undefined) => {
    if (user === undefined) {
      throw new Error("Error When Selecting User");
    }
    // if (mainNavigation !== undefined){
    homeNavigation.navigate("ExternalProfileScreen", { user });
    // }
  };

  return (
    <LinearGradient
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={{
        ...styles.container,
        // paddingTop: Platform.OS === "android" ? normalize(50) : 0,
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
        <View
          style={{
            // backgroundColor: "white",
            width,
            marginBottom: normalize(5),
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            // backButtonContainer
            onPress={() => homeNavigation.goBack()}
            style={{
              left: normalize(10),
            }}
          >
            {/* Back Button Image */}
            <Image
              source={require("../assets/icons/ArrowBackLightPurple.png")}
              style={{
                width: normalize(20),
                height: normalize(38),
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            // paddingVertical: 20,
            // paddingHorizontal: 30,
            // backgroundColor: "white",
            width: normalize(340),
            // height: Platform.OS === "android" ? width * 1.5 : normalize(630),
            backgroundColor: "rgba(58, 17, 90, 1)",
            borderRadius: normalize(15),
            shadowColor: "rgba(156, 75, 255, 1)",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: normalize(10),
            bottom: normalize(50),
            alignItems: "center",
            justifyContent: "center",
            marginTop: normalize(50),
            // marginBottom: normalize(20),
          }}
        >
          <LinearGradient
            colors={["rgba(105, 51, 172, 0)", "rgba(46, 27, 172, 1)"]} // Specify the colors for the gradient
            style={{
              width: normalize(340),
              // marginBottom: normalize(20),
              // height: normalize(650),
              height: Platform.OS === "android" ? width * 1.55 : normalize(630),

              borderRadius: normalize(15),
              borderColor: "rgba(156, 75, 255, 1)",
              borderWidth: normalize(5),
              //   shadowColor: "rgba(241, 159, 0, 1)",
              //   shadowOffset: {
              //     width: 0,
              //     height: 0,
              //   },
              //   shadowOpacity: 1,
              //   shadowRadius: normalize(8),
            }}
          >
            <View
              // searchContainer
              style={styles.searchContainer}
            >
              <Image
                // searchIcon
                style={styles.searchIcon}
                source={require("../assets/icons/SearchIcon.png")}
              />
              <TextInput
                // searchInput
                value={searchInput}
                onChangeText={(text) => {
                  if (searchInput !== "" && text == "") {
                    setSearchResults([]);
                  }
                  setSearchInput(text);
                }}
                onSubmitEditing={() => handleSearch(searchInput)}
                returnKeyType="done"
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor={"rgba(162, 148, 255, 1)"}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: normalize(18),
                paddingBottom: normalize(10),
              }}
            >
              <FlatList
                data={searchResults}
                style={{ marginBottom: normalize(10), height: normalize(510) }}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: normalize(260),
                      height: 1,
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      marginVertical: 15,
                      alignSelf: "center",
                    }}
                  />
                )}
                renderItem={({ item }) =>
                  currentUser.userId !== item.userId ? (
                    <TouchableOpacity
                      style={{
                        marginHorizontal: normalize(20),
                        paddingVertical: normalize(0),
                        flexDirection: "row",
                      }}
                      onPress={() => handlePress(item)}
                    >
                      <Image
                        style={{
                          width: normalize(60),
                          height: normalize(60),
                          borderRadius: normalize(100),
                          borderColor: "rgba(201, 157, 255, 1)",
                          borderWidth: normalize(3),
                        }}
                        source={{ uri: item.profilePicture }}
                      />
                      <View
                        style={{
                          justifyContent: "center",
                          marginLeft: normalize(10),
                          backgroundColor: "rgba(84, 42, 147, 1)",
                          paddingHorizontal: normalize(12),
                          width: normalize(220),
                          borderRadius: normalize(10),
                          borderColor: "rgba(201, 157, 255, 1)",
                          borderWidth: normalize(3),
                        }}
                      >
                        <Text
                          style={{
                            color: "rgba(201, 157, 255, 1)",
                            fontSize: normalize(19),
                            fontWeight: "700",
                          }}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontSize: normalize(17),
                            fontWeight: "300",
                          }}
                          numberOfLines={1}
                        >
                          @{item.profileName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        marginHorizontal: normalize(20),
                        paddingVertical: normalize(0),
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          width: normalize(60),
                          height: normalize(60),
                          borderRadius: normalize(100),
                          borderColor: "rgba(201, 157, 255, 0.2)",
                          borderWidth: normalize(3),
                          opacity: 0.5,
                        }}
                        source={{ uri: item.profilePicture }}
                      />
                      <View
                        style={{
                          justifyContent: "center",
                          marginLeft: normalize(10),
                          backgroundColor: "rgba(84, 42, 147, 0.2)",
                          paddingHorizontal: normalize(12),
                          width: normalize(220),
                          borderRadius: normalize(10),
                          borderColor: "rgba(201, 157, 255, 0.2)",
                          borderWidth: normalize(3),
                        }}
                      >
                        <Text
                          style={{
                            color: "rgba(201, 157, 255, 0.2)",
                            fontSize: normalize(19),
                            fontWeight: "700",
                          }}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: "rgba(255,255,255,0.2)",
                            fontSize: normalize(17),
                            fontWeight: "300",
                          }}
                          numberOfLines={1}
                        >
                          @{item.profileName}
                        </Text>
                      </View>
                    </View>
                  )
                }
              />
            </View>
          </LinearGradient>
        </View>
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
  backButtonImage: {
    width: normalize(14),
    height: normalize(23),
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: normalize(16),
    // height: normalize(31),
    borderRadius: normalize(20),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(2),
    marginTop: normalize(20),
    backgroundColor: "rgba(105, 51, 172, 1)",
    alignItems: "center",
    borderColor: "rgba(162, 148, 255, 0.7)",
    borderWidth: normalize(3),
  },
  searchIcon: {
    width: normalize(20),
    height: normalize(20),
    // top: normalize(5),
    marginRight: normalize(5),
  },
  searchInput: {
    color: "white",
    marginRight: normalize(25),
    width: normalize(273),
    fontSize: normalize(17),
  },
});
