import { SpotifyAuthProvider } from "./SpotifyAuthContext";
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  return (
    <SpotifyAuthProvider>
      <MainNavigator />
      {/* <View>
      <Text>Welcome to ShareTheLoveMVP</Text>
    </View> */}
    </SpotifyAuthProvider>
  );
}
