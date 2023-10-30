import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window"); // Window Dimensions
const normalize = (value) => width * (value / 390);
// modalHeaderContainer
const modalHeaderContainerGap = width * 0.051;
const modalHeaderContainerMarginTop = width * 0.026;

export default function SignUpEnd({ navigation }) {
  // const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(true);
  const [musicIsSelected, setMusicIsSelected] = useState(false);
  const [filmsTVShowsIsSelected, setFilmsTVShowsIsSelected] = useState(false);
  const [podcastsEpisodesIsSelected, setPodcastsEpisodesIsSelected] =
    useState(false);
  const [profileIsReady, setProfileIsReady] = useState(false);
  // Optional Modal Boolean State
  const [isSignUpOptionsModalVisible, setIsSignUpOptionsModalVisible] =
    useState(false);
  // Optional Modal show Function
  const toggleSignUpOptionsModal = () => {
    setIsSignUpOptionsModalVisible(!isSignUpOptionsModalVisible);
  };
  return (
    <LinearGradient // Background Color
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]}
      style={styles.container}
    >
      <SafeAreaView
        style={styles.container} // External Container
      >
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: modalHeaderContainerGap,
            marginTop: modalHeaderContainerMarginTop,
          }}
        >
          <TouchableOpacity
            // backButtonContainer
            onPress={() => {
              navigation.navigate("SignUpPersonalInfoScreen");
            }}
          >
            {/* Back Button Image */}
            <Image
              source={require("../assets/icons/ArrowBackLightPurple.png")}
              style={{ width: normalize(17), height: normalize(32) }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: normalize(246),
              height: normalize(11),
              borderRadius: normalize(5),
              backgroundColor: "rgba(156, 75, 255, 1)",
            }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AuthScreen");
            }}
          >
            <Text
              style={{
                color: "rgba(156, 75, 255, 1)",
                fontSize: normalize(22),
                fontWeight: 600,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: normalize(328),
            height: normalize(320),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: normalize(15),
            backgroundColor: "rgba(162, 148, 255, 0.70)",
            marginTop: normalize(24),
          }}
        >
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/AddImageIconPurple.png")}
              style={{
                width: normalize(76),
                height: normalize(76),
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(25),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: normalize(10),
            backgroundColor: "rgba(156, 75, 255, 1)",
            marginTop: normalize(20),
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: 500,
              letterSpacing: -1,
            }}
          >
            Choose Your Profile Picture
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontSize: normalize(25),
            fontWeight: 400,
            letterSpacing: -1,
            width: normalize(284),
            marginTop: normalize(30),
          }}
        >
          Choose Your Profile's Domains of Taste:
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: normalize(20),
            gap: normalize(40),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              return setMusicIsSelected(!musicIsSelected);
            }}
          >
            <View
              style={{
                width: normalize(80),
                height: normalize(80),
                borderRadius: normalize(20),
                backgroundColor: musicIsSelected
                  ? "rgba(2, 193, 134, 1)"
                  : "rgba(162, 148, 255, 0.7)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/icons/MusicIcon.png")}
                style={{ width: normalize(40), height: normalize(40) }}
              ></Image>
            </View>
            <Text
              style={{
                color: musicIsSelected
                  ? "rgba(2, 193, 134, 1)"
                  : "rgba(162, 148, 255, 1)",
                textAlign: "center",
                fontSize: normalize(20),
                fontWeight: 400,
                letterSpacing: -0.8,
                width: normalize(80),
              }}
            >
              Music
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              return setFilmsTVShowsIsSelected(!filmsTVShowsIsSelected);
            }}
          >
            <View
              style={{
                width: normalize(80),
                height: normalize(80),
                borderRadius: normalize(20),
                backgroundColor: filmsTVShowsIsSelected
                  ? "rgba(189, 2, 203, 1)"
                  : "rgba(162, 148, 255, 0.7)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/icons/FilmsTVShowsIcon.png")}
                style={{ width: normalize(38.4), height: normalize(43.2) }}
              ></Image>
            </View>
            <Text
              style={{
                color: filmsTVShowsIsSelected
                  ? "rgba(189, 2, 203, 1)"
                  : "rgba(162, 148, 255, 1)",
                textAlign: "center",
                fontSize: normalize(18),
                fontWeight: 400,
                letterSpacing: -0.8,
                width: normalize(80),
              }}
            >
              Films and TV Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              return setPodcastsEpisodesIsSelected(!podcastsEpisodesIsSelected);
            }}
          >
            <View
              style={{
                width: normalize(80),
                height: normalize(80),
                borderRadius: normalize(20),
                backgroundColor: podcastsEpisodesIsSelected
                  ? "rgba(85, 161, 67, 1)"
                  : "rgba(162, 148, 255, 0.7)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/icons/PodcastsEpisodesIcon.png")}
                style={{ width: normalize(52.8), height: normalize(58.05) }}
              ></Image>
            </View>
            <Text
              style={{
                color: podcastsEpisodesIsSelected
                  ? "rgba(85, 161, 67, 1)"
                  : "rgba(162, 148, 255, 1)",
                textAlign: "center",
                fontSize: normalize(20),
                fontWeight: 400,
                letterSpacing: -0.8,
                width: normalize(80),
              }}
            >
              Poscasts Episodes
            </Text>
          </TouchableOpacity>
        </View>

        {profileImage &&
        (musicIsSelected ||
          filmsTVShowsIsSelected ||
          podcastsEpisodesIsSelected) ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Tabs");
            }}
            style={{
              paddingVertical: normalize(10),
              paddingHorizontal: normalize(25),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: normalize(10),
              backgroundColor: "rgba(156, 75, 255, 1)",
              marginTop: normalize(20),
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: normalize(20),
                fontWeight: 800,
              }}
            >
              ready to go!
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              paddingVertical: normalize(10),
              paddingHorizontal: normalize(25),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: normalize(10),
              backgroundColor: "rgba(203, 203, 203, 0.5)",
              marginTop: normalize(20),
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: normalize(20),
                fontWeight: 800,
              }}
            >
              ready to go!
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "blue",
  },
});
