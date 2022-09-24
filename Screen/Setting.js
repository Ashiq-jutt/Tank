//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
// import Icon2 from 'react-native-vector-icons/dist/FontAwesome'
import Checkbo from 'react-native-vector-icons/dist/Fontisto'
import { PrimaryBotton } from '../src/components/buttons';
import { mvs } from '../src/services/metrices';
import { resetStack } from '../src/services/navigation';
// import {CheckBox} from 'react-native-elements';

// const icon = ;
// create a component
const Setting = (props) => {
    const onLogout = () => {
        AsyncStorage.clear();
        resetStack('Login',props);
    }
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1,paddingHorizontal:mvs(20),paddingVertical:mvs(40)}}>
            {/* <TouchableOpacity style={{paddingVertical:mvs(15),borderRadius:mvs(12),alignItems: 'center',borderWidth:0.7}} onPress={onLogout}>
                <Text>Logout</Text>
            </TouchableOpacity> */}
            <PrimaryBotton label='Logout' onPress={onLogout}/>
            </ScrollView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Setting;
