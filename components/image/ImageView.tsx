import { useState,useRef } from "react"
import { Text } from "../Themed"
import {Image} from 'expo-image'

import { StyleSheet,View,Dimensions, PanResponder, Animated,SafeAreaView, Platform, StatusBar,Image as Image2 } from "react-native"
import { distance2d } from "@/utils/panScale"
import { Direction, Xdirection, getDirectionByCoord, getXdirectionByDX } from "@/utils/panDirection"

const {width,height} = Dimensions.get('window')

const blurhash =
'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Style = StyleSheet.create({
    container:{
        width,
        height,
        zIndex:1000,
        position:'absolute',
        top:0,
        left:0,
        overflow:'hidden'
    },
    shadow:{
        position:'absolute',
        top:0,
        left:0,
        width,
        height,
        backgroundColor:"black",
    },
    viewIndex:{
        color:'white',
        fontSize:18
    },
    config:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#fff0',
        position:'absolute',
        bottom:40,
        width
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
        height,
        overflow:'hidden',
        justifyContent:"center",
        backgroundColor:"#a7696957",
        borderTopWidth:6,
        borderRightWidth:6,
        borderBottomWidth:6,
        borderLeftWidth:6,
        borderColor:'green',

    },
    imageContainer:{
      backgroundColor:'#fff'
    },
    image:{
        height:width,
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
// 将缩放和滑动切换分层，通过imagePanRespondCanRespond控制
let imagePanRespondCanRespond = true, viewPanRespondCanRespond = true;
let imageDirection:Direction = Direction.none;
const ImageView = (prop:Prop)=>{
    const [index,setIndex] = useState(0);
    const scale = useRef(new Animated.Value(100)).current;
    let shadowOpacity = useRef(new Animated.Value(0)).current,
        shadowOpacityInterpolate = shadowOpacity.interpolate({
            inputRange:[0,0,400,400],
            outputRange:[1,1,0,0]
        });
    let imageMoveScaleInterpolate = shadowOpacity.interpolate({
        inputRange:[0,0,400,400],
        outputRange:[1,1,0.5,0.5]
    });
    let currentScale = useRef(0)
    const scaleOut = scale.interpolate({
        inputRange:[0,0,200,200],
        outputRange:[0,0,2,2]
    })
    console.log(scaleOut)
    const viewTansformX = useRef(new Animated.Value(0)).current,
          tansformXY = useRef(new Animated.ValueXY()).current;
    // 控制图片在自身区域内的平移缩放
    const imagePans = PanResponder.create({
        onStartShouldSetPanResponder:()=>{
            imagePanRespondCanRespond = true;
            return imagePanRespondCanRespond
        },
        onMoveShouldSetPanResponder:()=>imagePanRespondCanRespond,
        onPanResponderTerminationRequest:()=>!imagePanRespondCanRespond,
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
            // 单指切换
            if(count == 1){
                const direction = getDirectionByCoord({x:dx,y:dy});
                // 查看图片是否被放大，被放大后可移动
                // 判断越界
                const imageScale = scale._value/100;
                const  outAreaX =  (imageScale - 1)*layout[index].width/2,
                       outAreaY = (imageScale - 1)*layout[index].height/2;
                console.log('imageDirection',layout[index].x,outAreaX)

                 // 左右越界
                 if((layout[index].x > outAreaX && dx >0) || (layout[index].x < - outAreaX && dx <0)){
                    console.log('越界',outAreaX,imageScale);
                    imagePanRespondCanRespond  = false;
                    viewPanRespondCanRespond = true;
                    return
                }
                // @ts-ignore
                if(scale._value == 100){
                    // 获取初始方向
                    if(imageDirection == Direction.none){
                        imageDirection = direction;
                    }else if(imageDirection == Direction.bottom){
                        // 初始方向是向下，就移动图片，依据释放时情况，
                        // @ts-ignore
                        shadowEvent({dy});
                        imageEvent({dx,dy})
                    }else if([Direction.left,Direction.right].includes(imageDirection)){
                        // 初始方向向左右，切换
                        // ViewEvent({dx:dx + index * -width,dy:0})
                        imagePanRespondCanRespond = false
                        viewPanRespondCanRespond = true
                    }else{
                        // imageEvent({dx,dy})
                        // 初始向上，不做反馈
                    }
                }else{
                    imageEvent({dx,dy});
                    // @ts-ignore
                    console.log('index',layout[index],scale._value/100);
                }
                
               
            }else if(count == 2){
                // 双指缩放
                const distance = distance2d({x:touches[0].pageX,y:touches[0].pageY},{x:touches[1].pageX,y:touches[1].pageY});
                if(currentScale.current == 0){
                    currentScale.current = distance ;
                }else{
                    // @ts-ignore
                    console.log('distance',distance - currentScale.current + scale._value,imageDirection)
                    // @ts-ignore
                    scaleEvent({distance:distance - currentScale.current + scale._value});
                    currentScale.current = distance
                }
            }
            // console.log(dx,dy,numberActiveTouches)
            // @ts-ignore
            // imageEvent({dx,dy})
        },
        onPanResponderTerminate:(evt,gesture)=>{
            const {dx,dy} = gesture;
            console.log("被占用");
            Animated.spring(scale,{
                toValue:100,
                friction:20,
                tension:60,
                useNativeDriver:false
            }).start()
            imageEvent({dx,dy})
            imagePanRespondCanRespond = true;
            // Animated.spring(tansformXY,{
            //     toValue:{x:0,y:0},
            //     friction:20,
            //     tension:60,
            //     useNativeDriver:false
            // }).start(()=>{
            //     tansformXY.flattenOffset()
            // })
            imagePanRespondCanRespond = true;
        },
        onPanResponderReject:()=>{
            console.log("被占用Reject")
            imagePanRespondCanRespond = true
        },
        onPanResponderRelease:(evt,gesture)=>{
            console.log('release')
            // 释放时，根据移动状态判定
            // @ts-ignore,
            if(scale._value == 100){
                if(imageDirection == Direction.bottom){
                    Animated.spring(tansformXY,{
                        toValue:{x:0,y:0},
                        friction:20,
                        tension:60,
                        useNativeDriver:false
                    }).start();
                    Animated.spring(shadowOpacity,{
                        toValue:0,
                        friction:20,
                        tension:60,
                        useNativeDriver:false
                    }).start()
                }else if([Direction.left,Direction.right].includes(imageDirection)){
                    // 交出控制权
                    // let nextIndex:number;
                    // if(imageDirection == Direction.right){
                    //     nextIndex = Math.max(index - 1, 0)
                    // }else if(imageDirection == Direction.left){
                    //     nextIndex = Math.min(index + 1, images.length - 1)
                    // }else{
                    //     nextIndex = index
                    // }
                    // Animated.spring(viewTansformX,{
                    //     toValue:nextIndex * -width,
                    //     friction:10,
                    //     tension:40,
                    //     useNativeDriver:false
                    // }).start();
                    // setIndex(nextIndex);
                }else if(Direction.none == imageDirection){
                    // 缩放
                    // @ts-ignore
                    console.log('释放',scale._value,scale._value < 100,scaleOut,scaleOut<1);
                     // @ts-ignore,释放时，如果图片是缩小状态，恢复
                    if(scale._value < 100){
                        Animated.spring(scale,{
                            toValue:100,
                            friction:20,
                            tension:60,
                            useNativeDriver:false
                        }).start()
                    }
                }
            }else{
                tansformXY.flattenOffset();
            }
            if(scale._value < 100){
                Animated.spring(scale,{
                    toValue:100,
                    friction:20,
                    tension:60,
                    useNativeDriver:false
                }).start()
            }
            imageDirection = Direction.none
            currentScale.current = 0
        }
    })
    // 控制图片父级view，作为图片切换响应
    const viewPan = PanResponder.create({
        onStartShouldSetPanResponder:()=>viewPanRespondCanRespond,
        onMoveShouldSetPanResponder:()=>viewPanRespondCanRespond,
        onPanResponderTerminationRequest:()=>!viewPanRespondCanRespond,
        onPanResponderMove:(evt,gesture)=>{
            const {dx,dy} = gesture;
            ViewEvent({dx:index * -width,dy:0})
        },
        onPanResponderRelease:(evt,gesture)=>{
            const {dx,dy} = gesture;
            const direction = getXdirectionByDX(dx);
            let nextIndex:number = index;
            // if(Math.abs(dx) >30){
                if(direction == Xdirection.right){
                    nextIndex = Math.max(index - 1, 0)
                }else if(direction == Xdirection.left){
                    nextIndex = Math.min(index + 1, images.length - 1)
                }
            // }
            console.log('nextIndex',nextIndex)
            Animated.spring(viewTansformX,{
                toValue:nextIndex * -width,
                friction:10,
                tension:40,
                useNativeDriver:false
            }).start();
            setIndex(nextIndex);
            viewPanRespondCanRespond = false;
            imagePanRespondCanRespond = true
        }
    })
    function cacheViewX(e:any,index:number){
        const {x,y,width,height} = e.nativeEvent.layout;
        if(!layout[index]){
            layout[index] = {
                    scale:1,
                    x,y,width,height
            }
        }
        layout[index]={
            ...layout[index],
            x,y,width,height
        }
    }
    const ViewEvent = Animated.event([{dx:viewTansformX}],{useNativeDriver:false}),
          imageEvent = Animated.event([{dx:tansformXY.x,dy:tansformXY.y}],{useNativeDriver:false}),
          scaleEvent = Animated.event([{distance:scale}],{useNativeDriver:false}),
          shadowEvent = Animated.event([{dy:shadowOpacity}],{useNativeDriver:false})
    return prop.visible ?  <View style={Style['container']} >
                                <Animated.View style={{...Style['shadow'],opacity:shadowOpacityInterpolate}}>

                                </Animated.View>
                                <View style={Style['config']}>
                                    <Text style={Style['viewIndex']}>{index + 1}/{images.length}</Text>
                                </View>
                               <Animated.View style={{...Style['track'],width:images.length*width,transform:[{translateX:viewTansformX}]}} 
                            //    {...viewPan.panHandlers}
                               >
                               {
                                    images.map((item,index)=>{
                                        return <View key={index} style={Style['boxContainer']} >
                                                    <Animated.View {...imagePans.panHandlers}
                                                                style={{
                                                                    ...Style['imageContainer'],
                                                                    transform:[
                                                                        {translateX:tansformXY.x},
                                                                        {translateY:tansformXY.y},
                                                                        {scale: scaleOut}],
                                                                }}
                                                                onLayout={(e)=>cacheViewX(e,index)}
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