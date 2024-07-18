import { StyleSheet,View,ScrollView,PanResponder,Animated,FlatList,SafeAreaView,TouchableWithoutFeedback } from "react-native";
import PersonalEvent from "@/components/PersonalEvent/PersonalEvent";
import TabView from "@/components/tabView";
import { useState,useRef } from "react";
import MyDrawer from "../MyDrawer/MyDrawer";
import { Text } from "../Themed";
import { Direction, getDirectionByCoord } from "@/utils/panDirection";
import MyImage from '@/components/image/image'
import MyVideo from "../video/Video";

const Style = StyleSheet.create({
    container:{
      height:'100%',
        paddingRight:10,
        marginBottom:45,
    },
    messageCard:{
      borderBottomWidth:1,
      borderBottomColor:'#0505050f',
      paddingTop:6,
      paddingBottom:8,
      overflow:'hidden',
      flex:1
    },
   
  });
  
 


  let flastCanRespond = true;
 let id = 0
const Square = ()=>{
  const [Messages,setMessages] = useState(new Array(2).fill(0).map(()=>({id:String(id++),message:Math.floor(Math.random()*100),like:Math.floor(Math.random()*100),forward:Math.floor(Math.random()*100),heat:Math.floor(Math.random()*100),tag:Math.floor(Math.random()*10),iLike:false})));
  const [Messages2,setMessages2] = useState(new Array(2).fill(0).map(()=>({id:String(id++),message:Math.floor(Math.random()*100),like:Math.floor(Math.random()*100),forward:Math.floor(Math.random()*100),heat:Math.floor(Math.random()*100),tag:Math.floor(Math.random()*10),iLike:false})));
  const [isRefresh,setIsRefresh] = useState(false);

  const viewItemPan =PanResponder.create({
    onStartShouldSetPanResponder:()=>{
      flastCanRespond = true
      return flastCanRespond
    },
    onMoveShouldSetPanResponder:(evet,gestureState)=>{
      flastCanRespond = true;
      return flastCanRespond
    },
    onPanResponderTerminationRequest:()=>!flastCanRespond,
    
    onPanResponderMove:(evt,gesture)=>{
      const {dx,dy} = gesture;
      const direction = getDirectionByCoord({x:dx,y:dy});
      if([Direction.bottom,Direction.up].includes(direction)){
        TabView.canTabViewRespond = false;
        MyDrawer.canDrawerRespond = false;
        flastCanRespond = true
      }else{
        TabView.canTabViewRespond = true;
        MyDrawer.canDrawerRespond = true;
        flastCanRespond = false
      }
    },
    onPanResponderTerminate:()=>{
    }
   
})
  function onRefresh(){
    setIsRefresh(true)
    setTimeout(()=>{
      setIsRefresh(false);
    },1000)
  }
  function onEndReached(){
    // setMessages((state)=>([...state]).concat(new Array(5).fill(0).map(()=>({id:String(id++)}))))
  }
  function onEndReached2(){
    //  setMessages2((state)=>([...state]).concat(new Array(5).fill(0).map(()=>({id:String(id++)}))))
  }
  function onScroll(){
    TabView.canTabViewRespond = false;
    MyDrawer.canDrawerRespond = false; 
    flastCanRespond = false
  }
  function onScrollEndDrag(){
    TabView.canTabViewRespond = true;
    MyDrawer.canDrawerRespond = true; 
    flastCanRespond = true

  }
  const tabs = [
    {
      label:'发现',
      component: <SafeAreaView style={Style['container']}>
                    <FlatList
                          onScroll={onScroll}
                          onScrollEndDrag={onScrollEndDrag}
                          onRefresh={onRefresh}
                          refreshing={isRefresh}
                          onEndReached={onEndReached}
                          onEndReachedThreshold={0.5}
                          data={Messages}
                          renderItem={({item}) => <Animated.View style={Style['messageCard']} 
                                                     {...viewItemPan.panHandlers}
                                                  >
                                                      <PersonalEvent {...item}></PersonalEvent>
                                                  </Animated.View>}
                          keyExtractor={item => item.id}
                      />
                        
                </SafeAreaView>
    },
    {
      label:'关注',
      component: 
      <>
            <SafeAreaView style={Style['container']}>
              <FlatList
                    onScroll={onScroll}
                    onScrollEndDrag={onScrollEndDrag}
                    onRefresh={onRefresh}
                    refreshing={isRefresh}
                    onEndReached={onEndReached2}
                    onEndReachedThreshold={0.5}
                    data={Messages2}
                    renderItem={({item}) => <Animated.View style={Style['messageCard']} 
                    {...viewItemPan.panHandlers}
                                            >
                                                <PersonalEvent {...item}></PersonalEvent>
                                            </Animated.View>}
                    keyExtractor={item => item.id}
                />
                  
           </SafeAreaView>
      </>
    },
  ]
 return <TabView tabs={tabs}></TabView>
}
export default Square