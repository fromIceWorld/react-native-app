import { useState,useRef, useEffect } from "react"
import { Text } from "../Themed"
import {Image} from 'expo-image'

import { StyleSheet,View,Dimensions, PanResponder, Animated,SafeAreaView, Platform, StatusBar,Image as ImageR } from "react-native"
import { distance2d } from "@/utils/panScale"
import { Direction, Xdirection, getDirectionByCoord, getXdirectionByDX } from "@/utils/panDirection"
import MyVideo from "../video/Video"

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
    },
    imageContainer:{
      backgroundColor:'#fff0'
    },
    image:{
        width: width,
      }
})
enum ImageSurce {
    url,
    local
}
interface Prop{
    images:any[],
    index:number,
    visible:boolean,
    onClose:()=>void
}

const images:any[] = [
    {
        url:require('@/assets/images/nature.jpg'),
        height:width,
    },
    {
        url:require('@/assets/images/frow.jpg'),
        height:width
    },
    {
        url:require('@/assets/images/humen.jpg'),
        height:width
    },
    // {
    //     url:require('@/assets/images/nature.jpg')
    // },
    // {
    //     url:require('@/assets/images/nature.jpg')
    // },
]
let viewInit = 0;
let layout:any[] = [];
let imageDirection:Direction = Direction.none;
const ImageView = (prop:Prop)=>{
    console.log('prop',prop)
    const [visible,setVisible] = useState(prop.visible);
    console.log(visible,'visible')
    useEffect(()=>{
        console.log('prop 修改')
        setVisible(prop.visible);
    },[prop.visible])
   
    const [index,setIndex] = useState(0);
    const scale = useRef(new Animated.Value(100)).current;
    let shadowOpacity = useRef(new Animated.Value(0)).current,
        shadowOpacityInterpolate = shadowOpacity.interpolate({
            inputRange:[0,0,400,400],
            outputRange:[1,1,0,0]
        });
    let currentScale = useRef(0)
    const scaleOut = scale.interpolate({
        inputRange:[0,0,200,200],
        outputRange:[0,0,2,2]
    });
    let transformXYvalue:Array<{x:number,y:number,s:number}> = []
    const viewTansformX = useRef(new Animated.Value(0)).current,
          tansformXYs = useRef(images.map(()=>{
            // 记录整体偏移值。
            transformXYvalue.push({x:0,y:0,s:1})
            return new Animated.ValueXY()
          })).current;
        
    // 控制图片在自身区域内的平移缩放
    const imagePans = PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onMoveShouldSetPanResponder:()=>true,
        onPanResponderTerminationRequest:()=>false,
        onPanResponderGrant:(evt,gesture)=>{
            tansformXYs[index].setOffset({
                // @ts-ignore
                x:tansformXYs[index].x._value, y:tansformXYs[index].y._value,
            })
            currentScale.current = 0
        },
        onPanResponderMove:(evt,gesture)=>{
            const {touches} = evt.nativeEvent,
                    {dx,dy} = gesture;
            const count = touches.length;
            // 单指切换
            if(count == 1){
                const direction = getDirectionByCoord({x:dx,y:dy});
                 // 获取初始方向
                if(imageDirection == Direction.none){
                    imageDirection = direction;
                    return
                }else if(imageDirection == Direction.bottom){
                    // 初始方向是向下，就移动图片，依据释放时情况，
                    // @ts-ignore
                    shadowEvent({dy});
                    imageEvent({dx,dy});
                }else if([Direction.left,Direction.right].includes(imageDirection)){
                    const {width:imgWidth} = layout[index];
                    console.log('平移',Math.abs(transformXYvalue[index].x + dx))
                    if(Math.abs(transformXYvalue[index].x + dx) >= ((Math.min(scale._value/100,2) - 1)*imgWidth)/2 ){
                        if(dx >0){
                            console.log('向右越界');
                        }else if(dx <0){
                            console.log('向左越界');
                        }
                        if(viewInit == 0){
                            viewInit = dx;
                        }
                        ViewEvent({dx:dx-viewInit + index * -width,dy:0})
                    }else{
                        console.log('图片平移',Math.abs(transformXYvalue[index].x + dx), ((Math.min(scale._value/100,2) - 1)*imgWidth)/2 )
                        imageEvent({dx,dy});
                    }
                }else{
                    // 初始向上，不做反馈
                    if(imageDirection !== Direction.none){
                        imageEvent({dx,dy});
                    }
                }
            }else if(count == 2){
                // 双指缩放
                const distance = distance2d({x:touches[0].pageX,y:touches[0].pageY},{x:touches[1].pageX,y:touches[1].pageY});
                if(currentScale.current == 0){
                    currentScale.current = distance;
                }else{
                    // @ts-ignore
                    console.log('distance',tansformXYs[index])
                    // @ts-ignore
                    scaleEvent({distance:distance - currentScale.current + scale._value});
                    currentScale.current = distance;
                    Animated.spring(tansformXYs[index],{
                        toValue:{x:0,y:0},
                        friction:20,
                        tension:60,
                        useNativeDriver:false
                    }).start();
                }
            }
        },
        onPanResponderRelease:(evt,gesture)=>{
            const {dx,dy,vx,vy} = gesture;
            const direction = getXdirectionByDX(dx);
            console.log('release')
            // 释放时，根据移动状态判定
            // @ts-ignore,
            if(imageDirection == Direction.bottom){
                if(vy > 0){
                    Animated.parallel([Animated.timing(tansformXYs[index],{
                            toValue:{x:0,y:0},
                            duration:250,
                            useNativeDriver:false
                        }),
                        Animated.timing(shadowOpacity,{
                            toValue:0,
                            duration:125,
                            useNativeDriver:false
                        })
                    ]).start(()=>{
                        prop.onClose()
                    })
                    
                }else{
                    Animated.parallel([Animated.spring(tansformXYs[index],{
                        toValue:{x:0,y:0},
                            friction:20,
                            tension:60,
                            useNativeDriver:false
                        }),
                        Animated.spring(shadowOpacity,{
                            toValue:0,
                            friction:20,
                            tension:60,
                            useNativeDriver:false
                        })
                    ]).start()
                }
            
                
                 
            }else if([Direction.left,Direction.right].includes(imageDirection)){
                const {width:imgWidth,height:imaHeight} = layout[index];
                if(Math.abs(transformXYvalue[index].x + dx) >= ((Math.min(scale._value/100,2) - 1)*imgWidth)/2){
                    if(dx >0){
                        console.log('向右越界');
                    }else if(dx <0){
                        console.log('向左越界');
                    }
                    let nextIndex:number = index,
                        currentIndex:number = index;
                    if(direction == Xdirection.right && (dx >= 60 || vx > 0.2)){
                        nextIndex = Math.max(index - 1, 0)
                    }else if(direction == Xdirection.left && (-dx >= 60 || vx < -0.2)){
                        nextIndex = Math.min(index + 1, images.length - 1)
                    }
                    Animated.spring(viewTansformX,{
                            toValue:nextIndex * -width,
                            friction:10,
                            tension:40,
                            useNativeDriver:false
                        }).start();
                    setIndex(nextIndex);
                    if(nextIndex !== index){
                        scaleEvent({distance:100});
                        Animated.spring(tansformXYs[currentIndex],{
                            toValue:{x:0,y:0},
                            friction:20,
                            tension:60,
                            useNativeDriver:false
                        }).start();
                    }
                }
            }else if(Direction.none == imageDirection){
            }
            // 缩小后小于1，放大到1
            if(scale._value < 100){
                Animated.spring(scale,{
                    toValue:100,
                    friction:20,
                    tension:60,
                    useNativeDriver:false
                }).start();
                transformXYvalue[index] = {x:0,y:0,s:0}
            }
            imageDirection = Direction.none
            currentScale.current = 0;
            tansformXYs[index].flattenOffset();
            viewInit = 0;
            transformXYvalue[index].x += dx;
            transformXYvalue[index].y += dy;
        },
        
    })
    function cacheViewX(e:any,index:number){
        const {x,y,width,height} = e.nativeEvent.layout;
        if(!layout[index]){
            layout[index] = {
                    width,height,
                    center:[]
            }
        }
        layout[index]={
            ...layout[index],
           width,height,
        }
    }
    useEffect(()=>{
        images.forEach((img,index)=>{
            getInitImage(ImageSurce.local,img.url,index)
        })
    },[]);
    function getInitImage(type:ImageSurce = ImageSurce.local,url:string | NodeRequire,index:number ){
        switch (type){
            case ImageSurce.local:
                const img = ImageR.resolveAssetSource(url);
                images[index]['height'] = width/(img.width/img.height)
                break;
            case ImageSurce.url:
                ImageR.getSize(url,(w,h)=>{
                    images[index]['height'] = width/(w/h)
                });
                break;
        }
    }
    const ViewEvent = Animated.event([{dx:viewTansformX}],{useNativeDriver:false}),
          imageEvent = Animated.event([{dx:tansformXYs[index].x,dy:tansformXYs[index].y}],{useNativeDriver:false}),
          scaleEvent = Animated.event([{distance:scale}],{useNativeDriver:false}),
          shadowEvent = Animated.event([{dy:shadowOpacity}],{useNativeDriver:false})
    return visible ?  <View style={Style['container']} >
                                <Animated.View style={{...Style['shadow'],opacity:shadowOpacityInterpolate}}></Animated.View>
                                <View style={Style['config']}>
                                    <Text style={Style['viewIndex']}>{index + 1}/{images.length}</Text>
                                </View>
                               <Animated.View style={{...Style['track'],width:images.length*width,transform:[{translateX:viewTansformX}]}} 
                               >
                               {
                                    images.map((item,i)=>{
                                        return <View key={i} style={Style['boxContainer']} >
                                                    <Animated.View {...imagePans.panHandlers}
                                                                style={{
                                                                    ...Style['imageContainer'],
                                                                    height:item.height,
                                                                    transform:[
                                                                        {translateX:tansformXYs[i].x},
                                                                        {translateY:tansformXYs[i].y},
                                                                        {scale: index == i ? scaleOut : 1}],
                                                                }}
                                                                onLayout={(e)=>cacheViewX(e,i)}
                                                                >
                                                            {i <=1 ? <Image
                                                                style={{
                                                                    ...Style.image,
                                                                    height:item.height,
                                                                }}
                                                                
                                                                source={item.url}
                                                                placeholder={blurhash}
                                                                contentFit="contain"
                                                                transition={500}
                                                            /> : <MyVideo></MyVideo>}
                                                    </Animated.View>
                                                </View>
                                    })
                                }
                               </Animated.View>
                            </View> 
                        :   ''
}

export default ImageView