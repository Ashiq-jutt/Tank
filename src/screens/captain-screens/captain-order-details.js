import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
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

const CaptainOrderDetails = (props) => {
  const ref = React.useRef(null);
  const userInfo = useSelector(s => s?.user?.userInfo);
  const [loading, setLoading] = React.useState(false);
  const { order } = props?.route?.params;
  console.log('order:=>', order);
  const [payload, setPayload] = React.useState(order);
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('orders')
      .doc(order?.id)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ',);
        setPayload({ ...documentSnapshot.data(), id: order?.id });
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [order]);
  const onChangeStatus = async () => {
    try {
      const id = SERVICES.getUUID();
      setLoading(true);
      let obj = {
        ...payload,
        isCompleted: 'completed',
      }
      await saveData('assignedOrders', payload?.id,
        {
          offerDetails: obj,
        });
      await saveData('orders', payload?.id, { isCompleted: 'completed' });
      ToastAndroid.show('Order completed successfully', ToastAndroid.LONG)
      props?.navigation?.goBack()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader title='Order Details' />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={{ paddingHorizontal: mvs(20), paddingVertical: mvs(5) }}>
          {payload?.status != 'pending' && <CustomInput
            editable={false}
            value={payload?.captainName}
            label='Captain Name'
            placeholder=''
            onChangeText={(text) => { }}
          />}
          <CustomInput
            editable={false}
            value={payload?.offerPrice}
            keyboardType='numeric'
            label='Offer Price'
            placeholder='Offer Price'
            onChangeText={(text) => { }}
          />

          <CustomInput
            editable={false}
            value={payload?.address}
            label='Order Location'
            placeholder='Your location here'
            onChangeText={(text) => { }}
          />
        </View>
        <View style={styles.container}>

          <MapView
            ref={ref}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsUserLocation={true}
            //    accuracy=
            region={payload.location}
          >
            <Marker coordinate={payload.location} />
          </MapView>

        </View>
        <View style={{ width: '100%', paddingHorizontal: mvs(20), paddingVertical: mvs(25) }}>
          <PrimaryBotton disabled={payload?.status === 'inprogress' || payload?.isCompleted} loading={loading} onPress={onChangeStatus} textStyle={{ color: colors.white }} style={{ backgroundColor: colors.primary, borderWidth: 0, }}
            label={payload?.isCompleted?'Order Completed': payload?.status === 'inprogress' ? 'Wait for customer approval' :  'Complete order'}
          />
        </View>

      </ScrollView>
    </View>
  );
};
export default CaptainOrderDetails;
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