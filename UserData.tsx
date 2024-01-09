// import firebase from './firebaseService';

// // Function to read user data from the Firebase database
// export const getUserData = async (userId) => {
//   try {
//     const snapshot = await firebase.database().ref(`users/${userId}`).once('value');
//     return snapshot.val();
//   } catch (error) {
//     console.error('Error reading user data:', error);
//   }
// };

// // Function to write user data to the Firebase database
// export const setUserData = async (userId, userData) => {
//   try {
//     await firebase.database().ref(`users/${userId}`).set(userData);
//     console.log('User data saved successfully!');
//   } catch (error) {
//     console.error('Error saving user data:', error);
//   }
// };
import currentUser from "./DummyData/currentUserDataExample.json";
import defaultUser from "./DummyData/defaultUser.json";
export const getCurrentUserData = () => {
  try {
    return currentUser;
  } catch (error) {
    console.error("Error fetching current user data:", error);
    return defaultUser;
  }
};
