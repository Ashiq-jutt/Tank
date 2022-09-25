import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { mvs } from '../services/metrices';
import colors from './../services/colors';
export const PrimaryBotton=({
    label='label',
    style,
    textStyle,
    onPress=()=>{},
    disabled,
    loading=false,

})=>{
return(
    <TouchableOpacity disabled={disabled||loading} onPress={onPress} style={[styles.container,style]}>
    {loading?
    <ActivityIndicator size={'small'} color={colors.white}/>
    :<Text style={[styles.text,textStyle]}>{label}</Text>}
</TouchableOpacity>
 );
};
const styles = StyleSheet.create({
    container:{paddingVertical:mvs(15),borderRadius:mvs(12),alignItems: 'center',borderWidth:0.7},
    text:{

    }
});