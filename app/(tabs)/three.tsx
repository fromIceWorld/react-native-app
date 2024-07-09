import { Text, View } from "@/components/Themed";
import MessageItem from "@/components/chart/MessageItem";
import {
  FlatList,
  StyleSheet,
  PanResponder,
  Animated,
  Pressable,
} from "react-native";
import MyDrawer from "@/components/MyDrawer/MyDrawer";
import { router, Link } from "expo-router";

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const messages = new Array(100).fill(0).map((item, index) => ({ id: index }));

const _pan = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onMoveShouldSetPanResponder: () => true,
  onPanResponderTerminationRequest: (evt, gesture) => false,
  onMoveShouldSetPanResponderCapture:()=>true,
  onStartShouldSetPanResponderCapture:()=>true,

});

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
            <Animated.View {..._pan.panHandlers} key={item.id}>
              <MessageItem></MessageItem>
            </Animated.View>
          )}
        ></FlatList>
      </Animated.View>
    </>
  );
};
export default Three;
