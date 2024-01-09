// styles.js
import { StyleSheet } from "react-native";
import { normalize } from "./utils";

export const sharedStyles = StyleSheet.create({
  selectedMediaItemContainer: {
    width: normalize(339),
    paddingVertical: 0,
    borderRadius: normalize(6),
    flexDirection: "row",
  },
  chooseButtonContainer: {
    position: "absolute",
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(9),
    borderRadius: normalize(15),
    bottom: normalize(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "background: rgba(152, 152, 152, 1)",
  },
  touchableChooseButtonContainer: {
    position: "absolute",
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(5),
    borderRadius: normalize(15),
    bottom: normalize(50),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: normalize(10),
  },
  chooseButtonText: {
    fontWeight: "700",
    fontSize: normalize(22),
    color: "white",
  },
});
