import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window"); // screen width constant
import { normalize } from "../utils";
import { AuthOptionsProps } from "../types";

export default function AuthOptions({
  visible,
  onClose,
  navigation,
  authType,
}: AuthOptionsProps) {
  return (
    <View style={{ flex: 0.2 }}>
      <Modal visible={visible} animationType="slide" transparent>
        <View
          style={{
            position: "absolute",
            bottom: normalize(20),
            alignSelf: "center",
            alignItems: "center",
            width: normalize(363),
            height: normalize(578),
            backgroundColor: "rgba(22, 0, 39, 1)",
            borderRadius: normalize(20),
            paddingTop: normalize(15),
            paddingHorizontal: normalize(10),
          }}
        >
          <View
            // modalHeaderContainer
            style={{
              flexDirection: "row",
              alignItems: "center",
              top: normalize(9),
              position: "absolute",
              width: normalize(20),
              height: normalize(20),
              right: normalize(9),
            }}
          >
            {/* Back Button */}
            <TouchableOpacity
              // backButtonContainer
              onPress={onClose}
            >
              {/* Back Button Image */}
              <Image
                source={require("../assets/icons/CancelButtonLightPurple.png")}
                style={{
                  width: normalize(20),
                  height: normalize(20),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: normalize(31),
              borderRadius: normalize(10),
              borderColor: "rgba(29, 185, 84, 1)",
              borderWidth: normalize(8),
              marginTop: normalize(35),
              padding: normalize(10),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUpPersonalInfoScreen");
                onClose();
              }}
              style={{
                width: normalize(300),
                paddingVertical: normalize(10),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(156, 75, 255, 0.8)",
                borderRadius: normalize(10),
                flexDirection: "row",
                gap: normalize(24),
              }}
            >
              <Image
                style={{ width: normalize(36), height: normalize(36) }}
                source={require("../assets/icons/GoogleIcon.png")}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(25),
                  fontWeight: "500",
                  letterSpacing: -1,
                }}
              >
                {authType} with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AuthEmailPasswordScreen", {
                  authType: authType,
                });
                onClose();
              }}
              style={{
                width: normalize(300),
                paddingVertical: normalize(10),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(156, 75, 255, 0.8)",
                borderRadius: normalize(10),
                flexDirection: "row",
                gap: normalize(24),
              }}
            >
              <Image
                style={{ width: normalize(45), height: normalize(36) }}
                source={require("../assets/icons/EmailIcon.png")}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(25),
                  fontWeight: "500",
                  letterSpacing: -1,
                }}
              >
                {authType} with Email
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: normalize(300),
                paddingVertical: normalize(10),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(156, 75, 255, 0.8)",
                borderRadius: normalize(10),
                flexDirection: "row",
                gap: normalize(24),
              }}
            >
              <Image
                style={{ width: 36, height: 36 }}
                source={require("../assets/icons/SpotifyIcon.png")}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(25),
                  fontWeight: "500",
                  letterSpacing: -1,
                }}
              >
                {authType} with Spotify
              </Text>
            </View>
            <View
              style={{
                width: normalize(300),
                paddingVertical: normalize(10),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(156, 75, 255, 0.8)",
                borderRadius: normalize(10),
                flexDirection: "row",
                gap: normalize(24),
              }}
            >
              <Image
                style={{ width: normalize(36), height: normalize(36) }}
                source={require("../assets/icons/PhoneIcon.png")}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(25),
                  fontWeight: "500",
                  letterSpacing: -1,
                }}
              >
                {authType} with Phone
              </Text>
            </View>
            <View
              style={{
                width: normalize(300),
                paddingVertical: normalize(10),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(156, 75, 255, 0.8)",
                borderRadius: normalize(10),
                flexDirection: "row",
                gap: normalize(24),
              }}
            >
              <Image
                style={{ width: normalize(32), height: normalize(36) }}
                source={require("../assets/icons/AppleIcon.png")}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(25),
                  fontWeight: "500",
                  letterSpacing: -1,
                }}
              >
                {authType} with Apple
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: normalize(10),
            }}
          >
            <Image
              style={{ width: normalize(60), height: normalize(52) }}
              source={require("../assets/icons/SpotifyArrow.png")}
            ></Image>
            <View
              style={{
                width: normalize(225),
                marginTop: normalize(8),
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: normalize(16),
                  fontWeight: "400",
                  letterSpacing: -0.64,
                }}
              >
                All accounts will have to be linked to your Spotify account in
                the following steps
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
