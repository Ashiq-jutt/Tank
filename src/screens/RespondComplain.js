//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Email from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetStack } from '../services/navigation';
import { useSelector } from 'react-redux';
import colors from '../services/colors';
const RespondComplain = (props) => {
    const [respond, setRespond] = useState('')

  const userInfo =useSelector(s=>s?.user?.userInfo);
  console.log('..............   ',userInfo);

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
          <Text style={{color:'white',textAlign:'center',marginTop:8,fontSize:14}}>{userInfo.name}</Text>
          </View>

          </View>
          <View style={{backgroundColor:"white",flex:1}}>
          <View style={{alignSelf:'center',height:70,width:'80%',backgroundColor:'white',
          borderRadius:20,position:'absolute',marginTop:-40,flexDirection:'row',alignItems:'center',
          justifyContent:'space-evenly',elevation: 7,}}>
            <View>
              <Text>total order</Text>
              <Text style={{alignSelf:'center'}}>3</Text>
            </View>
            <View>
              <Text>pending order</Text>
              <Text style={{alignSelf:'center'}}>1</Text>
            </View>
            <View >
              <Text>complete order</Text>
              <Text style={{alignSelf:'center'}}>2</Text>
            </View>
          </View>
           <View style={{marginTop:50,height:180,justifyContent:'space-around'}}>
            <View style={styles.emailview}>
          <Email name="email" size={20} color="black"  />
          <Text style={styles.emailtext}>{userInfo.email}</Text>
            </View> 
            <View style={styles.emailview}>
          <Email name="security-network" size={20} color="black"  />
         <Text style={styles.emailtext}>{userInfo.email}</Text>
            </View>
           
            <View style={styles.emailview}>
          <Email name="cellphone" size={20} color="black"  />
         <Text style={styles.emailtext}>{userInfo.mobile}</Text>
            </View>
           </View>
           <TouchableOpacity style={styles.emailview} onPress={onLogout}>
          <Email name="logout" size={20} color="black"  />
          
          <Text style={styles.emailtext}>Logout</Text>
            </TouchableOpacity>
           


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
    emailview:{
      flexDirection:'row',
      paddingHorizontal:20,
      paddingVertical:15,
      borderBottomWidth:1,
    },
    emailtext:{marginLeft:10},
   
});

//make this component available to the app
export default RespondComplain;
