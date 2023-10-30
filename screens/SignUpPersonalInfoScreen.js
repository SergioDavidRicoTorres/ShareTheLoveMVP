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
import { TextInput } from "react-native-gesture-handler";
import {
  getAuthorizationCode,
  getTokens,
} from "../components/AuthorizationSpotify";

const { width } = Dimensions.get("window"); // Window Dimensions
const normalize = (value) => width * (value / 390);
// modalHeaderContainer
const modalHeaderContainerGap = width * 0.051;
const modalHeaderContainerMarginTop = width * 0.026;

export default function SignUpPersonalInfo({ navigation }) {
  // const navigation = useNavigation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [generalDescription, setGeneralDescription] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();

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
              // navigation.navigate("AuthScreen");
              navigation.goBack();
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
              backgroundColor: "rgba(58, 17, 90, 1)",
            }}
          >
            <View
              style={{
                width: normalize(123),
                height: normalize(11),
                borderRadius: normalize(5),
                backgroundColor: "rgba(156, 75, 255, 1)",
              }}
            ></View>
          </View>
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
            marginTop: normalize(37),
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: normalize(30),
              fontWeight: 700,
              //   letterSpacing: -1.2,
            }}
          >
            About you
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: 400,
              left: normalize(7),
              marginTop: normalize(10),
            }}
          >
            Name
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
              value={name}
              onChangeText={(text) => {
                setName(text);
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
              placeholder={`Write your name...`}
            />
          </View>
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: 400,
              left: normalize(7),
              marginTop: normalize(10),
            }}
          >
            Username
          </Text>
          <View
            style={{
              //   width: normalize(332),
              height: normalize(44),
              borderRadius: normalize(15),
              backgroundColor: "rgba(162, 148, 255, 0.7)",
              marginTop: normalize(13),
              justifyContent: "center",
              flexDirection: "row",
              gap: normalize(2),
            }}
          >
            <Text
              style={{
                color: "white",
                marginLeft: normalize(15),
                fontSize: normalize(20),
                top: normalize(9),
                fontWeight: 600,
              }}
            >
              @
            </Text>
            <TextInput
              // searchInput
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
              // onSubmitEditing={(text) => {
              //   setUsername(text);
              // }}
              returnKeyType="done"
              style={{
                color: "white",
                marginRight: normalize(15),
                width: normalize(273),
                fontSize: normalize(20),
              }}
              placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              placeholder={`Write your Username...`}
            />
          </View>
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: 400,
              left: normalize(7),
              marginTop: normalize(10),
            }}
          >
            Date of birth
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: normalize(13),
              gap: normalize(24),
              alignSelf: "flex-start",
            }}
          >
            <View
              style={{
                width: normalize(82),
                height: normalize(44),
                borderRadius: normalize(15),
                backgroundColor: "rgba(162, 148, 255, 0.7)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                // searchInput
                value={dayOfBirth}
                onChangeText={(text) => {
                  setDayOfBirth(text);
                }}
                // onSubmitEditing={(text) => {
                //   setDayOfBirth(text);
                // }}
                returnKeyType="done"
                style={{
                  color: "white",
                  marginHorizontal: normalize(5),
                  fontSize: normalize(20),
                }}
                placeholder={`Day`}
                placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              />
            </View>
            <View
              style={{
                width: normalize(82),
                height: normalize(44),
                borderRadius: normalize(15),
                backgroundColor: "rgba(162, 148, 255, 0.7)",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 5,
              }}
            >
              <TextInput
                // searchInput
                value={monthOfBirth}
                onChangeText={(text) => {
                  setMonthOfBirth(text);
                }}
                // onSubmitEditing={(text) => {
                //   setMonthOfBirth(text);
                // }}
                returnKeyType="done"
                style={{
                  color: "white",
                  marginHorizontal: normalize(5),
                  fontSize: normalize(20),
                }}
                placeholder={`Month`}
                placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              />
            </View>
            <View
              style={{
                width: normalize(82),
                height: normalize(44),
                borderRadius: normalize(15),
                backgroundColor: "rgba(162, 148, 255, 0.7)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                // searchInput
                value={yearOfBirth}
                onChangeText={(text) => {
                  setYearOfBirth(text);
                }}
                // onSubmitEditing={(text) => {
                //   setYearOfBirth(text);
                // }}
                returnKeyType="done"
                style={{
                  color: "white",
                  marginHorizontal: normalize(5),
                  fontSize: normalize(20),
                }}
                placeholder={`Year`}
                placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              />
            </View>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: 400,
              left: normalize(7),
              marginTop: normalize(10),
            }}
          >
            General Description
          </Text>
          <View
            style={{
              width: normalize(332),
              height: normalize(152),
              borderRadius: normalize(15),
              backgroundColor: "rgba(162, 148, 255, 0.7)",
              marginTop: normalize(13),
              justifyContent: "center",
            }}
          >
            <TextInput
              value={generalDescription}
              onChangeText={(text) => {
                setGeneralDescription(text);
              }}
              // onSubmitEditing={(text) => {
              //   setGeneralDescription(text);
              // }}
              returnKeyType="done"
              style={{
                color: "white",
                marginHorizontal: normalize(5),
                fontSize: normalize(20),
                // width: normalize(300),
                height: normalize(130),
                // marginVertical: normalize(10),
                marginHorizontal: normalize(10),
                // backgroundColor: "black",
              }}
              multiline
              placeholder={`Description about your Taste Profile`}
              placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              textAlignVertical="top"
              blurOnSubmit
              //   numberOfLines={5}
            />
          </View>
        </View>
        {name !== "" &&
        username !== "" &&
        dateOfBirth !== "" &&
        monthOfBirth !== "" &&
        yearOfBirth !== "" &&
        generalDescription !== "" ? (
          <TouchableOpacity
            onPress={() => {
              getTokens()
                .then(() => {
                  navigation.navigate("SignUpEndScreen");
                })
                .catch((error) => {
                  console.error("Error during authorization:", error);
                });
            }}
            style={{
              paddingHorizontal: normalize(15),
              paddingVertical: normalize(5),
              justifyContent: "center",
              alignItems: "center",
              gap: normalize(10),
              borderRadius: normalize(20),
              backgroundColor: "rgba(29, 185, 84, 1)",
              flexDirection: "row",
              marginTop: normalize(90),
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
                fontWeight: 800,
                // letterSpacing: -1,
              }}
            >
              Link with Spotify
            </Text>
          </TouchableOpacity>
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
                fontWeight: 800,
                // letterSpacing: -1,
              }}
            >
              Link with Spotify
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
