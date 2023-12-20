import { createStackNavigator } from "@react-navigation/stack";
import { ProfileContentNavigatorParamsList } from "../types";
import DomainOfTasteScreen from "../screens/DomainOfTasteScreen";
import PostsViewScreen from "../screens/PostsViewScreen";
import ExternalProfileScreen from "../screens/ExternalProfileScreen";

const ProfileContentStack = createStackNavigator<ProfileContentNavigatorParamsList>();

export function ProfileContentNavigator() {
  return (
    <ProfileContentStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileContentStack.Screen name="DomainOfTasteScreen" component={DomainOfTasteScreen} />
      <ProfileContentStack.Screen name="PostsViewScreen" component={PostsViewScreen} />
      {/* <ProfileContentStack.Screen name="ExternalProfileScreen" component={ExternalProfileScreen} /> */}
    </ProfileContentStack.Navigator>
  );
}