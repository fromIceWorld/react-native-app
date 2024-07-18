import MessageItem from "@/components/chart/MessageItem";
import {
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";
import { router } from "expo-router";

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const messages = new Array(100).fill(0).map((item, index) => ({ id:String(Math.random()) }));



const Three = () => {
  function onScroll() {
  }
  function onScrollEndDrag() {
    setTimeout(() => {
    });
    // MyDrawer.canDrawerRespond = true
  }
  function chartWithany() {
    router.replace("/message/1243");
  }
  return (
    <>
      <Animated.View style={Style["container"]}>
        <FlatList
          data={messages}
          onStartShouldSetResponder={()=>true}
          onMoveShouldSetResponder={()=>true}
          onViewableItemsChanged={onScroll}
          onScrollEndDrag={onScrollEndDrag}
          onPointerDown={chartWithany}
          renderItem={({ item }) => (
            <Animated.View  key={item.id}>
              <MessageItem></MessageItem>
            </Animated.View>
          )}
          keyExtractor={(item)=>item.id}
        ></FlatList>
      </Animated.View>
    </>
  );
};
export default Three;
