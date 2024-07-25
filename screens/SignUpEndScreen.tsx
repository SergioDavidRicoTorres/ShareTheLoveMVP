import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { normalize } from "../utils";
import {
  AuthNavigationProp,
  MainNavigationProp,
  SignUpEndScreenRouteProp,
  User,
} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

import { FIREBASE_STORAGE, FIRESTORE_DB } from "../firebaseConfig";
import { addUserToDB, pickImage, uploadImage } from "../utilsFirebase";
import { sharedStyles } from "../sharedStyles";
// import { StatusBar } from "expo-status-bar";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

export default function SignUpEnd() {
  const navigation = useNavigation<AuthNavigationProp>();
  const mainNavigation = useNavigation<MainNavigationProp>();
  const route = useRoute<SignUpEndScreenRouteProp>();
  const { name, profileName, dateOfBirth, generalDescription } = route.params;
  const [SignedUpUID, setSignedUpUID] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState("");
  const [musicIsSelected, setMusicIsSelected] = useState(false);
  const [filmsTVShowsIsSelected, setFilmsTVShowsIsSelected] = useState(false);
  const [podcastsEpisodesIsSelected, setPodcastsEpisodesIsSelected] =
    useState(false);
  const [profileIsReady, setProfileIsReady] = useState(false);
  const [isSignUpOptionsModalVisible, setIsSignUpOptionsModalVisible] =
    useState(false);
  const [hasSelectedImage, setHasSelectedImage] = useState(false);

  // useEffect (() => {
  //   loadImage();
  // }, [])

  // const toggleSignUpOptionsModal = () => {
  //   setIsSignUpOptionsModalVisible(!isSignUpOptionsModalVisible);
  // };

  // const selectImage = async (useLibrary: boolean) => {
  //   let result;
  //   const options: ImagePicker.ImagePickerOptions = {
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 0.75,
  //   };

  //   if (useLibrary) {
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     result = await ImagePicker.launchImageLibraryAsync(options);
  //   } else {
  //     await ImagePicker.requestCameraPermissionsAsync();
  //     result = await ImagePicker.launchCameraAsync(options);
  //   }

  //   if (!result.canceled) {
  //     // console.log(result.assets[0].uri);
  //     saveImage(result.assets[0].uri)
  //   }
  // };

  // const saveImage = async (uri: string) => {
  //   await ensureDirExists();
  //   const filename = new Date().getTime() + '.jpg';
  //   const dest = imgDir + filename;
  //   await FileSystem.copyAsync({ from: uri, to: dest});
  // }

  // const loadImage = async () => {
  //   await ensureDirExists();
  //   const files = await FileSystem.readDirectoryAsync(imgDir);
  //   if (files.length > 0) {
  //     const fullPath = imgDir + files[0];
  //     setSelectedImageUri(fullPath);
  //     setHasSelectedImage(true);
  //   }
  // };

  // const uploadImage = async (uri: string) => {
  //   try {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();

  //     const imageRef = ref(FIREBASE_STORAGE, `images/${new Date().getTime()}`); // Unique name for the image

  //     await uploadBytes(imageRef, blob);

  //     // Get download URL
  //     const downloadURL = await getDownloadURL(imageRef);

  //     console.log('Image uploaded successfully!');
  //     console.log('Download URL:', downloadURL);
  //     return downloadURL;
  //   } catch (error) {
  //     console.error('Error uploading image: ', error);
  //   }
  // };

  // const pickImage = async (setSelectedImageUri: (uri: string) => void) => {
  //   // Request permission
  //   try {

  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     alert('Permission to access camera roll is required!');
  //     return;
  //   }

  //   // Launch the image picker
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImageUri(result.assets[0].uri); // This is the local URI of the image
  //   }
  // } catch (error) {
  //   console.error('Error picking the image: ', error);
  // }
  // };

  // const addUserToDB = async (user: User, uid: string) => {
  //   try {
  //   console.log("ALL GOOD AT addUserToDB()!")
  //       // Add additional user data to Firestore
  //       const userDocRef = doc(FIRESTORE_DB, 'users', uid);
  //       await setDoc(userDocRef, user);

  //     } catch (error) {
  //       console.error('Error adding the user to the database: ', error);
  //     }
  // }

  // const handleImageUpload = async () => {
  //   const uri = selectedImageUri;
  //   if (uri) {
  //     await uploadImage(uri);
  //   }
  // };

  const handlePress = async () => {
    try {
      const uploadedImageUrl = await uploadImage(selectedImageUri);
      const signedUpUID = await AsyncStorage.getItem("uid");

      if (signedUpUID === null) {
        // Handle the case where signedUpUID is null
        console.error("No UID found");
        return; // Exit the function or handle this case appropriately
      }

      const userObject: User = {
        name: name,
        profileName: profileName,
        profilePicture: uploadedImageUrl,
        dateOfBirth: new Date(dateOfBirth),
        profileDescription: generalDescription,
        followersCount: 0,
        followingCount: 0,
        domainsOfTaste: {
          Music: {
            isActive: musicIsSelected,
            domainId: 0,
            score: 0,
            reviewsList: [],
          },
          FilmsTVShows: {
            isActive: filmsTVShowsIsSelected,
            domainId: 1,
            score: 0,
            reviewsList: [],
          },
          PodcastsEpisodes: {
            isActive: podcastsEpisodesIsSelected,
            domainId: 2,
            score: 0,
            reviewsList: [],
          },
        },
        followersUsersList: [],
        followingUsersList: [],
      };
      console.log("WE'RE GETTING HERE");
      await addUserToDB(userObject, signedUpUID);
      // console.log("[USER]: ", userObject);
      Alert.alert(
        "Awesome! You've successfully signed up. Get started by checking out your profile."
      );
      // mainNavigation.navigate("Tabs");
    } catch (error) {
      Alert.alert(
        "Oops! We couldn't add the new user. Please try again.",
        String(error)
      );
    }
  };
  return (
    <LinearGradient // Background Color
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]}
      style={{
        ...styles.container,
        // paddingVertical: Platform.OS === "android" ? normalize(50) : 0,
      }}
    >
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView
        style={{
          ...styles.container,
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: normalize(20),
            marginTop: normalize(10),
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
                fontWeight: "600",
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
          {selectedImageUri ? (
            <Image
              source={{ uri: selectedImageUri }}
              style={{
                width: normalize(328),
                height: normalize(320),
                borderRadius: normalize(15),
                borderWidth: normalize(8),
                borderColor: "rgba(156, 75, 255, 1)",
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                pickImage(setSelectedImageUri);
              }}
            >
              <Image
                source={require("../assets/icons/AddImageIconPurple.png")}
                style={{
                  width: normalize(76),
                  height: normalize(76),
                }}
              />
            </TouchableOpacity>
          )}
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
          onPress={() => pickImage(setSelectedImageUri)}
        >
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: "500",
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
            fontWeight: "400",
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
                fontWeight: "400",
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
                fontWeight: "400",
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
                fontWeight: "400",
                letterSpacing: -0.8,
                width: normalize(80),
              }}
            >
              Poscasts Episodes
            </Text>
          </TouchableOpacity>
        </View>

        {selectedImageUri &&
        (musicIsSelected ||
          filmsTVShowsIsSelected ||
          podcastsEpisodesIsSelected) ? (
          <TouchableOpacity
            onPress={() => {
              handlePress();
              // mainNavigation.navigate("Tabs");
            }}
            style={{
              ...sharedStyles.touchableChooseButtonContainer,
              backgroundColor: "rgba(82, 42, 154, 1)",
              borderColor: "rgba(156, 75, 255, 1)",
              borderWidth: normalize(4),
              shadowColor: "rgba(156, 75, 255, 1)",
              bottom: normalize(40),
              // bottom: Platform.OS == "android" ? normalize(20) : normalize(40),
            }}
          >
            <Text style={sharedStyles.chooseButtonText}>ready to go!</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...sharedStyles.chooseButtonContainer,
              bottom: normalize(40),
              // bottom: Platform.OS == "android" ? normalize(20) : normalize(40),
            }}
          >
            <Text style={sharedStyles.chooseButtonText}>ready to go!</Text>
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
    justifyContent: "flex-start",
  },
});
