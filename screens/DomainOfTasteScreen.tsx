import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCurrentUserData } from "../UserData";
import PlaylistCard from "../components/PlaylistCard";
import { getScreenGradientFirstColor } from "../utils";
import { normalize } from "../utils";
import { ProfileNavigationProp, DomainOfTasteScreenRouteProp } from "../types";
import { getCurrentUserId, getDomainName, getDomainsPlaylistsData } from "../utilsData";

const { width } = Dimensions.get("window"); // screen width constant

const user = getCurrentUserData();
// const normalize = (value) => width * (value / 390);

// moodText
const moodTextFontSize = width * 0.046;
// backButtonImage
const backButtonImageWidth = width * 0.036;
const backButtonImageHeight = width * 0.059;

// const getScreenGradientFirstColor = (category) => {
//   try {
//     if (category.id === 0) {
//       return "rgba(0, 98, 62, 1)";
//     }
//     if (category.id === 1) {
//       return "rgba(99, 0, 101, 1)";
//     }
//     if (category.id === 2) {
//       return "rgba(75, 117, 59, 1)";
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

export default function DomainOfTaste() {
  const handleButtonPress = () => {
    // Handle button press event
  };
  const navigation = useNavigation<ProfileNavigationProp>();
  const route = useRoute<DomainOfTasteScreenRouteProp>();
  const { domainOfTaste, user } = route.params;

  const playlists = getDomainsPlaylistsData(domainOfTaste.domainId, getCurrentUserId());

  return (
    <LinearGradient
      colors={[getScreenGradientFirstColor(domainOfTaste), "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            // backgroundColor: getScreenGradientFirstColor(domainOfTaste),
            width,
            paddingBottom: normalize(10),
          }}
        >
          <TouchableOpacity
            // backButtonContainer
            style={{ left: normalize(10), top: 0 }}
            onPress={() => navigation.goBack()}
          >
            {/* Back Button Image */}
            <Image
              source={require("../assets/icons/ArrowBack.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            {/* <View style={{ marginTop: 25, marginBottom: 150 }}> */}
            {/* Back Button */}
            <Text
              style={{
                marginBottom: normalize(20),
                color: "white",
                fontSize: normalize(40),
                fontWeight: "700",
              }}
            >
              {getDomainName(domainOfTaste.domainId)}
            </Text>
            {/* {console.log(domainOfTaste)} */}

            <FlatList
              scrollEnabled={false}
              data={playlists}
              style={{ marginBottom: normalize(70) }}
              ItemSeparatorComponent={() => (
                <View style={{ height: normalize(20) }} />
              )}
              renderItem={({ item: playlist }) => (
                <PlaylistCard
                  playlist={playlist}
                  domainOfTaste={domainOfTaste}
                  navigation={navigation}
                  user={user}
                />
              )}
            />
          </View>
        </ScrollView>
        {/* </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonImage: {
    width: normalize(14),
    height: normalize(23),
  },
});
