import {Text} from 'react-native'
import {useEffect} from 'react'
import { Stack, useNavigation,useLocalSearchParams } from 'expo-router';

const ToUser = ()=>{
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    useEffect(()=>{
        navigation.setOptions({ 
            title:params.name,
         });
    },[navigation])
    return <Text>{params.id}</Text>
}
export default ToUser