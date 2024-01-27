import React, { useState, useEffect } from 'react'
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MapView, { Marker } from 'react-native-maps';
import { getLocationAsync, isOnRoadPath } from '../../api/locationService';
import { NavigationProp } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { nav, search, styles } from '../Styles/styles';
import { color } from '../../constants/colors';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
// import { setOrigin, setDestination, selectOriginn } from '../../redux/slices/navSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MAP_KEY } from '../../constants/key';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OriginMap from './mapScreens/origin';
import DestinationMap from './mapScreens/destination';
import FinalMap from './mapScreens/final';

const AmbulanceHome = ({ navigation }: { navigation: NavigationProp<any> }) => {

    const [origin, setOrigin] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.008,
        longitudeDelta: 0.007,
    })
    const [destination, setDestination] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.008,
        longitudeDelta: 0.007,
    })
    const [name, setName] = useState("name")
    const Stack = createNativeStackNavigator()
    useEffect(() => {
        const handleLocationChange = async (name: string) => {
            const location = await getLocationAsync();
            if (!location) return;
            const { latitude, longitude } = location;

            const current_location = {
                coordinates: {
                    latitude: latitude,
                    longitude: longitude,
                    pincode: 560087
                }
            }

            setOrigin({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.007,
            })

            // console.log(`(amb.) ${na} ↓`)
            // console.log(current_location)
        };


        // Set up location tracking
        const locationTask = setInterval(() => handleLocationChange(name), 10000);
        return () => clearInterval(locationTask);
    }, [name]);


    const ambulanceAlert = (msg: string) => {
        alert("Alert Created!!")
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                {/* <OriginMap /> */}
                {/* <DestinationMap /> */}
                {/* <FinalMap /> */}

                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='Home'
                    >
                        <Stack.Screen name="OriginMap" component={OriginMap} options={{ headerShown: false }} />
                        <Stack.Screen name="DestinationMap" component={DestinationMap} options={{ headerShown: false }} />
                        <Stack.Screen name="FinalMap" component={FinalMap} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>

                {/* Bottom Nav Start  */}
                <View style={nav.navWrap}>
                    <TouchableOpacity>
                        <Icon name="home" style={[nav.icons, nav.selected]} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="compass" style={nav.icons} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="comments" style={nav.icons} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="user" style={nav.icons} />
                    </TouchableOpacity>
                </View>
                {/* Bottom Nav End  */}
            </SafeAreaView>
            <StatusBar backgroundColor={color.primary} />
        </View>
    );
}



export default AmbulanceHome