import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>Home</Text>
            <Button
                title='Ambulance'
                onPress={() => navigation.navigate("AmbulanceHome")}
            />
            <View style={{
                marginTop: 5
            }}></View>
            <Button
                title='Vehicle'
                onPress={() => navigation.navigate("VehicleHome")}
            />
        </View>
    )
}

export default Home