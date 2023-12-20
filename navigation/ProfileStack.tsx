import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import { ProfileNavigatorParamsList } from "../types";
import AddPlaylistScreen from "../screens/AddPlaylistScreen";
import DomainOfTasteScreen from "../screens/DomainOfTasteScreen";
import PostsViewScreen from "../screens/PostsViewScreen";
import { ProfileContentNavigator } from "./ProfileContentNavigator";


const Stack = createStackNavigator<ProfileNavigatorParamsList>();

function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileScreen"
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProfileContentNavigator" component={ProfileContentNavigator} />  
      {/* <Stack.Screen name="DomainOfTasteScreen" component={DomainOfTasteScreen} />
      <Stack.Screen
        name="PostsViewScreen"
        component={PostsViewScreen}
      /> */}
      <Stack.Screen name="AddPlaylistScreen" component={AddPlaylistScreen} />
    </Stack.Navigator>
  );
}

export { ProfileNavigator };
