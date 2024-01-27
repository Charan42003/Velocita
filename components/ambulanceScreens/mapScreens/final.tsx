import React, { useState, useEffect } from 'react'
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getLocationAsync, isOnRoadPath } from '../../../api/locationService';
import { NavigationProp } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { nav, search, styles } from '../../Styles/styles';
import { color } from '../../../constants/colors';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
// import { setOrigin, setDestination, selectOriginn } from '../../redux/slices/navSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MAP_KEY } from '../../../constants/key';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FinalMap = () => {
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

    useState(async () => {
        const jsonValue = await AsyncStorage.getItem('Origin');
        const d = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(d)
        console.log(d.latitude)
        console.log(d.longitude)
        setDestination({
            latitude: d.la,
            longitude: 0,
            latitudeDelta: 0.008,
            longitudeDelta: 0.007,
        })
    })

    return (
        <View>
            {/* Map View Start  */}
            <MapView style={styles.map}
                region={origin}
            // mapType={MapType.satellite}
            >
                <Marker coordinate={origin} title="Marker">
                    {/* <View
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                padding: 5,
                                borderColor: color.green,
                                borderWidth: 6
                            }}
                        >
                        </View> */}
                    <Image
                        source={require('../../../assets/originMarker.png')}
                        style={{
                            width: 35,
                            height: 35,
                            resizeMode: 'contain'
                        }}
                    />
                </Marker>
                <Marker coordinate={destination} title="Marker">
                    {/* <View
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                padding: 5,
                                borderColor: 'red',
                                borderWidth: 6
                            }}
                        >
                        </View> */}
                    <Image
                        source={require('../../../assets/originMarker1.png')}
                        style={{
                            width: 35,
                            height: 35,
                            resizeMode: 'contain'
                        }}
                    />
                </Marker>

                {/* Direction view  */}
                {
                    (origin.longitude != 0 && destination.longitude != 0) && (
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={MAP_KEY}
                            strokeWidth={5}
                            mode='DRIVING'
                            strokeColor={color.secondary}
                        />
                    )
                }

            </MapView>
            {/* Map View End  */}

            {/* Search places Start  */}
            {/* <View style={search.pickupSearch}> */}
            <GooglePlacesAutocomplete
                placeholder='Your current location'
                styles={{
                    container: {
                        flex: 0,
                        position: 'absolute',
                        top: 10,
                        left: 0,
                        marginHorizontal: "3%",
                        width: '94%'
                    },
                    textInput: {
                        fontSize: 18,
                        height: 50,
                        borderRadius: 30,
                        elevation: 6,
                        shadowColor: color.primary,
                        paddingLeft: 30
                    }
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                enablePoweredByContainer={false}
                onPress={(data, details) => {
                    // const latitude = details.geometry.location.lat;
                    // const longitude = details.geometry.location.lng;
                    console.log(details.place_id)
                    // console.log(`${latitude}, ${longitude}`)
                    const fetchCoordinates = async () => {
                        console.log("Hello")
                        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&key=${MAP_KEY}`;
                        try {
                            const response = await fetch(apiUrl);
                            const placeDetails = await response.json();
                            const coordinates = placeDetails.result.geometry.location;
                            console.log("Latitude:", coordinates.lat);
                            console.log("Longitude:", coordinates.lng);
                            setOrigin({
                                latitude: coordinates.lat,
                                longitude: coordinates.lng,
                                latitudeDelta: 0.008,
                                longitudeDelta: 0.007,
                            })
                            const jsonValue = JSON.stringify(origin);
                            await AsyncStorage.setItem('Origin', jsonValue);


                        } catch (error) {
                            console.error("Error fetching coordinates:", error);
                        }
                    };
                    fetchCoordinates()
                }}
                query={{
                    key: MAP_KEY,
                    language: 'en',
                }}
            />
            {/* </View> */}
            {/* Search places End  */}
        </View>
    )
}

export default FinalMap