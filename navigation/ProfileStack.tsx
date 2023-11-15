import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import PostsViewScreen from "../screens/PostsViewScreen";
import DomainOfTaste from "../screens/DomainOfTasteScreen";
import { ProfileNavigatorParamsList } from "../types";


const Stack = createStackNavigator<ProfileNavigatorParamsList>();

function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileScreen"
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DomainOfTaste" component={DomainOfTaste} />
      <Stack.Screen
        name="PostsViewScreen"
        component={PostsViewScreen}
      />
    </Stack.Navigator>
  );
}

export { ProfileNavigator };
