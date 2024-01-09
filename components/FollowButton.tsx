import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity } from "react-native";
import { useCurrentUser } from "../CurrentUserContext";
import { normalize } from "../utils";
import { followUser, unfollowUser } from "../utilsFirebase";

// Import or define normalize, followUser, unfollowUser

type FollowButtonProps = {
  profileUserId: string; // The ID of the user whose profile is being viewed
};

const FollowButton = ({ profileUserId }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useCurrentUser();
  const currentUserId = currentUser?.userId;
  if (!currentUserId) {
    // Handle the case where currentUser is null
    // This could be a loading indicator, a message, or a redirect
    return <div>Loading userId...</div>;
  }

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const followingList = currentUser
          ? (currentUser.followingUsersList as string[])
          : [];
        setIsFollowing(followingList?.includes(profileUserId));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
      setIsLoading(false);
    };

    if (currentUser) {
      checkIfFollowing();
    }
  }, [currentUser, profileUserId]);

  // Define followUser and unfollowUser functions here or import them

  const handleFollow = async () => {
    try {
      await followUser(currentUserId, profileUserId);
      setIsFollowing(true);
    } catch (error) {
      console.error("Follow operation failed:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(currentUserId, profileUserId);
      setIsFollowing(false);
    } catch (error) {
      console.error("Unfollow operation failed:", error);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // or any other loading indicator
  }

  return (
    <TouchableOpacity onPress={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? (
        // Following state UI
        <View
          style={{
            paddingVertical: normalize(2),
            paddingHorizontal: normalize(30),
            borderRadius: normalize(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(1, 4, 43, 1)",
            borderColor: "rgba(91, 46, 167, 1)",
            borderWidth: normalize(5),
          }}
        >
          <Text
            style={{
              color: "rgba(186, 129, 255, 1)",
              fontSize: normalize(25),
              fontWeight: "700",
            }}
          >
            Following
          </Text>
        </View>
      ) : (
        // Follow state UI
        <LinearGradient
          colors={["rgba(156, 75, 255, 1)", "rgba(95, 110, 231, 1)"]} // Specify the colors for the gradient
          style={{
            paddingVertical: normalize(2),
            paddingHorizontal: normalize(30),
            borderRadius: normalize(15),
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "rgba(156, 75, 255, 1)",
            borderColor: "rgba(91, 46, 167, 1)",
            borderWidth: normalize(5),
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: normalize(25),
              fontWeight: "700",
            }}
          >
            Follow
          </Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default FollowButton;
