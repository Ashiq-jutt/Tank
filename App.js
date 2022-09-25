//import liraries
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Map from './src/screens/map';
import RespondComplain from './src/screens/RespondComplain';
import Setting from './src/screens/Setting';
import SignUp from './src/screens/SignUp';
import Splash from './src/screens/Splash';
import { store } from './src/store';
import ConsumerHome from './src/screens/consumer-screens/home';
import CreateOffer from './src/screens/consumer-screens/create-offer';
import CaptainHome from './src/screens/captain-screens/home';
import ConsumerRequests from './src/screens/consumer-screens/request';

const Tab = createBottomTabNavigator();

enableLatestRenderer();
const Stack = createNativeStackNavigator();
// Ek ConsumerTab aur 2sra CaptainTab
function ConsumerTab() {
  return (
    <Tab.Navigator
      initialRouteName="ConsumerHome"
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="ConsumerHome"
        component={ConsumerHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={ConsumerRequests}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="RespondingComplain"
        component={RespondComplain}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function CaptainTab() {
  return (
    <Tab.Navigator
      initialRouteName="CaptainHome"
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="CaptainHome"
        component={CaptainHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="RespondingComplain"
        component={RespondComplain}
        options={{
          tabBarLabel: 'RespondingComplain',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


// create a component
const App = () => {
  return (
   <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="CreateOffer" component={CreateOffer} />
      <Stack.Screen name="ConsumerTab" component={ConsumerTab} />
      <Stack.Screen name="CaptainTab" component={CaptainTab} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Setting" component={Setting}/>
        <Stack.Screen name="RespondComplain" component={RespondComplain}/>
      </Stack.Navigator>
    </NavigationContainer>
   </Provider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
