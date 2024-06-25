import * as Linking from "expo-linking";
const redirectUri = Linking.createURL("redirect");
console.log("redirectUri: ", redirectUri);

export const spotifyCredentials = {
  clientId: "7e18ac3973ba4d51a66bfe7265a75fb1",
  clientSecret: "dd73ec8705e94cf98551ff5ebe48d639",
  // redirectUri: "com.domain.ShareTheLove1234://redirect",
  // redirectUri: "exp://77.80.120.203:8081",
  // redirectUri: "exp://0pj9hcy.sergiodavidricotorres.8081.exp.direct",
  // redirectUri: "ShareTheLoveMVP://redirect",
  // redirectUri: "sharethelovemvp://redirect",
  redirectUri: redirectUri,
};

export const TMDBCredentials = {
  api_key: "45dc205ebbe32bd29ac3ccc8e36cae2d",
  api_read_access_token:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWRjMjA1ZWJiZTMyYmQyOWFjM2NjYzhlMzZjYWUyZCIsInN1YiI6IjY0NzhiZjM4OTM4MjhlMDBmOWQ2MTNjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ugiFgE_NeI3N31PSX2_fk1SDugml3BWg4Q7KMCt_Bm0",
};
