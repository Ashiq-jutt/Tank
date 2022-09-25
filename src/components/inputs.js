import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text } from 'react-native';
import { mvs } from '../services/metrices';
import colors from './../services/colors';
export const CustomInput = ({
    label = 'Offer Price',
    value = '',
    placeholder = 'Offer Price',
    onChangeText=(t)=>{},
    keyboardType='default',
    editable=true,
}) => {
    return (
        <View style={{marginTop:mvs(20)}}>
            <Text style={{fontWeight:'500'}}>{label}</Text>
            <TextInput editable={editable} value={value} keyboardType={keyboardType} onChangeText={onChangeText} style={styles.input} placeholder={placeholder} />
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 0.7,
        borderColor:colors.border,
    }
});