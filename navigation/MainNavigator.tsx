import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";
import AuthNavigator from "./AuthNavigator";
import { MainNavigatorParamsList } from "../types";


const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthNavigator"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
