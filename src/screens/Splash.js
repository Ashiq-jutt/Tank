// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
 
// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetStack } from '../services/navigation';
import { setUserInfo } from '../store/reducers/user-reducer';
import { useDispatch } from 'react-redux';
 
const Splash = (props) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      let screen ='Login'
      AsyncStorage.getItem('@user').then(user=>{
        const userData =JSON.parse(user);
        if(userData){
          dispatch(setUserInfo(userData));
          if(userData?.isCaptain)
          screen ='CaptainTab'
          else
          screen ='ConsumerTab'
        }
      })
      setTimeout(() => {
        setAnimating(false);
        resetStack(screen,props);
      }, 3000);
    } catch (error) {
      
    }
  }, []);
 
  return (
    <View style={styles.container}>
      <Image
        source={require('../../src/Image/logo.jpg')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
 
export default Splash;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
