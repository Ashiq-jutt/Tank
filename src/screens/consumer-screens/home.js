//import liraries
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// import {enableLatestRenderer} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { FAB } from 'react-native-paper';
import { mvs } from '../../services/metrices';
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

    useEffect(() => {
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
            <FAB
                onPress={() => props?.navigation?.navigate('CreateOffer')}
                style={{ position: 'absolute',bottom:mvs(40),right:mvs(20)}} icon="plus"
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