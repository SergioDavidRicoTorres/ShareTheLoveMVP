// styles.js
import { StyleSheet } from 'react-native';
import { normalize } from './utils';

export const sharedStyles = StyleSheet.create({
    selectedMediaItemContainer: {
        width: normalize(339),
        paddingVertical: 0,
        borderRadius: normalize(6),
        flexDirection: "row",
    },
});
