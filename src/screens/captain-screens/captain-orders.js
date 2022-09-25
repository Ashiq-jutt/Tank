import React from 'react';
import { Alert, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import Rnfirestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';

const CaptainOrders = (props) => {
    const [orders, setOrders] = React.useState([]);
    const userInfo = useSelector(s => s?.user?.userInfo);

    React.useEffect(() => {
        const subscriber = Rnfirestore()
            .collection('orders').where('captainEmail', '==',userInfo?.email)
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
   
    const renderItem =({item,index})=>{
        return(
            <TouchableOpacity  style={{elevation:5,backgroundColor:colors.white,borderRadius:mvs(12),padding:mvs(15),marginVertical:mvs(7)}} 
            onPress={()=>props?.navigation?.navigate('CaptainOrderDetails',{order:item})}>
                <Text style={{color:colors.primary}}>Created By  :<Text style={{color:colors.black}}>{item?.name}</Text></Text>
                <Text style={{color:colors.primary}}>Price  :<Text style={{color:colors.black}}>{item?.offerPrice}</Text></Text>
                <Text style={{color:colors.primary}}>Address  :<Text style={{color:colors.black}}>{item?.address}</Text></Text>
                <Text style={{color:colors.primary}}>Status  :<Text style={{color:colors.black}}>{item?.isCompleted?'Completed': item?.status==='inprogress'?'In Progress':'Approve Order'}</Text></Text>
                
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{alignSelf:"center",marginTop:19}}><Text style={{fontSize:24,fontWeight:'bold'}}>Your Orders</Text></View>
            <FlatList
             contentContainerStyle={{padding:mvs(20)}}
            data={orders}
            keyExtractor={(item,index)=>index?.toString()}
            renderItem={renderItem}
            />
        </View>
    );
};
export default CaptainOrders;
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});