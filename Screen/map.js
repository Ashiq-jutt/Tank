//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox, Image } from 'react-native';
// import {enableLatestRenderer} from 'react-native-maps';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { Button, Card, FAB, IconButton, List } from 'react-native-paper';
const Map = (props) => {


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
   


    useEffect(() => {
        console.log(111);
        Geolocation.getCurrentPosition(
            info => {
                const { coords } = info
                console.log(coords);
                setLat(coords.latitude)
                setlong(coords.longitude)
                // setS(coords.accuracy)
            },
            error => console.log(error),

        )
    }, [])
    // enableLatestRenderer();  
    
    
// Icon@http://192.168.1.70:8081/index.bundle?platform=android&dev=true&minify=false&app=com.tanker&modulesOnly=false&runModule=true:133133:38
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
            {chk==2?
                
                     <FAB 
            onPress={()=>alert('admin add tanker')}
            style={{ position:'absolute', margin: 0 ,}} icon="plus" 
            >
            
                </FAB>
                :null}

                {
                    chk==2?
                    <View style={{bottom:0,position:'absolute',width:'100%'}}>
                    <Card>
                        <Card.Content>
                            <List.Item
                                title="pkr 500.00"
                                description="total price of delivery"
                                left={()=>
                               <IconButton
                                icon='bike'
                                size={30}
                                />
                                }
                                right={()=>
                                <View>
                                    <Button mode='outlined' onPress={()=>alert('you cancel delivery..')}>Cancel</Button>
                                    <Button mode='contained' onPress={()=>alert('you deliver your delivery..')}>Confirm</Button>
                                </View>
                            }/>
                                
                        </Card.Content>
                    </Card>
                    </View>
                    :null
                }
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});


export default Map;
