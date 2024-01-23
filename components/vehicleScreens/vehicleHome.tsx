import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const VehicleHome = () => {
    return (
        <View
            style={
                {
                    flex: 1,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    paddingTop: 200
                }
            }
        >
            <Text>VehicleHome</Text>
            <View>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: '',
                        // key: '',
                        language: 'en',
                        location: 'IN'
                    }}
                    enablePoweredByContainer={false}
                />
            </View>
        </View>
    )
}

export default VehicleHome