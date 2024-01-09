import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { normalize } from "../utils";
import {
  AuthNavigationProp,
  MainNavigationProp,
  ProfileNavigationProp,
  SettingsProps,
} from "../types";
import { useNavigation } from "@react-navigation/native";
import { useSpotifyAuth } from "../SpotifyAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleFirebaseSignOut } from "../utilsFirebase";

const { width, height } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

export default function Settings({ visible, onClose }: SettingsProps) {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { isSpotifyAuthenticated, setIsSpotifyAuthenticated } =
    useSpotifyAuth();

  const onSignOutPress = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("expirationDate");
    setIsSpotifyAuthenticated(false);
    console.log("isSpotifyAuthenticated is now: ", isSpotifyAuthenticated);
    await handleFirebaseSignOut();
  };

  return (
    <View>
      <Modal
        visible={visible}
        animationType="slide"
        // animationIn={"slideInRight"}
        // animationOut={"slideOutRight"}
        transparent
      >
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              alignItems: "center",
              // width: normalize(331),
              // height: normalize(500),
              backgroundColor: "rgba(22, 0, 39, 1)",
              paddingTop: normalize(50),
              paddingHorizontal: normalize(10),
              paddingBottom: normalize(40),
              borderRadius: normalize(20),
              bottom: 0,
              borderWidth: normalize(4),
              borderColor: "rgba(156, 75, 255, 1)",
            }}
          >
            <TouchableOpacity
              // backButtonContainer
              style={{
                //   alignItems: "center",
                //   top: normalize(25),
                position: "absolute",
                right: normalize(16),
                top: normalize(10),
                //   backgroundColor: "white",
              }}
              onPress={onClose}
            >
              {/* Back Button Image */}
              <Image
                source={require("../assets/icons/CancelButtonLightPurple.png")}
                style={{
                  //   top: normalize(9),
                  // position: "absolute",
                  width: normalize(30),
                  height: normalize(30),
                  //   right: normalize(9),
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: "rgba(156, 75, 255, 1)",
                textAlign: "center",
                fontSize: normalize(30),
                fontWeight: "700",
              }}
            >
              Settings
            </Text>
            <View
              style={{
                marginTop: normalize(30),
                width: normalize(331),
              }}
            >
              <Text
                style={{
                  color: "rgba(156, 75, 255, 0.8)",
                  //   textAlign: "center",
                  fontSize: normalize(25),
                  fontWeight: "700",
                  marginHorizontal: normalize(25),
                }}
              >
                Account Settings
              </Text>
            </View>
            <View
              style={{
                marginTop: normalize(20),
                width: normalize(320),
                paddingHorizontal: normalize(27),
                paddingVertical: normalize(15),
                justifyContent: "center",
                alignItems: "flex-start",
                gap: normalize(15),
                borderRadius: normalize(15),
                backgroundColor: "rgba(156, 75, 255, 0.5)",
              }}
            >
              <TouchableOpacity onPress={onSignOutPress}>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(20),
                    fontWeight: "600",
                  }}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: normalize(266),
                  // marginHorizontal: normalize(27),
                  height: normalize(1),
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                  alignSelf: "center",
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
