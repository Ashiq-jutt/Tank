//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
// import Icon2 from 'react-native-vector-icons/dist/FontAwesome'
import Checkbo from 'react-native-vector-icons/dist/Fontisto'
import { PrimaryBotton } from '../components/buttons';
import { mvs } from '../services/metrices';
import { resetStack } from '../services/navigation';
// import {CheckBox} from 'react-native-elements';

// const icon = ;
// create a component
const Setting = (props) => {
    const onLogout = () => {
        AsyncStorage.clear();
        resetStack('Login', props);
    }
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(20), paddingVertical: mvs(40) }}>
                <PrimaryBotton label='Logout' onPress={onLogout} />
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
