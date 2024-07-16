import {Text,View,StyleSheet,ActivityIndicator, TouchableOpacity,Pressable,TouchableHighlight } from 'react-native'
import { Avatar } from '@rneui/themed';
import { Image } from '@rneui/themed';
import Feather from "@expo/vector-icons/Feather";
import MyImage from '../image/image';
import MyVideo from '../video/Video';

const PersonalEvent = ()=>{
    return <>
    <View style={Style['card']}>
        {/* 事件人 */}
        <View style={Style['avater']}>
            <Avatar
                size={38}
                rounded
                source={require('@/assets/images/favicon.png')}
                />
            <View style={Style['information']}>
                <Text style={Style['name']}>Bob</Text>
                <Text  style = {{...Style['subInformation'],...Style['id']}}>@ufydbshd</Text>
                <Text style={{...Style['splitPod'],...Style['subInformation']}}>·</Text>
                <Text style = {{...Style['subInformation'],...Style['time']}}>2024/7/3</Text>
            </View>
        </View>
        {/* 信息 */}
        <View  style={Style['comment']} >
            {/* 文本 */}
            <Pressable>
                <Text>今天发生了很好的事情😁</Text>
            </Pressable>
            {/* 图片 */}
            <View style={Style['imgs']}>
                {/* <Image
                    style={Style['img']}
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                /> */}
                <MyImage></MyImage>
                <MyVideo></MyVideo>
            </View>
            {/* 相关评论 */}
            <View style={Style['btns']}>
                <TouchableOpacity style={Style['btn']}>
                    <Feather name="message-circle" size={20} ></Feather><Text style={Style['typeCount']}>12</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style['btn']}>
                    <Feather name="heart" size={18} ></Feather><Text style={Style['typeCount']}>42万</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style['btn']}>
                    <Feather name="paperclip" size={18} ></Feather><Text style={Style['typeCount']}>12</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style['btn']}>
                    <Feather name="bar-chart-2" size={18} ></Feather><Text style={Style['typeCount']}>12</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style['btn']}>
                    <Feather name="tag" size={18}></Feather><Text style={Style['typeCount']}>12</Text>
                </TouchableOpacity>
            </View>
        </View>

    </View></>
}
const Style = StyleSheet.create({
    card:{
        display:'flex',
        paddingTop:6,
    },
    avater:{
        marginLeft:4,
        width:50,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    comment:{
        marginTop:10,
        paddingLeft:10,
        flex:1,
        width:'100%'
    },
    information:{
        display:'flex',
        flexDirection:'row',
        marginLeft:6
    },
    name:{
        fontWeight:'bold',
        marginRight:4,
    },
    id:{
        fontSize:13,
    },
    time:{
        color:'#555b63'
    },
    splitPod:{
        paddingLeft:1,
        paddingRight:1,
    },
    subInformation:{
        color:'#606770'
    },
    imgs:{
        height:'auto',
        width:'100%',
        paddingTop:6
    },
    img:{
        width: 50,
        height: 50,
    },
    item:{
        width: 50,
        height: 50,
    },
    btns:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10,
        paddingRight:10,
    },
    btn:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        opacity:0.8
    },
    typeCount:{
        marginLeft:3,
        opacity:0.7,
        fontSize:12
    }

})
export default PersonalEvent