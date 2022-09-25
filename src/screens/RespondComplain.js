//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetStack } from '../services/navigation';
import { PrimaryBotton } from '../components/buttons';
const RespondComplain = (props) => {
    const [respond, setRespond] = useState('')
    const onLogout = () => {
      AsyncStorage.clear();
      resetStack('Login', props);
  }
    return (
        <View 
        onPress={()=>Keyboard.dismiss()}
        style={styles.container}>
          <View style={{backgroundColor:"blue",height:'42%',width:'100%',alignItems:'center'}}>
          <View style={{marginTop:40}}>
          <Icon name="user-circle-o" size={100} color="white"  />
          <Text style={{color:'white',textAlign:'center',marginTop:8,fontSize:14}}>user name</Text>
          </View>

          </View>
          <View style={{backgroundColor:"white",flex:1}}>
          <View style={{alignSelf:'center',height:70,width:'80%',backgroundColor:'white',
          borderRadius:20,position:'absolute',marginTop:-40,flexDirection:'row',alignItems:'center',
          justifyContent:'space-evenly',elevation: 7,}}>
            <View>
              <Text>follow</Text>
              <Text>123</Text>
            </View>
            <View>
              <Text>follow</Text>
              <Text>123</Text>
            </View>
            <View>
              <Text>follow</Text>
              <Text>123</Text>
            </View>
          </View>
           <View>
            <View>
          <Icon name="user-circle-o" size={100} color="white"  />
          <Text>email</Text>
            </View> 
            <View>
          <Icon name="user-circle-o" size={100} color="white"  />
          <Text>email</Text>
            </View>
           </View>
          <PrimaryBotton label='Logout' onPress={onLogout} />

          </View>
          </View>
    );
};

// define your styles
const styles = StyleSheet.create({

    container: {
        flex: 1,
        // alignItems:'center',
       
    },
   
});

//make this component available to the app
export default RespondComplain;
