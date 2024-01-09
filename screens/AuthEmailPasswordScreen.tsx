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
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
// import { useRoute } from "@react-navigation/native";
import { normalize } from "../utils";
import {
  AuthEmailPasswordScreenRouteProp,
  AuthNavigationProp,
  MainNavigationProp,
} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authenticateSpotify } from "../AuthorizationSpotify";
import { SpotifyAuthComponent } from "../SpotifyAuthComponent";
// import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { sharedStyles } from "../sharedStyles";
// import {firebaseApp} from "../App";

// import { firebaseApp } from "../App"; // Ensure the path matches your file structure

//---------- REACT NATIVE FIREBASE ----------------------
// import authModule from '@react-native-firebase/auth';
// const auth = authModule();
//---------- REACT NATIVE FIREBASE ----------------------

// const auth = getAuth(firebaseApp);

// // Example: Sign in with email/password
// const signInWithEmailAndPassword = async (email, password) => {
//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(
//       email,
//       password
//     );
//     const user = userCredential.user;
//     console.log("Signed in as:", user.email);
//   } catch (error) {
//     console.error("Error signing in:", error);
//   }
// };
// const firebaseApp = initializeApp(firebaseConfig);

// const auth = getAuth(firebaseApp);
// Example: Sign up with email and password

const signInEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = userCredential.user;

    // User is successfully signed in
    // ...
    console.log("User has succesfully signed is!!: ");
    console.log(
      "[user.displayName]: ",
      user.displayName,
      ", [user.uid]: ",
      user.uid
    );

    AsyncStorage.setItem("uid", user.uid);
    return true;
  } catch (error: any) {
    console.log("ERROR at signInEmailAndPassword!");
    console.error("Error.code: ", error.code);
    console.error("Error.message: ", error.message);
    return false;
  }
};

const signUpEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = userCredential.user;

    // User is successfully signed up
    // ...
    console.log("User is succesfully signed up!!: ");
    console.log(
      "[user.displayName]: ",
      user.displayName,
      ", [user.uid]: ",
      user.uid
    );
    AsyncStorage.setItem("uid", user.uid);
    return true;
  } catch (error: any) {
    console.log("ERROR at signUpEmailAndPassword!");
    console.error("Error.code: ", error.code);
    console.error("Error.message: ", error.message);
    return false;
  }
};

// const { width } = Dimensions.get("window"); // Window Dimensions
//const normalize = (value) => width * (value / 390);
// modalHeaderContainer
// const modalHeaderContainerGap = width * 0.051;
// const modalHeaderContainerMarginTop = width * 0.026;

const AuthEmailPassword = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const mainNavigation = useNavigation<MainNavigationProp>();
  const route = useRoute<AuthEmailPasswordScreenRouteProp>();
  const { authType } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(true);
  const [isEmailPasswordAuthDone, setIsEmailPasswordAuthDone] = useState(false);
  const getAuthOrSpotifyButton = (
    isFirebaseAuthDone: boolean,
    hasEnteredRequiredInfo: boolean,
    authType: string
  ) => {
    if (isFirebaseAuthDone) {
      return (
        <View
          style={{
            position: "absolute",
            bottom: 0,
          }}
        >
          <SpotifyAuthComponent authType={authType} />
        </View>
      );
    } else if (hasEnteredRequiredInfo) {
      return (
        <TouchableOpacity
          onPress={handleButtonPress}
          style={{
            ...sharedStyles.touchableChooseButtonContainer,
            backgroundColor: "rgba(82, 42, 154, 1)",
            borderColor: "rgba(156, 75, 255, 1)",
            borderWidth: normalize(4),
            shadowColor: "rgba(156, 75, 255, 1)",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: normalize(20),
              fontWeight: "800",
              // letterSpacing: -1,
            }}
          >
            {authType}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={sharedStyles.chooseButtonContainer}>
          <Text style={sharedStyles.chooseButtonText}>{authType}</Text>
        </View>
      );
    }
  };

  // const [errorMessage, setErrorMessage] = useState(null);

  // const signUpEmailAndPassword = async (userEmail, userPassword) => {
  //   try {
  //     const userCredential = await auth.createUserWithEmailAndPassword(
  //       userEmail,
  //       userPassword
  //     );
  //     Alert.alert("Success", "User signed up successfully!");
  //   } catch (error) {
  //     console.error("Error during sign up:", error);
  //     Alert.alert("Sign Up Error", error.message);
  //   }
  // };

  // const signInWithEmailAndPassword = async (userEmail, userPassword) => {
  //   try {
  //     const userCredential = await auth.signInWithEmailAndPassword(
  //       userEmail,
  //       userPassword
  //     );
  //     Alert.alert("Success", "User signed in successfully!");
  //   } catch (error) {
  //     console.error("Error during sign in:", error);
  //     Alert.alert("Sign In Error", error.message);
  //   }
  // };

  const handleButtonPress = async () => {
    try {
      if (authType === "Sign Up") {
        const signUpSuccess = await signUpEmailAndPassword(email, password);
        if (signUpSuccess) {
          setIsEmailPasswordAuthDone(true);
        }
        // if (signUpSuccess) console.log(signUpSuccess)
        // navigation.navigate("SignUpPersonalInfoScreen");
      } else {
        const signInSuccess = await signInEmailAndPassword(email, password);
        if (signInSuccess) {
          setIsEmailPasswordAuthDone(true);
          // mainNavigation.navigate("Tabs");
        }
      }
      if (password.length < 6) {
        Alert.alert(
          "Invalid Password",
          "The entered password is too short, it has to be at least 6 characters long."
        );
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
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
            gap: normalize(266),
            marginTop: normalize(10),
          }}
        >
          <TouchableOpacity
            // backButtonContainer
            onPress={() => {
              navigation.navigate("AuthScreen");
            }}
          >
            {/* Back Button Image */}
            <Image
              source={require("../assets/icons/ArrowBackLightPurple.png")}
              style={{ width: normalize(17), height: normalize(32) }}
            />
          </TouchableOpacity>

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
        <Text
          style={{
            color: "white",
            fontSize: normalize(30),
            fontWeight: "700",
            marginTop: normalize(20),
          }}
        >
          {authType}
        </Text>
        <View
          style={{
            marginTop: normalize(20),
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: "400",
              left: normalize(7),
              marginTop: normalize(10),
            }}
          >
            Email
          </Text>
          <View
            style={{
              width: normalize(332),
              height: normalize(44),
              borderRadius: normalize(15),
              backgroundColor: "rgba(162, 148, 255, 0.7)",
              marginTop: normalize(13),
              justifyContent: "center",
            }}
          >
            <TextInput
              // searchInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              // onSubmitEditing={(text) => {
              //   setName(text);
              // }}
              returnKeyType="done"
              style={{
                color: "white",
                marginHorizontal: normalize(15),
                // wisdth: normalize(273),
                fontSize: normalize(20),
              }}
              placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              placeholder={`Write your Email...`}
            />
          </View>
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: "400",
              left: normalize(7),
              marginTop: normalize(10),
            }}
          >
            Password
          </Text>
          <View
            style={{
              // marginHorizontal: normalize(30),
              width: normalize(334),
              gap: normalize(13),
              flexDirection: "row",
              alignItems: "center",
              marginTop: normalize(13),
            }}
          >
            <View
              style={{
                width: normalize(281),
                height: normalize(44),
                borderRadius: normalize(15),
                backgroundColor: "rgba(162, 148, 255, 0.7)",
                justifyContent: "center",
                // flexDirection: "row",
                // gap: normalize(2),
              }}
            >
              <TextInput
                // searchInput
                value={password}
                secureTextEntry={passwordIsVisible}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                // onSubmitEditing={(text) => {
                //   setPassword(text);
                // }}
                returnKeyType="done"
                style={{
                  color: "white",
                  marginRight: normalize(15),
                  // width: normalize(273),
                  marginLeft: normalize(15),
                  fontSize: normalize(20),
                }}
                placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
                placeholder={`Write your Password...`}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setPasswordIsVisible(!passwordIsVisible);
              }}
              style={{
                width: normalize(40),
                height: normalize(40),
                backgroundColor: "rgba(156, 75, 255, 1)",
                borderRadius: normalize(15),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: normalize(25),
                  height: normalize(17),
                }}
                source={require("../assets/icons/VisibilityIcon.png")}
              />
            </TouchableOpacity>
          </View>
          {authType === "Sign Up" && (
            <Text
              style={{
                color: "rgba(177, 114, 254, 1)",
                textAlign: "center",
                fontSize: normalize(15),
                fontWeight: "700",
                marginTop: normalize(8),
                alignSelf: "flex-start",
                left: normalize(20),
              }}
            >
              *at least 6 characters long
            </Text>
          )}
        </View>
        {getAuthOrSpotifyButton(
          isEmailPasswordAuthDone,
          email !== "" && password !== "",
          authType
        )}
        {/* {email !== "" && password !== "" ? (
          <>
            <TouchableOpacity
              onPress={handleButtonPress}
              style={{
                paddingHorizontal: normalize(25),
                paddingVertical: normalize(8),
                justifyContent: "center",
                alignItems: "center",
                gap: normalize(10),
                borderRadius: normalize(15),
                backgroundColor: "rgba(156, 75, 255, 1)",
                flexDirection: "row",
                marginTop: normalize(395),
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(20),
                  fontWeight: "800",
                  // letterSpacing: -1,
                }}
              >
                Verify my email
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              paddingHorizontal: normalize(25),
              paddingVertical: normalize(8),
              justifyContent: "center",
              alignItems: "center",
              gap: normalize(10),
              borderRadius: normalize(15),
              backgroundColor: "rgba(203, 203, 203, 0.5)",
              flexDirection: "row",
              marginTop: normalize(395),
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: normalize(20),
                fontWeight: "800",
                // letterSpacing: -1,
              }}
            >
              Verify my email
            </Text>
          </View>
        )} */}

        {/* <View
          style={{
            position: "absolute",
            bottom: 0,
          }}
        >
        {email !== "" && password !== "" ? (

            <SpotifyAuthComponent authType={authType} />
            ) : (
              <View
              style={{
                paddingHorizontal: normalize(15),
                paddingVertical: normalize(5),
                justifyContent: "center",
                alignItems: "center",
                gap: normalize(10),
                borderRadius: normalize(20),
                backgroundColor: "rgba(203, 203, 203, 0.5)",
                flexDirection: "row",
                marginTop: normalize(90),
                bottom: normalize(34)
              }}
              >
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../assets/icons/SpotifyIcon.png")}
              />
            <Text
              style={{
                color: "white",
                fontSize: normalize(20),
                fontWeight: "800",
                // letterSpacing: -1,
              }}
              >
              Link with Spotify
            </Text>
          </View>
        )}
        </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default AuthEmailPassword;
