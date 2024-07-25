import React, { useEffect, useState } from "react";
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
  HomeNavigationProp,
  MainNavigationProp,
  PostLikesProps,
  ProfileNavigationProp,
  SettingsProps,
  User,
} from "../types";
import { useNavigation } from "@react-navigation/native";
import { useSpotifyAuth } from "../SpotifyAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAllUsers, handleFirebaseSignOut } from "../utilsFirebase";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window"); // screen width constant
// const normalize = (value) => width * (value / 390);

export default function PostLikes({
  visible,
  onClose,
  likesUsersIdsList,
}: PostLikesProps) {
  const navigation = useNavigation<HomeNavigationProp>();
  const [likesUsersList, setLikesUsersList] = useState<User[]>([]);

  const removeQuotes = (id: string) => id.replace(/"/g, "");

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      if (likesUsersIdsList.length > 0) {
        const allUsers: User[] = await fetchAllUsers();
        const cleanedLikesUsersIdsList = likesUsersIdsList.map(removeQuotes);
        const filteredUsers = allUsers.filter((user) => {
          if (user.userId) {
            const match = cleanedLikesUsersIdsList.includes(user.userId);
            console.log("userId: ", user.userId, "match:", match);
            return match;
          }
        });
        console.log("likedUsersIdsList: ", cleanedLikesUsersIdsList);
        console.log("filteredUsers: ", filteredUsers);
        setLikesUsersList(filteredUsers);
      }
    };

    if (visible) {
      fetchAndSetUsers();
    }
  }, [likesUsersIdsList, visible]);
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
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              //   width: normalize(331),
              // height: normalize(300),
              paddingVertical: normalize(50),
              backgroundColor: "rgba(22, 0, 39, 1)",
              //   paddingTop: normalize(50),
              paddingHorizontal: normalize(10),
              //   paddingBottom: normalize(20),
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
                alignSelf: "flex-end",
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
            {likesUsersList.length > 0 ? (
              <FlatList
                data={likesUsersList}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: normalize(260),
                      height: 1,
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      marginVertical: normalize(15),
                      alignSelf: "center",
                    }}
                  />
                )}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginHorizontal: normalize(20),
                      paddingVertical: normalize(0),
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        marginRight: normalize(12),
                        width: normalize(30),
                        height: normalize(42),
                      }}
                      tintColor={"rgba(201, 157, 255, 1)"}
                      source={require("../assets/icons/RocksButtonIcon.png")}
                    />
                    <Image
                      style={{
                        width: normalize(60),
                        height: normalize(60),
                        borderRadius: normalize(100),
                        borderColor: "rgba(201, 157, 255, 1)",
                        borderWidth: normalize(3),
                      }}
                      source={{ uri: item.profilePicture }}
                    />
                    <View
                      style={{
                        justifyContent: "center",
                        marginLeft: normalize(10),
                        backgroundColor: "rgba(84, 42, 147, 1)",
                        paddingHorizontal: normalize(12),
                        width: normalize(220),
                        borderRadius: normalize(10),
                        borderColor: "rgba(201, 157, 255, 1)",
                        borderWidth: normalize(3),
                      }}
                    >
                      <Text
                        style={{
                          color: "rgba(201, 157, 255, 1)",
                          fontSize: normalize(19),
                          fontWeight: "700",
                        }}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: normalize(17),
                          fontWeight: "300",
                        }}
                        numberOfLines={1}
                      >
                        @{item.profileName}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Text
                style={{
                  marginLeft: normalize(10),
                  marginTop: normalize(10),
                  color: "rgba(156, 75, 255, 0.5)",
                  fontSize: normalize(30),
                  fontWeight: "600",
                  width: normalize(310),
                  textAlign: "center",
                }}
                // numberOfLines={1}
              >
                No likes yet
              </Text>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
