import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import MessageItem from "@/components/chart/MessageItem";
import{FlatList,StyleSheet,PanResponder,Animated} from'react-native'

const Style = StyleSheet.create({
  container:{
    flex:1
  }
})

const messages = new Array(100).fill(0).map((item,index)=>({id:index}))

const _pan = PanResponder.create({
  onStartShouldSetPanResponder:()=>true,
  onMoveShouldSetPanResponder:()=>true,
  onPanResponderTerminationRequest:(evt,gesture)=>false
})

const Three = () => {
  return (
    <Animated.View style={Style['container']} onResponderTerminationRequest={()=>false}>
            <FlatList data={messages}
                
                renderItem={({item}) => <Animated.View {..._pan.panHandlers} key={item.id}>
                  <MessageItem ></MessageItem>
                </Animated.View>}

      >

     </FlatList>
    </Animated.View>
  );
};
export default Three;
