import { useState,useRef } from "react"
import { Text } from "../Themed"
import {Image} from 'expo-image'

import { StyleSheet,View,Dimensions, PanResponder, Animated,SafeAreaView, Platform, StatusBar } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { distance2d } from "@/utils/panScale"
import { Xdirection, getDirectionByCoord, getXdirectionByDX } from "@/utils/panDirection"

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
        left:0,
        overflow:'hidden'
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
        backgroundColor:'#fff0'
    },
    track:{
        flex: 1,
        width: '100%',
        display:'flex',
        flexDirection:'row',
        // width: '100%',
    },
    boxContainer:{
        width: width,
        overflow:'hidden'
    },
    imageContainer:{
        flex: 1,
        width: width,
    },
    image:{
        flex: 1,
        width: width,
      }
})
interface Prop{
    images:any[],
    index:number,
    visible:boolean
}

const images = [
    {
        url:require('@/assets/images/nature.jpg')
    },
    {
        url:require('@/assets/images/frow.jpg')
    },
    {
        url:require('@/assets/images/humen.jpg')
    },
    // {
    //     url:require('@/assets/images/nature.jpg')
    // },
    // {
    //     url:require('@/assets/images/nature.jpg')
    // },
]
let layout:any[] = [];
// 将缩放和滑动切换分层，通过panRespondCanBubble控制
let panRespondCanBubble = false

const ImageView = (prop:Prop)=>{
    const [index,setIndex] = useState(0);
    const scale = useRef(new Animated.Value(100)).current;
    let currentScale = useRef(0)
    const scaleOut = scale.interpolate({
        inputRange:[0,200],
        outputRange:[0,2]
    })
    console.log(scaleOut)
    const viewTansformX = useRef(new Animated.Value(0)).current,
          tansformXY = useRef(new Animated.ValueXY()).current;
    // 控制图片在自身区域内的平移缩放
    const imagePans = PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onMoveShouldSetPanResponder:()=>true,
        onPanResponderTerminationRequest:()=>panRespondCanBubble,
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
            const {touches,locationX,target   } = evt.nativeEvent,
                    {dx,dy} = gesture;
            const count = touches.length;

            if(count == 1){
                 imageEvent({dx,dy});
                 console.log('locationX ',locationX )

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
    // 控制图片父级view，作为图片切换响应
    const viewPan = PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onMoveShouldSetPanResponder:()=>true,
        onPanResponderGrant:(evt,geture)=>{
            // console.log(evt.nativeEvent.layout)
        },
        onPanResponderMove:(evt,gesture)=>{
            const {dx,dy} = gesture;
            ViewEvent({dx:dx + index * -width,dy:0})
        },
        onPanResponderRelease:(evt,gesture)=>{
            const {dx,dy} = gesture;
            const direction = getXdirectionByDX(dx);
            let nextIndex:number;
            if(direction == Xdirection.right){
                nextIndex = Math.max(index - 1, 0)
            }else if(direction == Xdirection.left){
                nextIndex = Math.min(index + 1, images.length - 1)
            }else{
                nextIndex = index
            }
            console.log('nextIndex',nextIndex)
            Animated.spring(viewTansformX,{
                toValue:nextIndex * -width,
                friction:10,
                tension:40,
                useNativeDriver:false
            }).start();
            setIndex(nextIndex);
            panRespondCanBubble = false
        }
    })
    function cacheViewX(e:any,index:number,type:string){
        const {x,y} = e.nativeEvent.layout;
        if(!layout[index]){
            layout[index] = {
                [type]:{
                    x,y
                }
            }
        }
        layout[index][type]={
            x,y
        }
        if(type == 'image' &&  (layout[index]['image'].x <0 || layout[index]['image'].x > width*0.6)){
            panRespondCanBubble = true
        }
        console.log(layout)
    }
    function closeImageView(){
        prop.visible = false
        console.log('closeImageView')
    }
    const ViewEvent = Animated.event([{dx:viewTansformX}],{useNativeDriver:false}),
          imageEvent = Animated.event([{dx:tansformXY.x,dy:tansformXY.y}],{useNativeDriver:false}),
          scaleEvent = Animated.event([{distance:scale}],{useNativeDriver:false})
    return prop.visible ?  <View style={Style['container']}>
                                <SafeAreaView style={Style['config']}>
                                    <Text style={Style['viewIndex']}>{index + 1}/{images.length}</Text>
                                    <AntDesign onPress={closeImageView} size={24} name="closecircleo" color='white'></AntDesign>
                                </SafeAreaView>
                               <Animated.View style={{...Style['track'],width:images.length*width,transform:[{translateX:viewTansformX}]}} {...viewPan.panHandlers}>
                               {
                                    images.map((item,index)=>{
                                        return <View key={index} style={Style['boxContainer']} onLayout={(e)=>cacheViewX(e,index,'parent')}>
                                                <Animated.View {...imagePans.panHandlers}
                                                            style={{
                                                                ...Style['imageContainer'],
                                                                ...tansformXY.getLayout(),
                                                                transform:[{scale:scaleOut}]
                                                            }}
                                                            onLayout={(e)=>cacheViewX(e,index,'image')}
                                                            >
                                                        <Image
                                                            style={{
                                                                ...Style.image,
                                                            }}
                                                            source={item.url}
                                                            placeholder={blurhash}
                                                            contentFit="contain"
                                                            transition={1000}
                                                        />
                                                </Animated.View>
                                        </View>
                                    })
                                }
                               </Animated.View>
                            </View> 
                        :   ''
}
export default ImageView