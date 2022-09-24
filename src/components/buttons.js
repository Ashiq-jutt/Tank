import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { mvs } from '../services/metrices';
export const PrimaryBotton=({
    label='label',
    style,
    textStyle,
    onPress=()=>{},
    disabled,
})=>{
return(
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container,style]}>
    <Text style={[styles.text,textStyle]}>{label}</Text>
</TouchableOpacity>
 );
};
export default App;
const styles = StyleSheet.create({
    container:{paddingVertical:mvs(15),borderRadius:mvs(12),alignItems: 'center',borderWidth:0.7},
    text:{

    }
});