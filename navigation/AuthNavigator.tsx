import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../screens/AuthScreen";
import SignUpPersonalInfo from "../screens/SignUpPersonalInfoScreen";
import SignUpEnd from "../screens/SignUpEndScreen";
import AuthEmailPassword from "../screens/AuthEmailPasswordScreen";
import { AuthNavigatorParamsList, AuthNavigatorProps } from "../types";

const Stack = createStackNavigator<AuthNavigatorParamsList>();

// const AuthNavigator = ({initialRouteName}: AuthNavigatorProps) => {
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthScreen" component={Auth} />
      <Stack.Screen
        name="AuthEmailPasswordScreen"
        component={AuthEmailPassword}
      />
      <Stack.Screen
        name="SignUpPersonalInfoScreen"
        component={SignUpPersonalInfo}
      />
      <Stack.Screen name="SignUpEndScreen" component={SignUpEnd} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
