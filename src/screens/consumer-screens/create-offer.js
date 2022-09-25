import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { PrimaryBotton } from '../../components/buttons';
import { AppHeader } from '../../components/custom-header';
import { CustomInput } from '../../components/inputs';
import SERVICES from '../../services';
import colors from '../../services/colors';
import { saveData } from '../../services/firebase';
import { mvs } from '../../services/metrices';
Geocoder.init('AIzaSyCu7vvCjMVF7SY1iNf4DH7EJoITE7f8Xjw');

const CreateOffer = (props) => {
  const ref = React.useRef(null);
  const userInfo =useSelector(s=>s?.user?.userInfo);
  console.log(userInfo);

  const [payload, setPayload] = React.useState({
    offerPrice: '500',
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    address: '',
  });




  React.useEffect(() => {
    SERVICES._get_current_location(
      async position => {
        const coords = position?.coords;
        getCompleteAddress(coords);
      },
      error => {
        console.log('error in current location ', error);
      },
    );
  }, []);

  const getCompleteAddress = (region) => {
    Geocoder.from(region.latitude, region.longitude)
      .then(async json => {
        var addressComponent = SERVICES._returnAddress(json);
        setPayload({
          ...payload,
          address: addressComponent?.fulladdress,
          location: {
            latitude: region?.latitude,
            longitude: region?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        });
      })
      .catch(error => {
        console.warn(error);
      });
  };
  const onCreateOffer =async ()=>{
    try {
      const id = SERVICES.getUUID();
      saveData('offers',id,{...payload,name:userInfo?.name,email:userInfo?.email});
      props?.navigation?.goBack()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <AppHeader title='Create Offer' />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={{ paddingHorizontal: mvs(20), paddingVertical: mvs(5) }}>
          <CustomInput
            value={payload?.offerPrice}
            keyboardType='numeric'
            label='Offer Price'
            placeholder='Offer Price'
            onChangeText={(text) => setPayload({ ...payload,offerPrice: text })}
          />
          <CustomInput
            editable={false}
            value={payload?.address}
            label='Pick location from map'
            placeholder='Your location here'
            onChangeText={(text) => {}}
          />
        </View>
        <View style={styles.container}>

          <MapView
            ref={ref}
            onLongPress={e => {
              getCompleteAddress(e.nativeEvent.coordinate);
            }}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsUserLocation={true}
            //    accuracy=
            region={payload.location}
          >
            <Marker coordinate={payload.location}/>
          </MapView>
          <View style={{position:'absolute',width:'100%',paddingHorizontal:mvs(20),bottom:mvs(25)}}>
          {payload?.address!==''&&<PrimaryBotton onPress={onCreateOffer} textStyle={{color:colors.white}} style={{backgroundColor:colors.primary,borderWidth: 0,}} label='Create Offer'/>}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default CreateOffer;
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
  contentContainerStyle: { flexGrow: 1, paddingTop: mvs(20) }
});