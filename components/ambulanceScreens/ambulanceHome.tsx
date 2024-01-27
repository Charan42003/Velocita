import React, { useState, useEffect } from 'react'
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getLocationAsync, isOnRoadPath } from '../../api/locationService';
import { NavigationProp } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { nav, search } from '../Styles/styles';
import { color } from '../../constants/colors';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setOrigin, setDestination, selectOriginn } from '../../redux/slices/navSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MAP_KEY } from '../../constants/key';
import { AsyncStorage } from 'react-native';

const AmbulanceHome = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const dispatch = useDispatch()
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
                            source={require('../../assets/originMarker.png')}
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
                            source={require('../../assets/originMarker1.png')}
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
                                AsyncStorage.setItem({ "origin": origin })


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

const styles = StyleSheet.create({
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

export default AmbulanceHome