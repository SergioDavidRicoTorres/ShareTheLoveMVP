import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUserData } from "../UserData";
import Settings from "../components/Settings";
import { useState } from "react";
import Carousel from "react-native-snap-carousel";
import {
  getDomainOfTasteScoreIcon,
  getMoodContainerColor,
  getMoodTextColor,
  getDomainsOfTasteGradientsFirstColor,
  getButtonsAccentColor,
} from "../utils";
import { DOMAINPOSTTYPE } from "../constants";

const { width } = Dimensions.get("window"); // screen width constant
const normalize = (value) => width * (value / 390);

const user = getCurrentUserData();

export default function ProfileScreen({}) {
  const navigation = useNavigation();

  // Optional Modal Boolean State
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  // Optional Modal show Function
  const toggleSettingsModal = () => {
    setIsSettingsModalVisible(!isSettingsModalVisible);
  };

  return (
    <LinearGradient
      colors={["rgba(105, 51, 172, 1)", "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                fontSize: normalize(30),
                fontWeight: 700,
              }}
            >
              @abel
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: normalize(10),
                marginTop: normalize(9),
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(25),
                    fontWeight: 900,
                    letterSpacing: -1,
                  }}
                >
                  17.5K
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(17),
                    fontWeight: 300,
                    letterSpacing: -0.68,
                  }}
                >
                  Followers
                </Text>
              </View>
              <View
                // userImageContainer
                style={{
                  height: normalize(140),
                  width: normalize(140),
                  borderRadius: normalize(100),
                  backgroundColor: "rgba(255, 184, 0, 1)",
                  shadowColor: "rgba(255, 184, 0, 1)",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                }}
              >
                <Image
                  // userImage
                  style={{
                    height: normalize(140),
                    width: normalize(140),
                    borderRadius: normalize(100),
                    borderColor: "rgba(255, 184, 0, 1)",
                    borderWidth: normalize(4),
                  }}
                  source={{
                    uri: user.profilePicture,
                  }}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(25),
                    fontWeight: 900,
                    letterSpacing: -1,
                  }}
                >
                  2K
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(17),
                    fontWeight: 300,
                    letterSpacing: -0.68,
                  }}
                >
                  Following
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: normalize(18),
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: normalize(7),
                  paddingHorizontal: normalize(20),
                  borderRadius: normalize(15),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 184, 0, 1)",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(22),
                    fontWeight: 700,
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <View style={{ justifyContent: "center", left: normalize(11) }}>
                <TouchableOpacity
                  onPress={() => {
                    toggleSettingsModal();
                  }}
                  style={{ position: "absolute" }}
                >
                  <Image
                    source={require("../assets/icons/ProfileSettingsButton.png")}
                    style={{ width: normalize(40), height: normalize(35) }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: normalize(14),
              }}
            >
              <View
                style={{
                  width: normalize(271),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(20),
                    fontWeight: 700,
                  }}
                >
                  Abel Tesfaye
                </Text>
              </View>
              <View
                style={{
                  width: normalize(300),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: normalize(20),
                    fontWeight: 300,
                  }}
                  numberOfLines={2}
                >
                  {user.profileDescription}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(25),
                marginBottom: normalize(150),
                alignItems: "center",
              }}
            >
              <Carousel
                data={user.domainsOfTaste}
                sliderWidth={width}
                firstItem={1}
                inactiveSlideOpacity={0.5} // Sets the opacity of inactive items to 60%
                itemWidth={normalize(270)} // Taking into account the horizontal margin
                activeSlideAlignment={"center"}
                renderItem={({ item: category }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DomainOfTaste", {
                        domainOfTaste: category,
                        user,
                      })
                    }
                  >
                    <LinearGradient
                      colors={[
                        getDomainsOfTasteGradientsFirstColor(category),
                        "rgba(58, 17, 90, 1)",
                      ]}
                      style={{
                        width: normalize(270),
                        height: normalize(500),
                        borderRadius: normalize(15),
                        alignItems: "center",

                        // marginHorizontal: (width - normalize(271)) / 2, // CHANGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            marginTop: normalize(15),
                            color: "white",
                            fontSize: normalize(25),
                            fontWeight: "700",
                            textShadowColor: "black",
                            textShadowOffset: { width: 0, height: 0 },
                            textShadowRadius: normalize(10),
                            paddingHorizontal: normalize(6),
                          }}
                        >
                          {category.name}
                        </Text>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            gap: normalize(8),
                          }}
                        >
                          <Image
                            style={{
                              width: normalize(22),
                              height: normalize(22),
                            }}
                            source={getDomainOfTasteScoreIcon(category)}
                          />
                          <Text
                            style={{
                              color: getButtonsAccentColor(
                                DOMAINPOSTTYPE[category.id]
                              ),
                              fontSize: normalize(22),
                              fontWeight: "700",
                            }}
                          >
                            {category.score}
                          </Text>
                        </View>
                      </View>
                      <FlatList
                        style={{
                          marginTop: normalize(18),
                          width: normalize(251),
                        }}
                        snapToAlignment={normalize(300)}
                        scrollEnabled={false}
                        data={category.playlists}
                        ItemSeparatorComponent={() => (
                          <View style={{ height: normalize(20) }} />
                        )}
                        renderItem={({ item: playlist }) => (
                          <View
                            style={{
                              width: normalize(251),
                              height: normalize(50),
                              backgroundColor: getMoodContainerColor(
                                DOMAINPOSTTYPE[category.id]
                              ),
                              borderRadius: normalize(5),
                              flexDirection: "row",
                            }}
                          >
                            {playlist.image && (
                              <Image
                                source={{ uri: playlist.image }}
                                style={{
                                  width: normalize(50),
                                  height: normalize(50),
                                  borderTopLeftRadius: normalize(5),
                                  borderBottomLeftRadius: normalize(5),
                                }}
                              />
                            )}
                            <View
                              style={{
                                width: normalize(165),
                                height: normalize(20),
                                marginLeft: normalize(15),
                              }}
                            >
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: "white",
                                  fontSize: normalize(20),
                                  fontWeight: 700,
                                }}
                              >
                                {playlist.name}
                              </Text>
                              <FlatList
                                data={playlist.moods}
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id.toString()}
                                style={{
                                  marginTop: normalize(7),
                                  width: normalize(186),
                                  height: normalize(18),
                                  gap: normalize(3),
                                  flexDirection: "row",
                                }}
                                renderItem={({ item }) => (
                                  <View
                                    key={item.id}
                                    style={{
                                      paddingVertical: normalize(2),
                                      paddingHorizontal: normalize(10),
                                      borderRadius: normalize(10),
                                      backgroundColor: getMoodContainerColor(
                                        DOMAINPOSTTYPE[category.id]
                                      ),
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Text
                                      // playlistMoodItemText
                                      style={{
                                        fontSize: normalize(12),
                                        fontWeight: 600,
                                        color: getMoodTextColor(
                                          DOMAINPOSTTYPE[category.id]
                                        ),
                                      }}
                                    >
                                      {item.name}
                                    </Text>
                                  </View>
                                )}
                              />
                            </View>
                          </View>
                        )}
                        keyExtractor={(playlist) => playlist.id}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </ScrollView>
        {isSettingsModalVisible && (
          <Settings
            visible={isSettingsModalVisible}
            onClose={toggleSettingsModal}
            navigation={navigation}
          />
        )}
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
});
