import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AddPlaylistScreenRouteProp,
  Mood,
  Playlist,
  ProfileNavigationProp,
} from "../types";
import { useEffect, useState } from "react";
// import { getAllMoodsAndTagsArray } from "../utilsData";
import { addPlaylistToDB, pickImage, uploadImage } from "../utilsFirebase";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { getCarouselNumColumns, normalize } from "../utils";
import AddMood from "../components/AddPostComponents/AddMood";
import AddPlaylist from "../components/AddPostComponents/AddPlaylist";
// import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window"); // screen width constant

export default function AddPlaylistScreen() {
  const route = useRoute<AddPlaylistScreenRouteProp>();
  const navigation = useNavigation<ProfileNavigationProp>();
  const { domainId } = route.params;

  return (
    <LinearGradient
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={{
        ...styles.container,
        // paddingTop: Platform.OS === "android" ? normalize(50) : 0,
      }}
    >
      <StatusBar
        backgroundColor="rgba(105, 51, 172, 1)"
        barStyle="light-content"
      />
      <SafeAreaView
        style={{
          ...styles.container,
          marginTop: Platform.OS === "android" ? normalize(10) : 0,
        }} // External Container
      >
        <AddPlaylist
          visible={true}
          onClose={navigation.goBack}
          onCloseAll={navigation.goBack}
          hasNewPost={false}
          domainId={domainId}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundGradient: {
    borderRadius: normalize(10),
    marginBottom: -normalize(22),
    width: normalize(360),
    height: normalize(756),
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
  },
  chooseButtonContainer: {
    position: "absolute",
    paddingHorizontal: normalize(20),
    height: normalize(40),
    borderRadius: normalize(15),
    bottom: normalize(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(152, 152, 152, 1)",
    marginBottom: normalize(60),
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
    marginBottom: normalize(60),
  },
  chooseButtonText: {
    fontWeight: "700",
    fontSize: normalize(18),
    lineHeight: normalize(21),
    color: "white",
  },
});
