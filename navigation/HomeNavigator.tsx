import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SearchUser from "../screens/SearchUserScreen";
import { HomeNavigatorParamsList } from "../types";
import ExternalProfileScreen from "../screens/ExternalProfileScreen";
import { ProfileContentNavigator } from "./ProfileContentNavigator";
import PostsViewScreen from "../screens/PostsViewScreen";
import DomainOfTasteScreen from "../screens/DomainOfTasteScreen";
import DebuggingScreen from "../screens/DebuggingScreen";

const Stack = createStackNavigator<HomeNavigatorParamsList>();

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      {/* <Stack.Screen name="DebuggingScreen" component={DebuggingScreen} /> */}
      <Stack.Screen
        name="ExternalProfileScreen"
        component={ExternalProfileScreen}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchUserScreen" component={SearchUser} />

      <Stack.Screen
        name="ProfileContentNavigator"
        component={ProfileContentNavigator}
      />
    </Stack.Navigator>
  );
}

export { HomeNavigator };
