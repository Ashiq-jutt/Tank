//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
// import Icon2 from 'react-native-vector-icons/dist/FontAwesome'
import Checkbo from 'react-native-vector-icons/dist/Fontisto'
// import {CheckBox} from 'react-native-elements';

// const icon = ;
// create a component
const Setting = (props) => {
    const onLogout = () => {
        AsyncStorage.clear();
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLogout}>
                <Text>Setting</Text>
            </TouchableOpacity>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});


export default Setting;
