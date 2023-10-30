import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import MediaItemsViewScreen from "../screens/PostsViewScreen";
import DomainOfTaste from "../screens/DomainOfTasteScreen";

const Stack = createStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileScreen"
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DomainOfTaste" component={DomainOfTaste} />
      <Stack.Screen
        name="MediaItemsViewScreen"
        component={MediaItemsViewScreen}
      />
    </Stack.Navigator>
  );
}

export { ProfileNavigator };
