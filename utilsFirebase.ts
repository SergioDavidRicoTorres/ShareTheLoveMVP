import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DB } from "./firebaseConfig";
import * as ImagePicker from 'expo-image-picker';
import { Playlist, Post, User } from "./types";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, limit, orderBy, query, runTransaction, setDoc, where } from "firebase/firestore";
import { signOut } from "firebase/auth";

export const addUserToDB = async (user: User, uid: string) => {
    try {
    console.log("ALL GOOD AT addUserToDB()!")
        // Add additional user data to Firestore
        const userDocRef = doc(FIRESTORE_DB, 'users', uid);
        await setDoc(userDocRef, user);

      } catch (error) {
        console.error('Error adding the user to the database: ', error);
      }
  }

  export const addPostToDB = async (post: Post) => {
    try {
        // Add additional user data to Firestore
        const postDocRef = doc(collection(FIRESTORE_DB, 'posts'));
        await setDoc(postDocRef, post);
        // console.log("[STEP 3 ALMOST WORKED]")
        // return postDocRef.id; // This is the ID of the newly added document
      } catch (error) {
        console.error('Error adding the post to the database: ', error);
      }
  }

export const addPlaylistToDB = async (playlist: Playlist) => {
    try {
        // Add additional user data to Firestore
        const playlistDocRef = doc(collection(FIRESTORE_DB, 'playlists'));
        await setDoc(playlistDocRef, playlist);
        console.log("[STEP 3 ALMOST WORKED]")
        return playlistDocRef.id; // This is the ID of the newly added document
      } catch (error) {
        console.error('Error adding the playlist to the database: ', error);
      }
  }



export const uploadImage = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      const imageRef = ref(FIREBASE_STORAGE, `images/${new Date().getTime()}`); // Unique name for the image
  
      await uploadBytes(imageRef, blob);
  
      // Get download URL
      const downloadURL = await getDownloadURL(imageRef);
  
    //   console.log('Image uploaded successfully!');
    //   console.log('Download URL:', downloadURL);
      console.log("[STEP 2 WORKED]")
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
};
  

export const pickImage = async (setSelectedImageUri: (uri: string) => void) => {
    // Request permission
    try {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImageUri(result.assets[0].uri); // This is the local URI of the image
    }
  } catch (error) {
    console.error('Error picking the image: ', error);
  }
  };

  export const fetchUserById = async (userId: string): Promise<User | null> => {
    try {
    const userRef = doc(FIRESTORE_DB, 'users', userId);
    const docSnap = await getDoc(userRef);
  
    if (docSnap.exists()) {
      // console.log('fetchUserById: ', userId);
      return docSnap.data() as User; // Type assertion to User
    } else {
      throw new Error(`No such user with ID: ${userId}`);
    }

    } catch (error) {
        console.error('Error fetching User: ', error);
        return null;
    }
  };

  export const fetchLastPosts = async () => {
      try {
    const postsRef = collection(FIRESTORE_DB, 'posts');
    // Create a query against the collection, ordering by creationTime descending
    const q = query(postsRef, orderBy('creationTime', 'desc'), limit(50));

        const querySnapshot = await getDocs(q);
        const posts: Post[] = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data() as Post;
          postData.postId = doc.id;
          posts.push(postData);
        });
        return posts;
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return [];
    }
};

export const fetchAllUsers = async () => {
  try {
const usersRef = collection(FIRESTORE_DB, 'users');
// Create a query against the collection, ordering by creationTime descending
// const q = query(usersRef, orderBy('creationTime', 'desc'), limit(50));

    const querySnapshot = await getDocs(usersRef);
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data() as User;
      userData.userId = doc.id;
      users.push(userData);
      console.log("USER: ", userData)
    });
    // console.log("[USERS]: ", users)
    return users;
} catch (error) {
    console.error("Error fetching users: ", error);
    return [];
}
};

export const getDomainsPlaylistsData = async (userId: string, domainId?: number) => {
    if (domainId === undefined) {
      return [];
    }
  
    try {
    const playlistsRef = collection(FIRESTORE_DB, "playlists");
  
    const q = query(playlistsRef, where("domainId", "==", domainId), where("userId", "==", userId));
  
        const querySnapshot = await getDocs(q);
        const playlists: Playlist[] = [];
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data() as Playlist;
          playlistData.playlistId = doc.id;
          playlists.push(playlistData);
        });
        return playlists;
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
  };
  
  export const getDomainsPostsData = async (userId: string, domainId?: number) => {
    if (domainId === undefined) {
      return [];
    }
  
    try {
    const postsRef = collection(FIRESTORE_DB, "posts");
    const q = query(postsRef, where("domainId", "==", domainId), where("userId", "==", userId));
  
        const querySnapshot = await getDocs(q);
        const posts: Post[] = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data() as Post;
          postData.postId = doc.id;
          posts.push(postData);
        });
        return posts;
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
  };

  export const handleFirebaseSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.error('Error signing out: ', error);
      // Handle any errors during sign out
    }
  };

// Current user follows another user and updates the followed user's followers list
export async function followUser(currentUserId: string, userIdToFollow: string): Promise<void> {
  const currentUserRef = doc(FIRESTORE_DB, 'users', currentUserId);
  const userToFollowRef = doc(FIRESTORE_DB, 'users', userIdToFollow);

  await runTransaction(FIRESTORE_DB, async (transaction) => {
    const currentUserDoc = await transaction.get(currentUserRef);
    const userToFollowDoc = await transaction.get(userToFollowRef);

    if (!currentUserDoc.exists()) {
      throw new Error("Current user does not exist");
    }
    if (!userToFollowDoc.exists()) {
      throw new Error("User to follow does not exist");
    }

    transaction.update(currentUserRef, {
      followingUsersList: arrayUnion(userIdToFollow),
      followingCount: increment(1)
    });

    transaction.update(userToFollowRef, {
      followersUsersList: arrayUnion(currentUserId),
      followersCount: increment(1)
    });
  });
}


// Current user unfollows another user and updates the unfollowed user's followers list
export async function unfollowUser(currentUserId: string, userIdToUnfollow: string): Promise<void> {
  const currentUserRef = doc(FIRESTORE_DB, 'users', currentUserId);
  const userToUnfollowRef = doc(FIRESTORE_DB, 'users', userIdToUnfollow);

  await runTransaction(FIRESTORE_DB, async (transaction) => {
    const currentUserDoc = await transaction.get(currentUserRef);
    const userToUnfollowDoc = await transaction.get(userToUnfollowRef);

    if (!currentUserDoc.exists()) {
      throw new Error("Current user does not exist");
    }
    if (!userToUnfollowDoc.exists()) {
      throw new Error("User to unfollow does not exist");
    }

    transaction.update(currentUserRef, {
      followingUsersList: arrayRemove(userIdToUnfollow),
      followingCount: increment(-1)
    });

    transaction.update(userToUnfollowRef, {
      followersUsersList: arrayRemove(currentUserId),
      followersCount: increment(-1)
    });
  });
}

  