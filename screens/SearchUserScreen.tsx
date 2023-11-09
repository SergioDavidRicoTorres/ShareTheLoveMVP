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
import sampleUsers from "../DummyData/sampleUsers.json";
import { normalize } from "../utils";
import { Profile } from "../types";


export default function SearchUser() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState <Profile[]> ([]);

  const handleSearch = (text: string) => {
    setSearchInput(text);

    const filteredData: Profile[] = sampleUsers.filter((item) =>
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
                      source={{ uri: item.profilePicture }}
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
                          fontWeight: "400",
                        }}
                      >
                        {item.profileName}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: normalize(17),
                          fontWeight: "300",
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
    width: normalize(14),
    height: normalize(23),
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: normalize(16),
    height: normalize(31),
    borderRadius: normalize(20),
    paddingHorizontal: normalize(10),
    marginTop: normalize(20),
  },
  searchIcon: {
    width: normalize(20),
    height: normalize(20),
    top: normalize(5),
    marginRight: normalize(5),
  },
  searchInput: {
    color: "white",
    marginRight: normalize(25),
    width: normalize(273),
    fontSize: normalize(17),
  },
});
