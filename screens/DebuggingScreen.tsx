import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import moodsAndTags from "../assets/moodsAndTags.json"; // Adjust the path according to your project structure
import { FIRESTORE_DB } from "../firebaseConfig";

const UploadMoodsAndTags = () => {
  const uploadDataToFirestore = async () => {
    try {
      // JSON data is imported directly from the file
      const data = moodsAndTags;

      // Reference to Firestore document
      const docRef = doc(FIRESTORE_DB, "MoodsAndTags", "MoodsAndTagsData");

      // Upload data
      await setDoc(docRef, data);

      console.log("Data uploaded successfully.");
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={uploadDataToFirestore}
        style={{ padding: 10, backgroundColor: "blue" }}
      >
        <Text style={{ color: "white" }}>Upload Moods and Tags</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadMoodsAndTags;
