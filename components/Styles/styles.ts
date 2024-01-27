import { StyleSheet } from "react-native";
import { color } from "../../constants/colors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    touch: {
        position: 'absolute',
        bottom: 20,
        zIndex: 333,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        gap: 30,
    },
    txt: {
        fontSize: 20,
        color: 'white',
        backgroundColor: "#bd0808e8",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
});
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