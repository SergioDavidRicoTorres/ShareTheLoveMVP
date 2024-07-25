import { useState, useRef } from "react";
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
  Platform,
  StatusBar,
  Alert,
  Button,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCurrentUserData } from "../UserData";
import MediaItemInfo from "../components/MediaItemInfo";
import {
  Domain,
  PostsViewScreenRouteProp,
  ProfileNavigationProp,
} from "../types";
import {
  getScreenGradientFirstColor,
  getMoodTextColor,
  getMoodContainerColor,
  getItemImage,
  getItemTitle,
  getSearchBarColor,
} from "../utils";
import { DOMAINPOSTTYPE } from "../constants";
import { normalize } from "../utils";
import {
  openSpotifyLink,
  playSpotifyPreviewSound,
  stopSpotifyPreviewSound,
} from "../utilsData";
import { Audio } from "expo-av";
import BigPostCard from "../components/BigPostCard";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window"); // screen width constant

export default function PostsViewScreen() {
  const route = useRoute<PostsViewScreenRouteProp>();
  const navigation = useNavigation<ProfileNavigationProp>();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { posts, playlist, user, index } = route.params;
  const domainId = playlist.domainId;
  const postCardSeparatorWidth = normalize(0); // Width of the separator

  // Optional Modal Boolean State
  const [isMediaItemInfoModalVisible, setIsMediaItemInfoModalVisible] =
    useState(false);

  // Optional Modal show Function
  const toggleMediaItemInfoModal = () => {
    setIsMediaItemInfoModalVisible(!isMediaItemInfoModalVisible);
  };

  // Ref and state for FlatList
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(index || 0);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  return (
    <LinearGradient
      colors={[getScreenGradientFirstColor(domainId), "rgba(1, 4, 43, 1)"]} // Specify the colors for the gradient
      style={styles.container}
    >
      <StatusBar
        backgroundColor={getScreenGradientFirstColor(domainId)}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.container}>
        <View style={{ width }}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ left: normalize(10) }}
          >
            <Image
              source={require("../assets/icons/ArrowBack.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: normalize(325),
            paddingVertical: normalize(5),
            backgroundColor: getMoodContainerColor(
              DOMAINPOSTTYPE.get(domainId)
            ),
            borderRadius: normalize(15),
            marginBottom: normalize(10),
          }}
        >
          <Text
            style={{
              color: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
              fontSize: normalize(24),
              fontWeight: "700",
              textAlign: "center",
              alignSelf: "center",
            }}
            numberOfLines={1}
          >
            {playlist.name}
          </Text>
        </View>

        <FlatList
          ref={flatListRef}
          style={{ width: width }}
          data={posts}
          horizontal
          scrollEnabled={false}
          initialScrollIndex={index}
          snapToAlignment="center"
          snapToInterval={width}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: postCardSeparatorWidth,
              }}
            />
          )}
          renderItem={({ item: post, index }) => (
            <>
              <View
                style={{
                  marginHorizontal: (width - normalize(325)) / 2,
                }}
              >
                <BigPostCard post={post} domainId={domainId} user={user} />
              </View>
              {index != 0 && (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    alignSelf: "flex-start",
                    top: normalize(250),
                    left: normalize(5),
                  }}
                  onPress={handlePrevious}
                >
                  <Image
                    style={{
                      width: normalize(40),
                      height: normalize(36),
                      tintColor: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
                    }}
                    source={require("../assets/icons/DoubleLeftArrowIcon.png")}
                  />
                </TouchableOpacity>
              )}

              {index < posts.length - 1 && (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    top: normalize(250),
                    right: normalize(5),
                  }}
                  onPress={handleNext}
                >
                  <Image
                    style={{
                      width: normalize(40),
                      height: normalize(36),
                      tintColor: getMoodTextColor(DOMAINPOSTTYPE.get(domainId)),
                    }}
                    source={require("../assets/icons/DoubleRightArrowIcon.png")}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
          keyExtractor={(post, index) => index.toString()}
        />
        {/* <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-start",
            top: normalize(400),
            left: normalize(5),
          }}
          onPress={handlePrevious}
        >
          <Image
            style={{
              width: normalize(40),
              height: normalize(36),
            }}
            source={require("../assets/icons/DoubleLeftArrowIcon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            top: normalize(400),
            right: normalize(5),
          }}
          onPress={handleNext}
        >
          <Image
            style={{
              width: normalize(40),
              height: normalize(36),
            }}
            source={require("../assets/icons/DoubleRightArrowIcon.png")}
          />
        </TouchableOpacity> */}

        {/* <View style={styles.navigationButtons}>
          <Button title="Previous" onPress={handlePrevious} />
          <Button title="Next" onPress={handleNext} />
        </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  moodContainer: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    marginHorizontal: normalize(5),
  },
  moodText: {
    fontWeight: "600",
    fontSize: normalize(18),
  },
  backButtonImage: {
    width: normalize(17),
    height: normalize(28),
  },
  navigationButtons: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignSelf: "center",
    top: normalize(300),
    margin: 10,
    width: "80%",
    gap: normalize(300),
  },
});
