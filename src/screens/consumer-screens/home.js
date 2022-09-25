//import liraries
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
// import {enableLatestRenderer} from 'react-native-maps';
import Rnfirestore from '@react-native-firebase/firestore';

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import SERVICES from '../../services';
import { saveData } from '../../services/firebase';
import { mvs } from '../../services/metrices';
import colors from './../../services/colors';
const ConsumerHome = (props) => {

    const ref = React.useRef(null);
    const [lat, setLat] = useState(37.78825);
    const [long, setlong] = useState(-122.4324);
    const [s, setS] = useState(0);
    const chk = 2;
    const [latlng, setLatlng] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [userName, setUserName] = useState('');
    const [userContact, setUserContact] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const userInfo = useSelector(s => s?.user?.userInfo);
    const [users, setUsers] = useState([]);
    const [offers, setOffers] = useState([]);
    React.useEffect(() => {
        SERVICES._get_current_location(
            async position => {
                if (userInfo) {
                    const coords = position?.coords;
                    const location = {
                        latitude: coords?.latitude,
                        longitude: coords?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                    saveData('users', userInfo?.email,
                        {
                            // ...userInfo,
                            location: location
                        })
                    // ref?.current?.animateToRegion({
                    //     latitude: coords?.latitude,
                    //     longitude: coords?.longitude,
                    // }, 1000);
                    setLatlng(location);
                }
            },
            error => {
                console.log('error in current location ', error);
            },
        );
    }, []);
    useEffect(() => {
        const subscriber = Rnfirestore()
            .collection('users').where('isCaptain', '==', true)
            .onSnapshot(snap => {
                // const data=documentSnapshot?.data();
                const arr = [];
                snap.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arr?.push(documentSnapshot.data());
                });
                setUsers(arr);
            });
        return () => subscriber();
    }, []);
     
    useEffect(() => {
        const subscriber = Rnfirestore()
            .collection('offers').where('email', '==', userInfo?.email)
            .onSnapshot(snap => {
                // const data=documentSnapshot?.data();
                const arr = [];
                snap.forEach(documentSnapshot => {
                    arr?.push({...documentSnapshot.data(),id:documentSnapshot.id});
                });
                setOffers(arr);
            });
        return () => subscriber();
    }, [])
    const onDeleteOffer =(id)=>{
        try {
            Alert.alert(
                "",
                'Are sure to delete this offer',
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    { text: 'Confirm', onPress: async()=>{
                        Rnfirestore().collection('offers')
                        .doc(id)
                        .delete()
                        .then(() => {
                          console.log('User deleted!');
                        });
                      
                    } 
                },
                ],
                { cancelable: false }
            )
        } catch (error) {
            
        }
    }
    return (
        <View style={styles.container}>
            <MapView
                ref={ref}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                showsUserLocation={true}
                region={latlng}
            >
                {users?.map((item, index) => (item?.location ? <Marker
                    key={index}
                    desciption="origion"
                    coordinate={item?.location}
                >
                    <Icon name="tanker-truck" size={40} color={colors.primary} />
                </Marker> : null))}
                {offers?.map((item, index) => (item?.location ? <Marker
                    key={index}
                    desciption="origion"
                    coordinate={item?.location}
                >
                    <Callout onPress={()=>onDeleteOffer(item?.id)}>
                        <View>
                            <Text>Your Offer</Text>
                            <Text>Price: {item?.offerPrice}</Text>
                        </View>
                    </Callout>
                </Marker> : null))}
            </MapView>
            <FAB
                onPress={() => props?.navigation?.navigate('CreateOffer')}
                style={{ position: 'absolute', bottom: mvs(40), right: mvs(20) }} icon="plus"
            />
        </View>
    );
};
export default ConsumerHome;

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});