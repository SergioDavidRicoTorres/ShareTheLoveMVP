import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type UserAuthContextType = {
  setIsUserProfileComplete: Dispatch<SetStateAction<boolean>>;
  setIsSpotifyAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const UserAuthContext = createContext<UserAuthContextType>({
  setIsUserProfileComplete: () => {},
  setIsSpotifyAuthenticated: () => {},
});

export const useUserAuth = () => useContext(UserAuthContext);

type UserAuthProviderProps = {
  setIsUserProfileComplete: Dispatch<SetStateAction<boolean>>;
  setIsSpotifyAuthenticated: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export const UserAuthProvider = ({
  setIsUserProfileComplete,
  setIsSpotifyAuthenticated,
  children,
}: UserAuthProviderProps) => {
  return (
    <UserAuthContext.Provider
      value={{ setIsUserProfileComplete, setIsSpotifyAuthenticated }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
