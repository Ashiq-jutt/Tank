import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { mvs } from '../services/metrices';
import colors from './../services/colors';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
export const AppHeader = ({
    title='title',
    style,
}) => {
   const navigation =useNavigation();
    return (
        <View style={[styles.container,style]}>
            <TouchableOpacity onPress={()=>navigation?.goBack()}>
                <Icon color={colors.primary} name='back'/>
            </TouchableOpacity>
            <Text style={[styles.text]}>{title}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        height:mvs(50),
        backgroundColor:colors.secondary,
        paddingHorizontal:mvs(20),
        alignItems:'center',
        flexDirection:'row',
    },
    text:{
        color:colors.primary,
        paddingHorizontal:mvs(20)
    }
});
