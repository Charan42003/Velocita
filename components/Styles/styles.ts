import { StyleSheet } from "react-native";
import { color } from "../../constants/colors";

export const nav = StyleSheet.create({
    navWrap: {
        position: 'absolute',
        bottom: 10,
        padding: 15,
        width: '94%',
        marginHorizontal: '3%',
        backgroundColor: color.primary,
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    icons: {
        fontSize: 36,
        color: color.greyLight,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    selected: {
        backgroundColor: color.secondary,
        color: '#fff',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 3,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    }
})