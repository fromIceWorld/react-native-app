import {Text} from 'react-native'
import {useEffect} from 'react'
import { Stack, useNavigation,useLocalSearchParams } from 'expo-router';

const ToUser = ()=>{
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    useEffect(()=>{
        navigation.setOptions({ 
            title:params.id,
         });
    },[navigation])
    return <Text>ToUser</Text>
}
export default ToUser