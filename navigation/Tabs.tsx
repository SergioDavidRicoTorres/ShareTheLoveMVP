import { StyleSheet, View, Image, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddButtons from "../components/AddPostComponents/AddButtons";
import { getCurrentUserData } from "../UserData";
import { ProfileNavigator } from "./ProfileStack";
import { HomeNavigator } from "./HomeNavigator";
import { normalize } from "../utils";
import { fetchUserById } from "../utilsFirebase";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { User } from "../types";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../CurrentUserContext";

const Tab = createBottomTabNavigator();

function Tabs() {
  // const currentUserId = (FIREBASE_AUTH.currentUser?.uid || "defaultUserId")
  // const [currentUser, setCurrentUser]  = useState<User | null>(null);
  const { currentUser } = useCurrentUser();
  // if (!currentUser) {
  //   // Handle the case where currentUser is null
  //   // This could be a loading indicator, a message, or a redirect
  //   return <div>Loading user data...</div>;
  // }
  // const userId = currentUser?.userId;
  // if (!userId) {
  //   // Handle the case where currentUser is null
  //   // This could be a loading indicator, a message, or a redirect
  //   return <div>Loading userId...</div>;
  // }

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       // Fetch user data
  //       const user: User | null = await fetchUserById(currentUserId);
  //       if (user !== null) {
  //         setCurrentUser(user); // Set the user
  //       } else {
  //         throw new Error('User not found');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   if (currentUserId) {
  //     getUserData();
  //   }
  // }, [currentUserId]); // Depends on userId
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          position: "absolute",
          backgroundColor: "rgba(1, 4, 43, 1)",
          height: normalize(90),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  focused
                    ? require("../assets/icons/SelectedHomeButtonIcon.png")
                    : require("../assets/icons/UnselectedHomeButtonIcon.png")
                }
                resizeMode="contain"
                style={{
                  width: normalize(35),
                  height: normalize(35),
                }}
              />
            </View>
          ),
        }}
      />
      {
        <Tab.Screen
          name="Add"
          component={AddButtons}
          options={() => ({
            headerShown: false,

            tabBarButton: () => <AddButtons />,
          })}
        />
      }
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              // userImageContainer
              style={
                focused
                  ? styles.selectedProfileButton
                  : styles.unselectedProfileButton
              }
            >
              <Image
                // userImage
                style={{
                  height: normalize(45),
                  width: normalize(45),
                  borderRadius: normalize(100),
                  borderColor: "rgba(186, 129, 255, 1)",
                  borderWidth: normalize(3),
                }}
                source={{
                  uri: currentUser?.profilePicture,
                  // uri: getCurrentUserData().profilePicture,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  selectedProfileButton: {
    height: normalize(45),
    width: normalize(45),
    borderRadius: normalize(100),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(186, 129, 255, 1)",
    shadowColor: "rgba(186, 129, 255, 1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: normalize(10),
  },

  unselectedProfileButton: {
    height: normalize(45),
    width: normalize(45),
    borderRadius: normalize(100),
    backgroundColor: "rgba(186, 129, 255, 1)",
  },
});

export default Tabs;
