import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import { getLocationAsync, isOnRoadPath } from '../../api/locationService';
import { NavigationProp } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { nav, search } from '../Styles/styles';
import { color } from '../../constants/colors';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AmbulanceHome = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [mapRegion, setMapRegion] = useState({
        latitude: 13.0148065,
        longitude: 77.7062458,
        latitudeDelta: 0.05,
        longitudeDelta: 0.04,
    })
    const [destination, setDestination] = useState({
        latitude: 13.0407259,
        longitude: 77.692543,
        latitudeDelta: 0.05,
        longitudeDelta: 0.04,
    })
    const [name, setName] = useState("name")

    useEffect(() => {
        const handleLocationChange = async (name: string) => {
            const location = await getLocationAsync();
            if (!location) return;
            const { latitude, longitude } = location;
            let response = await Location.reverseGeocodeAsync({
                latitude: latitude,
                longitude: longitude,
            })
            const current_location = {
                coordinates: {
                    latitude: latitude,
                    longitude: longitude,
                    pincode: response[0].postalCode
                }
            }

            setMapRegion({
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
            {/* Map View Start  */}
            <MapView style={styles.map}
                region={mapRegion}
            >
                <Marker coordinate={mapRegion} title="Marker">
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 50,
                            padding: 5,
                            borderColor: color.green,
                            borderWidth: 6
                        }}
                    >
                    </View>
                </Marker>
                <Marker coordinate={destination} title="Marker">
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 50,
                            padding: 5,
                            borderColor: 'red',
                            borderWidth: 6
                        }}
                    >
                    </View>
                </Marker>

                {/* Direction view  */}
                <MapViewDirections
                    origin={mapRegion}
                    destination={destination}
                    // apikey={''}
                    apikey={''}
                    strokeWidth={5}
                    mode='DRIVING'
                    strokeColor={color.secondary}
                />
            </MapView>
            {/* Map View End  */}

            {/* Search places Start  */}
            <View style={search.pickupSearch}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        // key: '',
                        key: '',
                        language: 'en',
                    }}
                />
            </View>
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





            {/* Temp Components  */}
            {/* <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    padding: 5,
                    backgroundColor: color.green,
                    borderRadius: 50,
                    borderColor: color.primary,
                    borderWidth: 5
                }}
                onPress={() => navigation.navigate("Home")}
            >
            </TouchableOpacity> */}
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