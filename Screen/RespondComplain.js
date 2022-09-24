//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
         
const RespondComplain = (props) => {
    const [respond, setRespond] = useState('')
    return (
        <View 
        onPress={()=>Keyboard.dismiss()}
        style={styles.container}>
          <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
          <Text style={{fontSize:24,textAlign:'center'}}>Respond Complaints</Text>
          <View style={{flexDirection:'row',height:'45%',alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{fontSize:20,marginLeft:14}}>Comments</Text>
           <TextInput
           multiline={true}
                style={styles.inputStyle}
                onChangeText={(e) =>setRespond(e)}
                placeholder="Enter Comment"
                placeholderTextColor="white"
                keyboardType="default"
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
          </View>
           
               <TouchableOpacity
              style={styles.buttonStyle}
            //   activeOpacity={0.5}
            // onPress={() =>props.navigation.navigate('Home')}
             >
              <Text style={styles.buttonTextStyle}>Submit Response</Text>
            </TouchableOpacity>
            </ScrollView>
            
                 </View>
    );
};

// define your styles
const styles = StyleSheet.create({
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'blue',
    height: 50,
    alignItems: 'center',
    borderRadius: 0,
    width:'50%',
marginLeft:130,

  },
    container: {
        flex: 1,
        justifyContent:'center',
        // backgroundColor: '#2c3e50',
        backgroundColor:'white',
    },
    inputStyle: {
        color: 'black',
        paddingLeft: 15,
        borderWidth: 3,
        height:'55%',
        width:'60%',
        borderColor: 'blue',
        marginRight:12
      },
});

//make this component available to the app
export default RespondComplain;
