import { StyleSheet,View,ScrollView,Text,PanResponder,Animated,FlatList,SafeAreaView,TouchableWithoutFeedback } from "react-native";
import PersonalEvent from "@/components/PersonalEvent/PersonalEvent";
import TabView from "@/components/tabView";
import { useState,useRef } from "react";
import MyDrawer from "../MyDrawer/MyDrawer";
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
      flastCanRespond = true
      return true
    },
    onMoveShouldSetPanResponder:(evet,gestureState)=>flastCanRespond,
    onPanResponderTerminationRequest:()=>!flastCanRespond,
    onPanResponderGrant:(evt,gesture)=>{
      const {dx,dy} = gesture;
      flastCanRespond = true
    },
    onPanResponderMove:(evt,gesture)=>{
      const {dx,dy} = gesture;
      const direction = getDirectionByCoord({x:dx,y:dy})
      console.log('square move',dx,dy,direction)
      if(direction == Diriction.up || direction == Diriction.bottom){
        flastCanRespond = true;
      }else{
        // console.log('移交控制权','TabView.canTabViewRespond',Math.abs(dy),Math.abs(dx))
        flastCanRespond = false;
      }
    },
    onPanResponderTerminate:()=>{
      flastCanRespond = true;
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
    // TabView.canTabViewRespond = false;
    // MyDrawer.canDrawerRespond = false;
  }
  function onScrollEndDrag(){
    // TabView.canTabViewRespond = true;
    // MyDrawer.canDrawerRespond = true;

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
      component: <Text>关注</Text>
    },
  ]
 return <TabView tabs={tabs}></TabView>
}
export default Square