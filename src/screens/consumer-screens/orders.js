import React from 'react';
import { Alert, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import Rnfirestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { mvs } from '../../services/metrices';
import colors from './../../services/colors';

const ConsumerOrders = (props) => {
    const [orders, setOrders] = React.useState([]);
    const userInfo = useSelector(s => s?.user?.userInfo);

    React.useEffect(() => {
        const subscriber = Rnfirestore()
            .collection('orders').where('email', '==',userInfo?.email)
            .onSnapshot(snap => {
                // const data=documentSnapshot?.data();
                const arr = [];
                snap.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arr?.push({...documentSnapshot.data(),id:documentSnapshot.id});
                });
                setOrders(arr);
            });
        return () => subscriber();
    }, []);
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
                        Rnfirestore().collection('orders')
                        .doc(id)
                        .delete()
                        .then(() => {
                          console.log('Order deleted!');
                        });
                      
                    } 
                },
                ],
                { cancelable: false }
            )
        } catch (error) {
            
        }
    }
    const renderItem =({item,index})=>{
        return(
            <TouchableOpacity onLongPress={()=>item?.status==='pending'&&onDeleteOffer(item?.id)} style={{elevation:5,backgroundColor:colors.white,borderRadius:mvs(12),padding:mvs(15)}} 
            onPress={()=>props?.navigation?.navigate('OrderDetails',{order:item})}>
                <Text>Price  : {item?.offerPrice}</Text>
                <Text>Address: {item?.address}</Text>
                <Text>Status: {item?.isCompleted?'Completed': item?.status==='inprogress'?'In Progress':'Wait for captain Approval'}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Text>Your Orders</Text>
            <FlatList
             contentContainerStyle={{padding:mvs(20)}}
            data={orders}
            keyExtractor={(item,index)=>index?.toString()}
            renderItem={renderItem}
            />
        </View>
    );
};
export default ConsumerOrders;
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});