import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Dimensions,
  FlatList
} from "react-native";
import { normalize } from "../utils";
import { MediaItemInfoProps } from "../types";

const { width } = Dimensions.get("window"); // screen width constant

const getMediaInfoComponent = (mediaItem: any) => {
  try {
    if (mediaItem.mediaType === "Song") {
      return (
        <View
          style={{
            gap: normalize(15),
            alignItems: "center",
            marginVertical: normalize(20),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: normalize(10),
              justifyContent: "center",
              gap: normalize(10),
            }}
          >
            <Text
              style={{
                color: "rgba(255, 184, 0, 1)",
                fontSize: normalize(25),
                fontWeight: "700",
              }}
            >
              name:
            </Text>
            <ScrollView
              style={{
                paddingVertical: normalize(2),
                paddingHorizontal: normalize(21),
                // justifyContent: "center",
                // alignItems: "flex-start",
                backgroundColor: "rgba(255, 184, 0, 1)",
                borderRadius: normalize(15),
                // maxHeight: normalize(25),
                maxWidth: normalize(260),
              }}
              horizontal
            >
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(18),
                  fontWeight: "400",
                }}
              >
                {mediaItem.name}
              </Text>
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: normalize(10),
              justifyContent: "center",
              gap: normalize(10),
            }}
          >
            <Text
              style={{
                color: "rgba(255, 184, 0, 1)",
                fontSize: normalize(25),
                fontWeight: "700",
              }}
            >
              album:
            </Text>
            <ScrollView
              style={{
                paddingVertical: normalize(2),
                paddingHorizontal: normalize(21),
                // justifyContent: "center",
                // alignItems: "flex-start",
                backgroundColor: "rgba(255, 184, 0, 1)",
                borderRadius: normalize(15),
                // maxHeight: normalize(25),
                maxWidth: normalize(260),
              }}
              horizontal
            >
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(18),
                  fontWeight: "400",
                }}
              >
                {mediaItem.album}
              </Text>
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: normalize(10),
              justifyContent: "center",
              gap: normalize(10),
            }}
          >
            <Text
              style={{
                color: "rgba(255, 184, 0, 1)",
                fontSize: normalize(25),
                fontWeight: "700",
              }}
            >
              artists:
            </Text>
            <ScrollView
              style={{
                paddingVertical: normalize(2),
                paddingHorizontal: normalize(21),
                // justifyContent: "center",
                // alignItems: "flex-start",
                backgroundColor: "rgba(255, 184, 0, 1)",
                borderRadius: normalize(15),
                // maxHeight: normalize(25),
                maxWidth: normalize(260),
              }}
              horizontal
            >
              <FlatList
                data={mediaItem.artists}
                scrollEnabled={false}
                horizontal
                style={
                  {
                    // flexDirection: "row",
                    // alignItems: "center",
                    // justifyContent:
                    //   mediaItem.artists.length > 1 ? "flex-start" : "center",
                    // maxWidth: 165,
                    // overflow: "hidden",
                    // marginHorizontal: 5,
                  }
                }
                // keyExtractor={(item) => item.id.toString()} // Change this to your key extractor function
                ItemSeparatorComponent={() => (
                  <Text
                    style={{
                      color: "white",
                      fontSize: normalize(18),
                      fontWeight: "400",
                    }}
                  >
                    {" "}
                    -{" "}
                  </Text>
                )}
                renderItem={({ item: mood }) => (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "rgba(58, 17, 90, 1)",
                      fontSize: normalize(18),
                      fontWeight: "400",
                    }}
                  >
                    {mood.name}
                  </Text>
                )}
              />
            </ScrollView>
          </View>
        </View>
      );
    }
    if (mediaItem.mediaType === "Film" || mediaItem.mediaType === "TV Show") {
      return (
        <View style={{ gap: normalize(15), marginVertical: normalize(20) }}>
          <View
            style={{
              //   flexDirection: "row",
              //   marginHorizontal: normalize(10),
              justifyContent: "center",
              gap: normalize(10),
            }}
          >
            <Text
              style={{
                color: "rgba(255, 184, 0, 1)",
                fontSize: normalize(25),
                fontWeight: "700",
              }}
            >
              name:
            </Text>
            <ScrollView
              style={{
                paddingVertical: normalize(2),
                paddingHorizontal: normalize(21),
                // justifyContent: "center",
                // alignItems: "flex-start",
                backgroundColor: "rgba(255, 184, 0, 1)",
                borderRadius: normalize(15),
                maxHeight: normalize(28),
                // maxWidth: 300,
                marginHorizontal: normalize(10),
              }}
              horizontal
            >
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(18),
                  fontWeight: "400",
                }}
                // numberOfLines={4}
              >
                {mediaItem.name}
              </Text>
            </ScrollView>
          </View>

          <View
            style={{
              //   flexDirection: "row",
              //   marginHorizontal: normalize(10),
              justifyContent: "center",
              gap: normalize(10),
            }}
          >
            <Text
              style={{
                color: "rgba(255, 184, 0, 1)",
                fontSize: normalize(25),
                fontWeight: "700",
              }}
            >
              overview:
            </Text>
            <ScrollView
              style={{
                paddingVertical: 5,
                paddingHorizontal: normalize(15),
                backgroundColor: "rgba(255, 184, 0, 1)",
                borderRadius: normalize(15),
                // maxWidth: 300,
                marginHorizontal: normalize(10),
                maxHeight: normalize(150),
              }}
            >
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(18),
                  fontWeight: "400",
                }}
              >
                {mediaItem.overview}
              </Text>
            </ScrollView>
          </View>
        </View>
      );
    }
    if (mediaItem.mediaType === "Episodes") {
      return (
        <View style={{ gap: normalize(15), marginVertical: normalize(20) }}>
          <View
            style={{
              //   flexDirection: "row",
              //   marginHorizontal: normalize(10),
              justifyContent: "center",
              gap: normalize(10),
            }}
          >
            <Text
              style={{
                color: "rgba(255, 184, 0, 1)",
                fontSize: normalize(25),
                fontWeight: "700",
              }}
            >
              name:
            </Text>
            <ScrollView
              style={{
                paddingVertical: normalize(2),
                paddingHorizontal: normalize(21),
                // justifyContent: "center",
                // alignItems: "flex-start",
                backgroundColor: "rgba(255, 184, 0, 1)",
                borderRadius: normalize(15),
                maxHeight: normalize(28),
                // maxWidth: 300,
                marginHorizontal: normalize(10),
              }}
              horizontal
            >
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(18),
                  fontWeight: "400",
                }}
                // numberOfLines={4}
              >
                {mediaItem.name}
              </Text>
            </ScrollView>
          </View>

          <View
            style={{
              //   flexDirection: "row",
              //   marginHorizontal: normalize(10),
              justifyContent: "center",
              gap: normalize(10),
            }}
          >
            <Text
              style={{
                color: "rgba(255, 184, 0, 1)",
                fontSize: normalize(25),
                fontWeight: "700",
              }}
            >
              description:
            </Text>
            <ScrollView
              style={{
                paddingVertical: 5,
                paddingHorizontal: normalize(15),
                backgroundColor: "rgba(255, 184, 0, 1)",
                borderRadius: normalize(15),
                // maxWidth: 300,
                marginHorizontal: normalize(10),
                maxHeight: normalize(150),
              }}
            >
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(18),
                  fontWeight: "400",
                }}
              >
                {mediaItem.description}
              </Text>
            </ScrollView>
          </View>
        </View>
      );
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function MediaItemInfo({ visible, onClose, mediaItem }: MediaItemInfoProps) {
  return (
    <View style={{ flex: 0.2 }}>
      <Modal visible={visible} animationType="slide" transparent>
        <View
          style={{
            position: "absolute",
            bottom: normalize(20),
            justifyContent: "flex-end",
            alignSelf: "center",
            alignItems: "center",
            // backgroundColor: "white",

            width: normalize(363),
            // height: 275,
            backgroundColor: "rgba(58, 17, 90, 0.95)",
            borderRadius: normalize(20),
            paddingTop: normalize(15),
            paddingHorizontal: normalize(10),
          }}
        >
          <View
            // modalHeaderContainer
            style={{
              flexDirection: "row",
              alignItems: "center",
              top: normalize(9),
              position: "absolute",
              width: normalize(20),
              height: normalize(20),
              right: normalize(9),
              //   backgroundColor: "white",
            }}
          >
            {/* Back Button */}
            <TouchableOpacity
              // backButtonContainer
              onPress={onClose}
            >
              {/* Back Button Image */}
              <Image
                source={require("../assets/icons/CancelButtonYellow.png")}
                style={{
                  //   top: normalize(9),
                  //   position: "absolute",
                  width: normalize(20),
                  height: normalize(20),
                  //   right: normalize(9),
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: "rgba(255, 184, 0, 1)",
              fontSize: normalize(30),
              fontWeight: "800",
            }}
          >
            {mediaItem.mediaType}
          </Text>
          {/* <View style={{ alignItems: "flex-start", backgroundColor: "white" }}> */}
          {getMediaInfoComponent(mediaItem)}
          {/* </View> */}
          {/* <View style={{ gap: normalize(15), alignItems: "center", marginVertical: 20 }}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: normalize(10),
                justifyContent: "center",
                gap: normalize(10),
              }}
            >
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(25),
                  fontWeight: "700",
                }}
              >
                name:
              </Text>
              <View
                style={{
                  paddingVertical: normalize(2),
                  paddingHorizontal: normalize(21),
                  justifyContent: "center",
                  backgroundColor: "rgba(55, 28, 93, 1)",
                  borderRadius: normalize(15),
                }}
              >
                <Text style={{ color: "white", fontSize: normalize(18), fontWeight: 400 }}>
                  {mediaItem.name}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: normalize(10),
                justifyContent: "center",
                gap: normalize(10),
              }}
            >
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(25),
                  fontWeight: "700",
                }}
              >
                album:
              </Text>
              <View
                style={{
                  paddingVertical: normalize(2),
                  paddingHorizontal: normalize(21),
                  justifyContent: "center",
                  backgroundColor: "rgba(55, 28, 93, 1)",
                  borderRadius: normalize(15),
                }}
              >
                <Text style={{ color: "white", fontSize: normalize(18), fontWeight: 400 }}>
                  {mediaItem.album}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "rgba(58, 17, 90, 1)",
                  fontSize: normalize(25),
                  fontWeight: "700",
                }}
              >
                artists:
              </Text>
              <View
                style={{
                  paddingVertical: normalize(2),
                  paddingHorizontal: normalize(21),
                  justifyContent: "center",
                  backgroundColor: "rgba(55, 28, 93, 1)",
                  borderRadius: normalize(15),
                  maxWidth: 250,
                }}
              >
                <FlatList
                  data={mediaItem.artists}
                  scrollEnabled={true}
                  horizontal={true}
                  style={
                    {
                      // flexDirection: "row",
                      // alignItems: "center",
                      // justifyContent:
                      //   mediaItem.artists.length > 1 ? "flex-start" : "center",
                      // maxWidth: 165,
                      // overflow: "hidden",
                      // marginHorizontal: 5,
                    }
                  }
                  // keyExtractor={(item) => item.id.toString()} // Change this to your key extractor function
                  ItemSeparatorComponent={() => (
                    <Text
                      style={{
                        color: "white",
                        fontSize: normalize(18),
                        fontWeight: "400",
                      }}
                    >
                      {" "}
                      -{" "}
                    </Text>
                  )}
                  renderItem={({ item }) => {
                    return (
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "white",
                          fontSize: normalize(18),
                          fontWeight: "400",
                        }}
                      >
                        {item}
                      </Text>
                    );
                  }}
                />
              </View>
            </View>
          </View> */}
          {mediaItem.mediaType !== "Film" &&
            mediaItem.mediaType !== "TV Show" && (
              <TouchableOpacity style={{ bottom: 0 }}>
                <Image
                  style={{ width: normalize(202), height: normalize(65) }}
                  source={require("../assets/icons/SpotifyButton.png")}
                />
              </TouchableOpacity>
            )}
        </View>
      </Modal>
    </View>
  );
}
