import { StyleSheet,View,ScrollView,PanResponder,Animated,FlatList,SafeAreaView,TouchableWithoutFeedback } from "react-native";
import PersonalEvent from "@/components/PersonalEvent/PersonalEvent";
import TabView from "@/components/tabView";
import { useState,useRef } from "react";
import MyDrawer from "../MyDrawer/MyDrawer";
import { Text } from "../Themed";
import { Diriction, getDirectionByCoord } from "@/utils/panDirection";

const Style = StyleSheet.create({
    container:{
        flex: 1,
        marginBottom:45,
    },
    messageCard:{
      borderBottomWidth:1,
      borderBottomColor:'#0505050f',
      paddingTop:6,
      paddingBottom:8,
      overflow:'hidden'
    }
  });
  
  


  let flastCanRespond = true;

const Square = ()=>{
  const [Messages,setMessages] = useState(new Array(30).fill(0).map(()=>({id:Math.random()+''})))
  const [isRefresh,setIsRefresh] = useState(false);

  const viewItemPan =PanResponder.create({
    onStartShouldSetPanResponder:()=>{
      console.log('touch scroll')
      flastCanRespond = true
      return flastCanRespond
    },
    onMoveShouldSetPanResponder:(evet,gestureState)=>{
      console.log('scroll scroll')
      flastCanRespond = true;
      return flastCanRespond
    },
    onPanResponderTerminationRequest:()=>!flastCanRespond,
    
    onPanResponderMove:(evt,gesture)=>{
      const {dx,dy} = gesture;
      const direction = getDirectionByCoord({x:dx,y:dy});
      console.log(direction);
      if([Diriction.bottom,Diriction.up].includes(direction)){
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
      console.log('teminal')
    }
   
})
  function onRefresh(){
    setIsRefresh(true)
    console.log('onRefresh');
    setTimeout(()=>{
      setIsRefresh(false);
      console.log('finish Refresh');
    },1000)
  }
  function onEndReached(){
    setTimeout(()=>{
      setMessages((state)=>([...state]).concat(new Array(100).fill(0).map(()=>({id:Math.random()+''}))))
    },2000)
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
      label:'广场',
      component: <SafeAreaView style={Style['container']}>
                    <FlatList
                          onScroll={onScroll}
                          onScrollEndDrag={onScrollEndDrag}
                          onRefresh={onRefresh}
                          refreshing={isRefresh}
                          onEndReached={onEndReached}
                          onEndReachedThreshold={2}
                          data={Messages}
                          renderItem={({item}) => <Animated.View style={Style['messageCard']} 
                         {...viewItemPan.panHandlers}
                                                  >
                                                      <PersonalEvent ></PersonalEvent>
                                                  </Animated.View>}
                          keyExtractor={item => item.id}
                      />
                        
                </SafeAreaView>
    },
    {
      label:'关注',
      component: <Text lightColor="red" darkColor="blue">关注</Text>
    },
  ]
 return <TabView tabs={tabs}></TabView>
}
export default Square