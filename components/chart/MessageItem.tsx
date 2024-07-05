import { Text,Image,StyleSheet,View,TouchableHighlight } from "react-native"
import { Avatar } from '@rneui/themed';


const Style = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        height:80
    },
    avator:{
        display:'flex',
        justifyContent:'center',
        paddingLeft:15,
        borderRadius:4,
    },
    avatorImg:{
        borderRadius:4,
    },
    textMessage:{
        height:80,
        display:'flex',
        justifyContent:'space-around',
        padding:12
    },
    name:{
        fontSize:16,
        fontWeight:'bold'
    },
    message:{
        fontSize:14,
        color:'#86939e'
    }
})

const MessageItem = ()=>{
    return<TouchableHighlight 
                activeOpacity={0.6}
                underlayColor="#DDDDDD" onPress={() => {}}>
            <View style={Style['container']}>
                <View style={Style['avator']}>
                    <Avatar
                        avatarStyle={Style['avatorImg']}
                        size={48}
                        source={require('@/assets/images/avator.jpg')}
                    />
                </View>
                <View style={Style['textMessage']}>
                    <Text style={Style['name']}>Bob</Text>
                    <Text style={Style['message']}>Message</Text>
                </View>
            </View>
        </TouchableHighlight>
    
}
export default MessageItem