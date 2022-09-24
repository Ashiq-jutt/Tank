// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
 
// Import React and Component
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
} from 'react-native';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import Loader from './Loader';
import { getData, saveData } from '../services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../store/reducers/user-reducer';
import CustomRadio from '../components/radio-button';
import { mvs } from '../services/metrices';
import { resetStack } from '../services/navigation';
 
const SignUp = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [isCaptain, setIsCaptain] = useState(false);
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const userInfo=useSelector(state=>state?.user?.userInfo);
  const dispatch =useDispatch();
  console.log({userInfo});

//   useEffect(() => {
//   firestore()
//   .collection('login')
//   .get()
//   .then(querySnapshot => {
//     console.log('Total users: ', querySnapshot.size);
//     querySnapshot.forEach(documentSnapshot => {
//       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//       x.push(documentSnapshot.data());
//     });
//   });
// //   console.log('xxxxx',  x);
// }, []);
 

  const  handleSubmitPress = async() => {
     try {
      const userData ={
        name:name,
        email:userEmail,
        password:userPassword,
        isCaptain,
      }
      const user=await getData('users',userEmail);
      if(!user){
        await saveData('users',userEmail,userData);
        const newUser=await getData('users',userEmail);
        dispatch(setUserInfo(newUser));
        resetStack(newUser?.isCaptain?'CaptainTab':'ConsumerTab',props);
      }else{
        if(Platform.OS==='android')
        ToastAndroid.show('Email already Exists', ToastAndroid.LONG)
      }
     } catch (error) {
       console.log(error);
     }
  };
 
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignContent: 'center',
          paddingBottom:40
        }}>
        <View>
          <View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../src/Image/logo.jpg')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                  borderRadius:10,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(e) =>setName(e)
                }
                placeholder="Enter Name" //dummy@abc.com
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(e) =>setUserEmail(e)
                }
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                // onSubmitEditing={() =>
                //   passwordInputRef.current && 
                //   passwordInputRef.current.focus()
                // }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="white"
                keyboardType="default"
                // ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <View style={{marginVertical:0,flexDirection:'row',justifyContent:'space-evenly'}}>
              <CustomRadio onChange={setIsCaptain} status={!isCaptain} subLabel={'Consumer'}/>
              <CustomRadio onChange={setIsCaptain} status={isCaptain} subLabel={'Captain'}/>
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
            //   activeOpacity={0.5}
            onPress={handleSubmitPress}> 
              <Text style={styles.buttonTextStyle}>SignUp</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() =>props.navigation.navigate('Login')}>
              Already have a account ? SignIn
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUp;
 
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
