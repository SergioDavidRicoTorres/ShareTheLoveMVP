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
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { getCurrentUserData } from "../UserData";
import sampleUsers from "../DummyData/sampleUsers.json";

const { width } = Dimensions.get("window"); // screen width constant

const user = getCurrentUserData();
const normalize = (value) => width * (value / 390);

// moodText
const moodTextFontSize = width * 0.046;
// backButtonImage
const backButtonImageWidth = width * 0.036;
const backButtonImageHeight = width * 0.059;
// searchContainer
const searchContainerWidth = width * 0.865;
const searchContainerHeight = width * 0.079;
const searchContainerBorderRadius = width * 0.051;
const searchContainerPaddingHorizontal = width * 0.026;
const searchContainermarginTop = width * 0.03;
// searchIcon
const searchIconWidth = width * 0.05;
const searchIconheight = width * 0.05;
const searchIconTop = width * 0.013;
const searchIconMarginRight = width * 0.013;
// searchInput
const searchInputMarginRight = width * 0.064;
const searchInputWidth = width * 0.7;
const searchInputFontSize = width * 0.044;

export default function SearchUser() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchInput(text);

    const filteredData = sampleUsers.filter((item) =>
      item.profileName.toLowerCase().includes(text.toLowerCase())
    );

    setSearchResults(filteredData);
  };

  return (
    <LinearGradient
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            // paddingVertical: 20,
            // paddingHorizontal: 30,
            // backgroundColor: "white",
            width: normalize(327),
            height: normalize(640),
            backgroundColor: "rgba(58, 17, 90, 1)",
            borderRadius: normalize(15),
            shadowColor: "rgba(241, 159, 0, 1)",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: normalize(10),
            bottom: normalize(30),
          }}
        >
          <LinearGradient
            colors={["rgba(105, 51, 172, 0)", "rgba(241, 159, 0, 0.5)"]} // Specify the colors for the gradient
            style={{
              width: normalize(327),
              height: normalize(640),
              borderRadius: 15,
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
              style={{
                ...styles.searchContainer,
                backgroundColor: "rgba(116, 38, 176, 0.90);",
              }}
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
              />
            </View>
            <View style={{ alignItems: "center", marginTop: normalize(18) }}>
              <FlatList
                data={searchResults}
                style={{ marginBottom: 10 }}
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
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      width: normalize(276),
                      height: normalize(50),
                      flexDirection: "row",
                      // backgroundColor: "white",
                    }}
                  >
                    <Image
                      style={{
                        width: normalize(50),
                        height: normalize(50),
                        borderRadius: normalize(100),
                      }}
                      source={{ uri: item.image }}
                    />
                    <View
                      style={{
                        justifyContent: "center",
                        marginHorizontal: normalize(10),
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: normalize(19),
                          fontWeight: 400,
                        }}
                      >
                        {item.profileName}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: normalize(17),
                          fontWeight: 300,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
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
    justifyContent: "center",
  },

  backButtonImage: {
    width: backButtonImageWidth,
    height: backButtonImageHeight,
  },
  searchContainer: {
    flexDirection: "row",
    // width: searchContainerWidth,
    marginHorizontal: normalize(16),
    height: searchContainerHeight,
    borderRadius: searchContainerBorderRadius,
    // backgroundColor: "rgba(20, 169, 115, 0.75)",
    paddingHorizontal: searchContainerPaddingHorizontal,
    marginTop: normalize(20),
  },
  searchIcon: {
    width: searchIconWidth,
    height: searchIconheight,
    top: searchIconTop,
    marginRight: searchIconMarginRight,
  },
  searchInput: {
    color: "white",
    marginRight: searchInputMarginRight,
    width: searchInputWidth,
    fontSize: searchInputFontSize,
  },
});
