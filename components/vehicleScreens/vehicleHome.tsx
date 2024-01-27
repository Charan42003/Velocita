import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clickk = async () => {
    const jsonValue = await AsyncStorage.getItem('my-key');
    const aa = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(aa)
}

const VehicleHome = () => {
    return (
        <View
            style={
                {
                    flex: 1,
                    backgroundColor: 'grey',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    paddingTop: 200
                }
            }
        >
            <Text>VehicleHome</Text>
            <Button
                title='click me'
                onPress={() => clickk()}
            />
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