import { useState,useRef } from "react"
import { Text } from "../Themed"
import {Image} from 'expo-image'

import { StyleSheet,View,Dimensions, PanResponder, Animated,SafeAreaView } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { distance2d } from "@/utils/panScale"

const {width,height} = Dimensions.get('window')

const blurhash =
'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Style = StyleSheet.create({
    container:{
        width,
        height,
        backgroundColor:"black",
        zIndex:1000,
        position:'absolute',
        top:0,
        left:0
    },
    viewIndex:{
        color:'white',
        fontSize:18
    },
    config:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:20,
        marginRight:20,
    },
    image:{
        flex: 1,
        width: '100%',
      }
})
interface Prop{
    images:any[],
    index:number,
    visible:boolean
}

const ImageView = (prop:Prop)=>{
    const scale = useRef(new Animated.Value(100)).current;
    let currentScale = useRef(0)
    const scaleOut = scale.interpolate({
        inputRange:[0,200],
        outputRange:[0,2]
    })
    console.log(scaleOut)
    const tansformXY = useRef(new Animated.ValueXY()).current;
    const imagePan = PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onMoveShouldSetPanResponder:()=>true,
        onPanResponderGrant:(evt,gesture)=>{
            currentScale.current = 0
            // @ts-ignore
            console.log(scale._value)
                tansformXY.setOffset({
                    // @ts-ignore
                    x:tansformXY.x._value, y:tansformXY.y._value,
                })
        },
        onPanResponderMove:(evt,gesture)=>{
            const {touches,changedTouches } = evt.nativeEvent,
                    {dx,dy,numberActiveTouches} = gesture;
            const count = touches.length;

            if(count == 1){
                 imageEvent({dx,dy})
            }else if(count == 2){
                // 双指缩放
                const distance = distance2d({x:touches[0].pageX,y:touches[0].pageY},{x:touches[1].pageX,y:touches[1].pageY});
                if(currentScale.current == 0){
                    currentScale.current = distance ;
                }else{
                    // @ts-ignore
                    console.log(distance - currentScale.current)
                    // @ts-ignore
                    scaleEvent({distance:distance - currentScale.current + scale._value});
                    currentScale.current = distance
                }
                
                return
            }else{
                return
            }

            // console.log(dx,dy,numberActiveTouches)
            // @ts-ignore
            // imageEvent({dx,dy})
        },
        onPanResponderRelease:(evt,gesture)=>{
            tansformXY.flattenOffset()
            scale.flattenOffset();
            currentScale.current = 0
        }
    })
    function closeImageView(){
        prop.visible = false
        console.log('closeImageView')
    }
    const imageEvent = Animated.event([{dx:tansformXY.x,dy:tansformXY.y}],{useNativeDriver:false}),
          scaleEvent = Animated.event([{distance:scale}],{useNativeDriver:false})
    return prop.visible ?  <View style={Style['container']}>
                                <SafeAreaView style={Style['config']}>
                                    <Text style={Style['viewIndex']}>1/7</Text>
                                    <AntDesign onPress={closeImageView} size={24} name="closecircleo" color='white'></AntDesign>
                                </SafeAreaView>
                                <Animated.View {...imagePan.panHandlers}
                                        style={{
                                             flex:1,...tansformXY.getLayout(),
                                             transform:[{scale:scaleOut}]
                                        }}
                                        >
                                    <Image
                                        style={{
                                            ...Style.image
                                         }}
                                        source={require('@/assets/images/nature.jpg')}
                                        placeholder={blurhash}
                                        contentFit="contain"
                                        transition={1000}
                                    />
                                </Animated.View >
                                
                            </View> 
                        :   ''
}
export default ImageView