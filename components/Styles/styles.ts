import { StyleSheet } from "react-native";
import { color } from "../../constants/colors";

export const nav = StyleSheet.create({
    navWrap: {
        position: 'absolute',
        bottom: 10,
        padding: 10,
        width: '96%',
        marginHorizontal: '2%',
        backgroundColor: color.primary,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    icons: {
        fontSize: 30,
        color: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    selected: {
        backgroundColor: color.secondary,
        color: '#fff',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 10,
    }
})

export const search = StyleSheet.create({
    pickupSearch: {
        position: 'absolute',
        top: 26,
        width: '94%',
        marginHorizontal: '3%',
        overflow: 'hidden',
        borderRadius: 30,
        height: 50,
        backgroundColor: '#fff',
        paddingLeft: 25
    }
})