import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import MessageItem from "@/components/chart/MessageItem";
import{FlatList,StyleSheet,PanResponder,Animated} from'react-native'
import MyDrawer from "@/components/MyDrawer/MyDrawer";
const Style = StyleSheet.create({
  container:{
    flex:1
  }
})

const messages = new Array(100).fill(0).map((item,index)=>({id:index}))

const _pan = PanResponder.create({
  onStartShouldSetPanResponder:()=>true,
  onMoveShouldSetPanResponder:()=>true,
  onPanResponderTerminationRequest:(evt,gesture)=>false,
})

const Three = () => {
  const ContainerPan = PanResponder.create({
    onStartShouldSetPanResponder:()=>false,
    onMoveShouldSetPanResponder:()=>false,
    onPanResponderMove:()=>{
      
    }
  })
  function onScroll(){
    MyDrawer.canDrawerRespond = false
    console.log('onScroll',MyDrawer.canDrawerRespond)
  }
  function onScrollEndDrag(){
    setTimeout(()=>{
      MyDrawer.canDrawerRespond = true
      console.log('onScrollEndDrag',MyDrawer.canDrawerRespond)
    })
    // MyDrawer.canDrawerRespond = true
  }
  return (
    <Animated.View style={Style['container']} {...ContainerPan.panHandlers}>
            <FlatList data={messages}
                onViewableItemsChanged={onScroll}
                onScrollEndDrag={onScrollEndDrag}
                renderItem={({item}) => <Animated.View  {..._pan.panHandlers} key={item.id}>
                  <MessageItem ></MessageItem>
                </Animated.View>}

      >

     </FlatList>
    </Animated.View>
  );
};
export default Three;
