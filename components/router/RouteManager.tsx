import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../home/Home'
import AmbulanceHome from '../ambulanceScreens/ambulanceHome'
import VehicleHome from '../vehicleScreens/vehicleHome'

const RouteManager = () => {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AmbulanceHome" component={AmbulanceHome} />
                <Stack.Screen name="VehicleHome" component={VehicleHome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RouteManager