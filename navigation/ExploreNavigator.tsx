import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ExploreNavigatorParamsList, HomeNavigatorParamsList } from "../types";
import ExternalProfileScreen from "../screens/ExternalProfileScreen";
import { ProfileContentNavigator } from "./ProfileContentNavigator";
import ExploreScreen from "../screens/ExploreScreen";

const Stack = createStackNavigator<ExploreNavigatorParamsList>();

function ExploreNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ExploreScreen"
    >
      <Stack.Screen
        name="ExternalProfileScreen"
        component={ExternalProfileScreen}
      />
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen
        name="ProfileContentNavigator"
        component={ProfileContentNavigator}
      />
    </Stack.Navigator>
  );
}

export { ExploreNavigator };
