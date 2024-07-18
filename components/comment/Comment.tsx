import {Text,StyleSheet,View,TouchableOpacity} from 'react-native'
import { Avatar } from "@rneui/themed";
import { AntDesign } from '@expo/vector-icons';
import Feather from "@expo/vector-icons/Feather";
import {useState} from 'react'
interface Prop{
    name:string,
    replyTo:string,
    id:string,
    time:string,
    content:string,
    reply:Array<Prop>
}

const Style = StyleSheet.create({
    comment:{
        display:'flex',
        flexDirection:'row',
        padding:6
    },
    person:{
       
    },
    name:{
        fontSize: 14,
        fontWeight: "bold",
        marginRight:2
    },
    reply:{
        // paddingLeft:4,
        // paddingRight:4
    },
    personinfo:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:6
    },
    time:{
        color:'#555b6385',
        fontSize:12,
        marginLeft:2,
    },
    avatorImg:{
        borderRadius:48
    },
    message:{
        flex:1
    },
    content:{
        paddingTop:4
    },
    replyIcon:{
        marginLeft:4,
        marginRight:4
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
    },

})
let s = `“你见，或者不见我，我就在那里，不悲不喜。”大自然中的高山大川、江河湖海、日月星辰，已经存在了成千上万年。星转斗移，沧海桑田，“江山依旧在，几度夕阳红。`
const CommentItem = (prop:Prop)=>{
    const [data,setData] = useState({
        id:'@gsfsfs',
        message:12,
        like:123123,
        forward:123,
        heat:453,
        tag:12,
        iLike:true
    })
    return <View style={Style['comment']}>
               <View style={Style['person']}>
                    <Avatar
                            avatarStyle={Style["avatorImg"]}
                            size={32}
                            source={require("@/assets/images/avator.webp")}
                    />
                </View>
               <View style={Style['message']}>
                    <View >
                            <View style={Style['personinfo']} >
                                    <Text style={Style['name']}>{prop.name}</Text>
                                    {prop.replyTo && <AntDesign name="swap" size={12} color="#0000008f" style={Style['replyIcon']}/>}
                                    <Text style={Style['reply']}>{prop.replyTo}</Text>
                                    <Text style={Style['time']}> {prop.time}</Text>
                            </View>
                            <View  style={Style['content']}>
                                <Text >{s}</Text>
                            </View>
                    </View>
                    {/* 按钮 */}
                    <View>
                        <View style={Style['btns']}>
                                <TouchableOpacity style={Style['btn']}>
                                    <Feather name="message-circle" size={16} ></Feather><Text style={Style['typeCount']}>{data.message}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Style['btn']}>
                                    <Feather name="heart" size={16}></Feather>
                                    <Text style={Style['typeCount']}>{data.heat}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Style['btn']}>
                                    <Feather name="paperclip" size={16} ></Feather><Text style={Style['typeCount']}>{data.forward}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Style['btn']}>
                                    <Feather name="tag" size={16}></Feather><Text style={Style['typeCount']}>{data.tag}</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                    {/* 回复 */}
                    <View style={Style['reply']}>
                        { prop.reply.map(item=><CommentItem key={item.id} {...item}></CommentItem>)}
                    </View>
                    
               </View>
            </View>
}
export default CommentItem