import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Rnfirestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const ConsumerRequests = () => {
    const [requests, setRequests] = React.useState([]);
    const userInfo = useSelector(s => s?.user?.userInfo);
    console.log('userInfo:',userInfo);

    React.useEffect(() => {
        const subscriber = Rnfirestore()
            .collection('requests').where('offerBy', '==',userInfo?.email)
            .onSnapshot(snap => {
                // const data=documentSnapshot?.data();
                const arr = [];
                snap.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arr?.push(documentSnapshot.data());
                });
                setRequests(arr);
            });
        return () => subscriber();
    }, []);
    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
};
export default ConsumerRequests;
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});