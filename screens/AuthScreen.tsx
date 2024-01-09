import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AuthOptions from "../components/AuthOptions";
import { AuthNavigationProp } from "../types";

const { width } = Dimensions.get("window"); // Window Dimensions
const normalize = (value: number) => width * (value / 390);

export default function Auth() {
  const redirectUri = AuthSession.makeRedirectUri();
  console.log("redirectUri", redirectUri);
  const navigation = useNavigation<AuthNavigationProp>();
  const [authType, setAuthType] = useState("");
  const [isAuthOptionsModalVisible, setIsAuthOptionsModalVisible] =
    useState(false);
  const toggleAuthOptionsModal = () => {
    setIsAuthOptionsModalVisible(!isAuthOptionsModalVisible);
  };
  return (
    <LinearGradient // Background Color
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]}
      style={styles.container}
    >
      <SafeAreaView
        style={styles.container} // External Container
      >
        <View style={{ marginHorizontal: normalize(24) }}>
          <Text
            style={{
              color: "rgba(156, 75, 255, 1)",
              fontFamily: "Helvetica",
              fontSize: normalize(60),
              fontWeight: "400",
              letterSpacing: -1.2,
            }}
          >
            Elevate your Connections, Rediscover Your Taste, and
          </Text>
          <Image
            style={{ width: normalize(352), height: normalize(76) }}
            source={require("../assets/icons/ShareTheLoveGreenIcon.png")}
          />
        </View>
        <TouchableOpacity
          style={{
            width: normalize(352),
            paddingVertical: normalize(10),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: normalize(20),
            backgroundColor: "rgba(156, 75, 255, 1)",
            marginTop: normalize(141),
          }}
          onPress={() => {
            setAuthType("Sign Up");
            toggleAuthOptionsModal();
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: normalize(30),
              fontWeight: "700",
              letterSpacing: -1.2,
            }}
          >
            Create an account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAuthType("Sign In");
            toggleAuthOptionsModal();
          }}
          style={{
            width: normalize(352),
            paddingVertical: normalize(10),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: normalize(20),
            backgroundColor: "rgba(46, 27, 172, 1)",
            marginTop: normalize(20),
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: normalize(30),
              fontWeight: "700",
              letterSpacing: -1.2,
            }}
          >
            Log in
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: normalize(34),
            alignItems: "center",
            marginTop: normalize(20),
          }}
        >
          <Text
            style={{
              alignItems: "center",
              color: "white",
              fontSize: normalize(18),
              fontWeight: "400",
              letterSpacing: -0.72,
              textAlign: "center",
            }}
          >
            By logging in, you accept the Terms of Use We will never publish
            anything in your name
          </Text>
        </View>
        {isAuthOptionsModalVisible && (
          <AuthOptions
            visible={isAuthOptionsModalVisible}
            onClose={toggleAuthOptionsModal}
            navigation={navigation}
            authType={authType}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
