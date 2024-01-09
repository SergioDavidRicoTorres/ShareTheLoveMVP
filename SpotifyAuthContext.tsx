// SpotifyAuthContext.js
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type SpotifyAuthContextType = {
  isSpotifyAuthenticated: boolean;
  setIsSpotifyAuthenticated: Dispatch<SetStateAction<boolean>>;
};

// Define the shape of your context data
const SpotifyAuthContext = createContext<SpotifyAuthContextType>({
  isSpotifyAuthenticated: false,
  setIsSpotifyAuthenticated: () => {}, // This should match the name in the type
});

export const useSpotifyAuth = () =>
  useContext<SpotifyAuthContextType>(SpotifyAuthContext);

type SpotifyAuthProviderProps = {
  children: ReactNode;
};

export const SpotifyAuthProvider = ({ children }: SpotifyAuthProviderProps) => {
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);

  return (
    <SpotifyAuthContext.Provider
      value={{ isSpotifyAuthenticated, setIsSpotifyAuthenticated }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};
