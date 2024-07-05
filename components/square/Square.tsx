import { StyleSheet,View,ScrollView,Text,PanResponder,Animated,FlatList,SafeAreaView,TouchableWithoutFeedback } from "react-native";
import PersonalEvent from "@/components/PersonalEvent/PersonalEvent";
import TabView from "@/components/tabView";
import { useState,useRef } from "react";

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
  
  


  

const Square = ()=>{
  const [Messages,setMessages] = useState(new Array(30).fill(0).map(()=>({id:Math.random()+''})))
  const [isRefresh,setIsRefresh] = useState(false);
  const viewItemPan =PanResponder.create({
    onStartShouldSetPanResponder:()=>true,
    onMoveShouldSetPanResponder:(evet,gestureState)=>true,
    onPanResponderMove:(evt,gesture)=>{
    },
    onPanResponderTerminationRequest:(evt,gesture)=>{
      const {dx,dy} = gesture;
      return Math.abs(dx) >Math.abs(dy)
    },
})
  function onRefresh(){
    setIsRefresh(true)
    console.log('onRefresh');
    setTimeout(()=>{
      setIsRefresh(false);
      console.log('finish Refresh');
    },2000)
  }
  function onEndReached(){
    setTimeout(()=>{
      setMessages((state)=>([...state]).concat(new Array(10).fill(0).map(()=>({id:Math.random()+''}))))
    },2000)
  }
  const tabs = [
    {
      label:'广场',
      component: <SafeAreaView style={Style['container']} >
                    <FlatList
                          onStartShouldSetResponder= {()=>false}
                          onMoveShouldSetResponder= {()=>false}
                          nestedScrollEnabled 
                          onScroll={(e)=>e.stopPropagation()}
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