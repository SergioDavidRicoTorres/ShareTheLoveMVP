
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native'
import { getButtonsAccentColor, getDomainOfTasteScoreIcon, getDomainsName, getDomainsOfTasteGradientsFirstColor, getMoodContainerColor, getMoodTextColor, normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { DOMAINPOSTTYPE } from '../constants'
import AddPlaylist from './AddPostComponents/AddPlaylist'
import { DomainOfTasteCardProp, HomeNavigationProp, Playlist, ProfileContentNavigationProp, ProfileNavigationProp } from '../types'
import { getDomainsPlaylistsData } from '../utilsFirebase'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../firebaseConfig'
// import { useNavigationState } from '@react-navigation/native';

export default function DomainOfTasteCard({
  isCurrentUser,
  navigation, 
  category, 
  user, 
  toggleAddPlaylistModal, 
  userId, 
  isAddPlaylistModalVisible 
}: DomainOfTasteCardProp) {
    // console.log("DOMAINPOSTTYPE.get(category.domainId): ", DOMAINPOSTTYPE.get(category.domainId))
    // console.log("category.domainId ", category.domainId)

const currentRouteName = useNavigationState((state) => {
  return state.routes[state.index].name;
});
const [playlists, setPlaylists] = useState<Playlist[]>([]);
useEffect(() => {
  const fetchData = async () => {
    try {
            // console.log("userId=====================", user);
            // if (user.userId !== undefined) {
              const data = await getDomainsPlaylistsData(userId, category.domainId);
            // } else {
            //   throw new Error('userId === undefined');            
            // }
            // console.log("DOMAIN OF TASTES: ", data);
            setPlaylists(data);
          } catch (error) {
            console.error('Error fetching playlists data:', error);
            // Handle the error appropriately
          }
        };
      
        fetchData();
      }, [userId, category.domainId]); // Dependencies

      // const isCurrentUser = userId === FIREBASE_AUTH.currentUser?.uid;
      // const navigation = isCurrentUser ? useNavigation<ProfileNavigationProp>() : useNavigation<HomeNavigationProp>();
      // const profileNavigation = useNavigation<ProfileNavigationProp | HomeNavigationProp> ();
      // const profileContentNavigation = useNavigation<ProfileContentNavigationProp>();
  return (
      <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProfileContentNavigator", 
        {screen: "DomainOfTasteScreen", 
        params:{
          domainOfTaste: category,
          user,
        }})

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
                            borderColor: getMoodContainerColor(DOMAINPOSTTYPE.get(category.domainId)),
                            borderWidth: normalize(4), 
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
                          {getDomainsName(category)}
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
                                    DOMAINPOSTTYPE.get(category.domainId)
                                    ),
                                    fontSize: normalize(22),
                                    fontWeight: "700",
                                }}
                                >
                            {category.score}
                          </Text>
                        </View>
                      </View>

                      {isCurrentUser &&
                        <TouchableOpacity
                          style={{
                              marginTop: normalize(5),
                              paddingVertical: normalize(4), 
                              paddingHorizontal: normalize(5), 
                              justifyContent: "center", 
                              alignItems: "center", 
                              borderRadius: normalize(10), 
                              borderWidth: normalize(4),
                              borderColor: "rgba(156, 75, 255, 1)", 
                              backgroundColor: "rgba(58, 17, 90, 0.75)"
                            }}
                            onPress={() => navigation.navigate("AddPlaylistScreen", {domainId: category.domainId})}
                            // onPress={toggleAddPlaylistModal}
                            >
                          <Text
                            style={{
                                color: "rgba(156, 75, 255, 1)", 
                                fontSize: normalize(18), 
                                fontWeight: "700"
                            }}
                            >Add Playlist</Text>
                        </TouchableOpacity>
                      }
                      <FlatList
                        style={{
                          marginTop: normalize(18),
                          width: normalize(251),
                        }}
                        // snapToAlignment={normalize(300)}
                        scrollEnabled={false}
                        data={playlists}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: normalize(20) }} />
                            )}
                            renderItem={({ item: playlist }) => (
                                <View
                                style={{
                                    width: normalize(251),
                                    // height: normalize(50),
                                    paddingVertical: 0,
                                    backgroundColor: getMoodContainerColor(
                                        DOMAINPOSTTYPE.get(category.domainId)
                                        ),
                                        borderRadius: normalize(5),
                                        flexDirection: "row",
                                        borderColor: getMoodContainerColor(DOMAINPOSTTYPE.get(playlist.domainId)),
                                        borderWidth: normalize(2), 
                                    }}
                                    >
                            {playlist.image && (
                                <Image
                                source={{ uri: playlist.image }}
                                resizeMethod='resize'
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
                                    fontWeight: "700",
                                }}
                                >
                                {playlist.name}
                              </Text>
                              <FlatList
                                data={playlist.moods}
                                scrollEnabled={false}
                                keyExtractor={(playlist, index) => index.toString()} 
                                style={{
                                    marginTop: normalize(7),
                                    width: normalize(186),
                                    height: normalize(18),
                                    gap: normalize(3),
                                    flexDirection: "row",
                                }}
                                renderItem={({ item: mood }) => (
                                    <View
                                    style={{
                                        paddingVertical: normalize(2),
                                        paddingHorizontal: normalize(10),
                                        borderRadius: normalize(10),
                                        backgroundColor: getMoodContainerColor(
                                            DOMAINPOSTTYPE.get(category.domainId)
                                            ),
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        >
                                    <Text
                                      // playlistMoodItemText
                                      style={{
                                          fontSize: normalize(12),
                                          fontWeight: "600",
                                          color: getMoodTextColor(
                                              DOMAINPOSTTYPE.get(category.domainId)
                                              ),
                                            }}
                                            >
                                      {mood.name}
                                    </Text>
                                  </View>
                                )}
                                />
                            </View>
                          </View>
                        )}
                        keyExtractor={(domain, index) => index.toString()}  //fetch and use element id from firestore
                        />
                    </LinearGradient>
                    {isAddPlaylistModalVisible && 
                    (
                        <AddPlaylist
                        visible={isAddPlaylistModalVisible}
                        onClose={toggleAddPlaylistModal}
                        onCloseAll={toggleAddPlaylistModal}
                        domainId={category.domainId}
                        postType={DOMAINPOSTTYPE.get(category.domainId) || "default"}
                        hasNewPost={false}
                        />
                        
                        )}
                  </TouchableOpacity>
                        )
                      }