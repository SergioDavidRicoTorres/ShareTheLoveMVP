import { SpotifyAuthProvider } from "./SpotifyAuthContext";
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  return (
    <SpotifyAuthProvider>
      <MainNavigator />
    </SpotifyAuthProvider>
  );
}
