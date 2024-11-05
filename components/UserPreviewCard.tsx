import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import {
  ExploreNavigationProp,
  Playlist,
  UserPreviewCardProps,
} from "../types";
import { getMoodContainerColor, getMoodTextColor, normalize } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { DOMAINPOSTTYPE } from "../constants";
import { useEffect, useRef, useState } from "react";
import { fetchAllUsersPlaylists } from "../utilsFirebase";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window"); // screen width constant

export default function UserPreviewCard({
  user,
  playlists,
  usersCount,
  index,
  handleNext,
  handlePrevious,
}: UserPreviewCardProps) {
  //   const scrollToIndex = (index: number) => {
  //     if (flatListRef.current) {
  //       flatListRef.current.scrollToIndex({ index, animated: true });
  //       setCurrentIndex(index);
  //     }
  //   };

  //   const handleNext = () => {
  //     if (currentIndex < usersCount - 1) {
  //       scrollToIndex(currentIndex + 1);
  //     }
  //   };

  //   const handlePrevious = () => {
  //     if (currentIndex > 0) {
  //       scrollToIndex(currentIndex - 1);
  //     }
  //   };
  //   const [playlists, setPlaylists] = useState<Playlist[]>([]);

  //   const fetchAndSetUsersPlaylists = async () => {
  //     if (user.userId) {
  //       const fetchedPlaylists = await fetchAllUsersPlaylists(user.userId);
  //       setPlaylists(fetchedPlaylists);
  //     } else {
  //       setPlaylists([]);
  //     }
  //   };

  // Initial data fetch
  //   useEffect(() => {
  //     fetchAndSetUsersPlaylists();
  //   }, [user]);

  const profileNavigation = useNavigation<ExploreNavigationProp>();

  const handleProfileNavigation = () => {
    profileNavigation.navigate("ExternalProfileScreen", { user });
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: (width - normalize(310)) / 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              zIndex: 1,

              alignItems: "center",
            }}
            onPress={() => handleProfileNavigation()}
          >
            <Text
              style={{
                fontSize: normalize(23),
                fontWeight: "700",
                color: "rgba(194, 144, 255, 1)",
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: normalize(18),
                fontWeight: "500",
                color: "white",
              }}
            >
              @{user.profileName}
            </Text>
            <View
              style={{
                zIndex: 1,
                height: normalize(120),
                width: normalize(120),
                borderRadius: normalize(100),
                backgroundColor: "rgba(156, 75, 255, 1)",
                bottom: normalize(-10),
              }}
            >
              <Image
                style={{
                  height: normalize(120),
                  width: normalize(120),
                  borderRadius: normalize(100),
                  borderWidth: normalize(4),
                  borderColor: "rgba(194, 144, 255, 1)",
                }}
                source={{
                  uri: user.profilePicture,
                }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              bottom: normalize(50),
              alignItems: "center",
            }}
          >
            <View
              style={{
                zIndex: 0,
                //   height: normalize(517),
                width: normalize(310),
                backgroundColor: "rgba(156, 75, 255, 0.2)",
                borderRadius: normalize(20),
                borderWidth: normalize(4),
                borderColor: "rgba(156, 75, 255, 1)",
                alignItems: "center",
                paddingBottom: normalize(20),
              }}
            >
              {user.domainsOfTaste.Music.isActive && (
                <>
                  <LinearGradient // Background Color
                    colors={["rgba(0, 98, 62, 1)", "rgba(0, 200, 127, 1)"]}
                    style={{
                      marginTop: normalize(82),
                      width: normalize(270),
                      borderRadius: normalize(15),
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: normalize(8),
                      borderWidth: normalize(4),
                      borderColor: "rgba(153, 255, 218, 1)",
                      overflow: "hidden",
                      paddingHorizontal: normalize(10),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: normalize(20),
                        fontWeight: "700",
                        color: "rgba(153, 255, 218, 1)",
                      }}
                    >
                      Music
                    </Text>
                    <FlatList
                      scrollEnabled={true}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      nestedScrollEnabled={true}
                      data={playlists.filter(
                        (playlist) => playlist.domainId === 0
                      )}
                      style={{
                        width: normalize(250),
                        flexDirection: "row",
                        marginTop: normalize(8),
                        paddingLeft: normalize(10),
                      }}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            width: normalize(15),
                            height: normalize(10),
                          }}
                        />
                      )}
                      renderItem={({ item: playlist }) => (
                        <View
                          style={{
                            marginTop: normalize(8),
                            //   height: normalize(80),
                            //   width: normalize(170),
                            borderRadius: normalize(10),
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            alignItems: "center",
                            paddingTop: normalize(5),
                            paddingBottom: normalize(12),
                            paddingHorizontal: normalize(20),
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              // marginTop: normalize(2),
                              fontSize: normalize(20),
                              fontWeight: "700",
                              color: "rgba(153, 255, 218, 1)",
                            }}
                          >
                            {playlist.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(15),
                              fontWeight: "400",
                              color: "rgba(153, 255, 218, 1)",
                            }}
                          >
                            {playlist.postsCount} posts
                          </Text>
                          <FlatList
                            data={playlist.moods.slice(0, 3)}
                            scrollEnabled={false}
                            style={
                              {
                                //   gap: normalize(6),
                                //   maxWidth: normalize(250),
                                //   marginLeft: normalize(10),
                                //   marginRight: normalize(5),
                              }
                            }
                            ItemSeparatorComponent={() => (
                              <View
                                style={{
                                  width: normalize(6),
                                  height: normalize(16),
                                }}
                              />
                            )}
                            horizontal
                            renderItem={({ item: mood }) => (
                              // Mood
                              <View
                                // moodContainer
                                style={{
                                  marginTop: normalize(6),
                                  paddingVertical: normalize(2),
                                  paddingHorizontal: normalize(10),
                                  backgroundColor: getMoodContainerColor(
                                    DOMAINPOSTTYPE.get(0)
                                  ),
                                  borderRadius: normalize(10),
                                }}
                              >
                                <Text
                                  // moodText
                                  style={{
                                    fontSize: normalize(16),
                                    fontWeight: "500",
                                    color: getMoodTextColor(
                                      DOMAINPOSTTYPE.get(0)
                                    ),
                                  }}
                                >
                                  {mood.name}
                                </Text>
                              </View>
                            )}
                            keyExtractor={(mood) => mood.id.toString()}
                          />
                          {/* <View
                            style={{
                              marginTop: normalize(6),
                              paddingVertical: normalize(2),
                              paddingHorizontal: normalize(10),
                              backgroundColor: getMoodContainerColor(
                                DOMAINPOSTTYPE.get(0)
                              ),
                              borderRadius: normalize(10),
                            }}
                          >
                            <Text
                              style={{
                                fontSize: normalize(16),
                                fontWeight: 500,
                                color: getMoodTextColor(DOMAINPOSTTYPE.get(0)),
                              }}
                            >
                              moody
                            </Text>
                          </View> */}
                        </View>
                      )}
                    />
                  </LinearGradient>
                </>
              )}
              {/* <>
                <FlatList
                  horizontal
                  style={{
                    flexDirection: "row",
                  }}
                  data={[1, 2, 3, 4, 5]}
                  renderItem={() => (
                    <View
                      style={{
                        flexDirection: "row",
                        margin: normalize(10),
                        height: normalize(100),
                        width: normalize(100),
                        backgroundColor: "white",
                      }}
                    />
                  )}
                />
              </> */}
              {user.domainsOfTaste.FilmsTVShows.isActive && (
                <>
                  <LinearGradient // Background Color
                    colors={["rgba(99, 0, 101, 1)", "rgba(176, 77, 178, 1)"]}
                    style={{
                      marginTop: normalize(20),
                      width: normalize(270),
                      // height: normalize(125),
                      borderRadius: normalize(15),
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: normalize(8),
                      borderWidth: normalize(4),
                      borderColor: "rgba(253, 153, 255, 1)",
                      paddingHorizontal: normalize(10),
                      overflow: "hidden",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: normalize(20),
                        fontWeight: "700",
                        color: "rgba(253, 153, 255, 1)",
                      }}
                    >
                      Films / TV Shows
                    </Text>

                    <FlatList
                      scrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={playlists.filter(
                        (playlist) => playlist.domainId === 1
                      )}
                      style={{
                        flexDirection: "row",
                        marginTop: normalize(8),
                        width: normalize(270),
                        paddingLeft: normalize(10),
                      }}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            width: normalize(15),
                            height: normalize(10),
                          }}
                        />
                      )}
                      renderItem={({ item: playlist }) => (
                        <View
                          style={{
                            marginTop: normalize(8),
                            //   height: normalize(80),
                            //   width: normalize(170),
                            borderRadius: normalize(10),
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            alignItems: "center",
                            paddingTop: normalize(5),
                            paddingBottom: normalize(12),
                            paddingHorizontal: normalize(20),
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              // marginTop: normalize(2),
                              fontSize: normalize(20),
                              fontWeight: "700",
                              color: "rgba(253, 153, 255, 1)",
                            }}
                          >
                            {playlist.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(15),
                              fontWeight: "400",
                              color: "rgba(253, 153, 255, 1)",
                            }}
                          >
                            {playlist.postsCount} posts
                          </Text>
                          <FlatList
                            scrollEnabled={false}
                            style={
                              {
                                //   gap: normalize(6),
                                //   maxWidth: normalize(250),
                                //   marginLeft: normalize(10),
                                //   marginRight: normalize(5),
                              }
                            }
                            ItemSeparatorComponent={() => (
                              <View
                                style={{
                                  width: normalize(6),
                                  height: normalize(16),
                                }}
                              />
                            )}
                            data={playlist.moods.slice(0, 3)}
                            horizontal
                            renderItem={({ item: mood }) => (
                              // Mood
                              <View
                                // moodContainer
                                style={{
                                  marginTop: normalize(6),
                                  paddingVertical: normalize(2),
                                  paddingHorizontal: normalize(10),
                                  backgroundColor: getMoodContainerColor(
                                    DOMAINPOSTTYPE.get(1)
                                  ),
                                  borderRadius: normalize(10),
                                }}
                              >
                                <Text
                                  // moodText
                                  style={{
                                    fontSize: normalize(16),
                                    fontWeight: "500",
                                    color: getMoodTextColor(
                                      DOMAINPOSTTYPE.get(1)
                                    ),
                                  }}
                                >
                                  {mood.name}
                                </Text>
                              </View>
                            )}
                            keyExtractor={(mood) => mood.id.toString()}
                          />
                          {/* <View
                            style={{
                              marginTop: normalize(6),
                              paddingVertical: normalize(2),
                              paddingHorizontal: normalize(10),
                              backgroundColor: getMoodContainerColor(
                                DOMAINPOSTTYPE.get(1)
                              ),
                              borderRadius: normalize(10),
                            }}
                          >
                            <Text
                              style={{
                                fontSize: normalize(16),
                                fontWeight: 500,
                                color: getMoodTextColor(DOMAINPOSTTYPE.get(1)),
                              }}
                            >
                              moody
                            </Text>
                          </View> */}
                        </View>
                      )}
                    />
                  </LinearGradient>
                </>
              )}
              {user.domainsOfTaste.PodcastsEpisodes.isActive && (
                <>
                  <LinearGradient // Background Color
                    colors={["rgba(75, 117, 59, 1)", "rgba(136, 177, 121, 1)"]}
                    style={{
                      marginTop: normalize(20),
                      width: normalize(270),
                      // height: normalize(125),
                      borderRadius: normalize(15),
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: normalize(8),
                      borderWidth: normalize(4),
                      borderColor: "rgba(197, 238, 182, 1)",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: normalize(20),
                        fontWeight: "700",
                        color: "rgba(197, 238, 182, 1)",
                      }}
                    >
                      Podcasts
                    </Text>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      scrollEnabled={true}
                      horizontal={true}
                      data={playlists.filter(
                        (playlist) => playlist.domainId === 2
                      )}
                      style={{
                        flexDirection: "row",
                        marginTop: normalize(8),
                        width: normalize(270),
                        paddingLeft: normalize(10),
                      }}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            width: normalize(15),
                            height: normalize(10),
                          }}
                        />
                      )}
                      renderItem={({ item: playlist }) => (
                        <View
                          style={{
                            marginTop: normalize(8),
                            //   height: normalize(80),
                            //   width: normalize(170),
                            borderRadius: normalize(10),
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            alignItems: "center",
                            paddingTop: normalize(5),
                            paddingBottom: normalize(12),
                            paddingHorizontal: normalize(20),
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              // marginTop: normalize(2),
                              fontSize: normalize(20),
                              fontWeight: "700",
                              color: "rgba(197, 238, 182, 1)",
                            }}
                          >
                            {playlist.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(15),
                              fontWeight: "400",
                              color: "rgba(197, 238, 182, 1)",
                            }}
                          >
                            {playlist.postsCount} posts
                          </Text>
                          <FlatList
                            scrollEnabled={false}
                            style={{
                              marginHorizontal: normalize(10),
                              //   gap: normalize(6),
                              //   maxWidth: normalize(250),
                              //   marginLeft: normalize(10),
                              //   marginRight: normalize(5),
                            }}
                            ItemSeparatorComponent={() => (
                              <View
                                style={{
                                  width: normalize(6),
                                  height: normalize(16),
                                }}
                              />
                            )}
                            data={playlist.moods.slice(0, 3)}
                            horizontal
                            renderItem={({ item: mood }) => (
                              // Mood
                              <View
                                // moodContainer
                                style={{
                                  marginTop: normalize(6),
                                  paddingVertical: normalize(2),
                                  paddingHorizontal: normalize(10),
                                  backgroundColor: getMoodContainerColor(
                                    DOMAINPOSTTYPE.get(2)
                                  ),
                                  borderRadius: normalize(10),
                                }}
                              >
                                <Text
                                  // moodText
                                  style={{
                                    fontSize: normalize(16),
                                    fontWeight: "500",
                                    color: getMoodTextColor(
                                      DOMAINPOSTTYPE.get(2)
                                    ),
                                  }}
                                >
                                  {mood.name}
                                </Text>
                              </View>
                            )}
                            keyExtractor={(mood) => mood.id.toString()}
                          />
                          {/* <View
                            style={{
                              marginTop: normalize(6),
                              paddingVertical: normalize(2),
                              paddingHorizontal: normalize(10),
                              backgroundColor: getMoodContainerColor(
                                DOMAINPOSTTYPE.get(2)
                              ),
                              borderRadius: normalize(10),
                            }}
                          >
                            <Text
                              style={{
                                fontSize: normalize(16),
                                fontWeight: 500,
                                color: getMoodTextColor(DOMAINPOSTTYPE.get(2)),
                              }}
                            >
                              moody
                            </Text>
                          </View> */}
                        </View>
                      )}
                    />
                  </LinearGradient>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
      {index != 0 && (
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-start",
            top: normalize(370),
            left: normalize(5),
          }}
          onPress={handlePrevious}
        >
          <Image
            style={{
              width: normalize(40),
              height: normalize(36),
              tintColor: "rgba(194, 144, 255, 1)",
            }}
            source={require("../assets/icons/DoubleLeftArrowIcon.png")}
          />
        </TouchableOpacity>
      )}

      {index < usersCount - 1 && (
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            top: normalize(370),
            right: normalize(5),
          }}
          onPress={handleNext}
        >
          <Image
            style={{
              width: normalize(40),
              height: normalize(36),
              tintColor: "rgba(194, 144, 255, 1)",
            }}
            source={require("../assets/icons/DoubleRightArrowIcon.png")}
          />
        </TouchableOpacity>
      )}
    </>
  );
}
