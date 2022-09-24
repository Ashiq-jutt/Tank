//import liraries
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {enableLatestRenderer} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const ConsumerHome = (props) => {


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
    const register_user = () => {
        console.log(userName, userContact, userAddress);

        if (!userName) {
            alert('Please fill name');
            return;
        }
        if (!userContact) {
            alert('Please fill Contact Number');
            return;
        }
        if (!userAddress) {
            alert('Please fill Address');
            return;
        }
        // setModalVisible(false);

    }
    const onButtonPress = () => {
        setModalVisible(false);

    };
    const adminhandler=()=> {
        setModalVisible(true);
        // alert('admin add tanker')

    }
        useEffect(() => {
            console.log(111);
            Geolocation.getCurrentPosition(
                info => {
                    const { coords } = info
                    setLat(coords.latitude)
                    setlong(coords.longitude)
                    // setS(coords.accuracy)
                },
                error => console.log(error),

            )
        }, [])
        return (
            <View style={styles.container}>

                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    showsUserLocation={true}
                    //    accuracy=
                    region={latlng}
                >



                    <Marker
                        onPress={() => alert('ready for provide service')}
                        desciption="origion"
                        coordinate={{ latitude: lat, longitude: long }}
                    >
                        <Icon name="tanker-truck" size={40} color="blue" />
                    </Marker>
                    <Marker
                        onPress={() => alert('ready for provide service')}
                        desciption="Destination"
                        coordinate={{ latitude: lat, longitude: long }}
                    >
                        <Icon name="tanker-truck" size={50} color="red" />
                    </Marker>






                </MapView>
              
                 



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View
                        style={{
                            // flex:1,
                            height: ('55%'),
                            width: '100%',
                            bottom: 0,
                            backgroundColor: 'white',
                            borderTopRightRadius: 25,
                            // borderTopColor:'grey's,
                            position: 'absolute',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderTopLeftRadius: 25,
                        }}>
                        
                            <ScrollView keyboardShouldPersistTaps="handled">
                                <KeyboardAvoidingView
                                    behavior="padding"
                                    style={{ justifyContent: 'space-between' }}>
                                    <Mytextinput
                                        placeholder="Enter Name"
                                        onChangeText={
                                            (e) => setUserName(e)
                                        }
                                        style={{ padding: 10 }}
                                    />
                                    <Mytextinput
                                        placeholder="Enter Contact No"
                                        onChangeText={
                                            (e) => setUserContact(e)
                                        }
                                        maxLength={11}
                                        keyboardType="numeric"
                                        style={{ padding: 10 }}
                                    />
                                    <Mytextinput
                                        placeholder="Enter Address"
                                        onChangeText={
                                            (e) => setUserAddress(e)
                                        }
                                        maxLength={225}
                                        numberOfLines={5}
                                        multiline={true}
                                        style={{ textAlignVertical: 'top', padding: 10 }}
                                    />
                                    <Mybutton title="Submit" customClick={register_user} />
                                </KeyboardAvoidingView>
                            </ScrollView>
                      
                        <TouchableOpacity
                            onPress={() => onButtonPress()}
                            style={{
                                backgroundColor: 'blue',
                                height: ('7%'),
                                width: ('80%'),
                                marginLeft: 30,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 15
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}>
                                Serve
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

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