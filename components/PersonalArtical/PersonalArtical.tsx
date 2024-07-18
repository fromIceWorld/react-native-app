import {Text,View,StyleSheet, TouchableOpacity,Pressable,TouchableHighlight } from 'react-native'
import { Avatar } from '@rneui/themed';
import Feather from "@expo/vector-icons/Feather";

import ImageGrid from '../image/ImageGrid';
import {useState,useEffect,useRef} from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { router } from "expo-router";

type Prop = {
    id:string,
    message:number,
    like:number,
    forward:number,
    heat:number,
    tag:number,
    iLike:boolean
}

function goArticalDetail(){
    router.push({
        pathname: "/artical/Artical",
        params: {
          name:'Tom',
          id: Math.random(),
        },
      });
}

const PersonalArtical = (prop:Prop)=>{
    const [data,setData] = useState(prop);
    const like = useRef()
    useEffect(()=>{
        setData(prop)
    },[prop])
    function likeIt(){
        setData((data)=>({
            ...data,
            like:data.iLike ? data.like - 1 : data.like + 1,
            iLike:!data.iLike
        }))
    }
    return <View style={Style['card']}>
                {/* 事件人 */}
                    <View style={Style['avater']}>
                        <Avatar
                            size={38}
                            rounded
                            source={require('@/assets/images/favicon.png')}
                            />
                    </View>                
                {/* 信息 */}
                <View  style={Style['comment']} >
                    <View style={Style['information']}>
                        <Text style={Style['name']}>Bob</Text>
                        <Text  style = {{...Style['subInformation'],...Style['id']}}>@ufydbshd</Text>
                        <Text style={{...Style['splitPod'],...Style['subInformation']}}>·</Text>
                        <Text style = {{...Style['subInformation'],...Style['time']}}>2024/7/3</Text>
                    </View>
                    <View>
                        {/* 文本 */}
                        <Text>今天发生了很好的事情😁</Text>
                    </View>
                    {/* 图片 */}
                    <View style={Style['imgs']}>
                        {/* 图片grid */}
                        <ImageGrid></ImageGrid>
                    </View>
                        {/* 相关评论 */}
                    <View style={Style['btns']}>
                        <TouchableOpacity style={Style['btn']}>
                            <Feather name="message-circle" size={20} ></Feather><Text style={Style['typeCount']}>{data.message}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Style['btn']} onPress={likeIt}>
                            {
                                data.iLike ? <FontAwesome name="heart" size={18} color="red" /> 
                                           : <Feather name="heart" size={18}></Feather>
                            }
                           <Text style={Style['typeCount']}>{data.like}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Style['btn']}>
                            <Feather name="paperclip" size={18} ></Feather><Text style={Style['typeCount']}>{data.forward}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Style['btn']}>
                            <Feather name="bar-chart-2" size={18} ></Feather><Text style={Style['typeCount']}>{data.heat}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Style['btn']}>
                            <Feather name="tag" size={18}></Feather><Text style={Style['typeCount']}>{data.tag}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
            </View>
}
const Style = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        paddingTop:6,
    },
    avater:{
        marginLeft:4,
        width:40,
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start'
    },
    comment:{
        flex:1,
        paddingRight:10,
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
export default PersonalArtical