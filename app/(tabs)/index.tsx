import { StyleSheet, PanResponder } from "react-native";
import { useState } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import useDrawerStore from "../../Store/drawerState";
import { TabView, Tab } from "@rneui/themed";

export default function TabOneScreen() {
  const [index, setIndex] = useState(0);
  const onOpen = useDrawerStore((state: any) => state.onOpen),
    setOpen = useDrawerStore((state: any) => state.setOpen);

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderTerminationRequest: (evt, gestureState) => {
      return onOpen;
    },
    onPanResponderGrant: (evt, gestureState) => {
      // setLeft(0);
      // 开始滑动时的处理逻辑
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dx, vx } = gestureState;
      if ((index == 0 && dx > 10) || vx > 2.5) {
        setOpen(true);
      }
      // setLeft(Math.max(gestureState.dx, 0));
      // // 正在滑动时的处理逻辑
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // setIndex(1)
    },
    onPanResponderRelease: (evt, gestureState) => {
      // // 滑动结束时的处理逻辑
      const { dx } = gestureState;
      // console.log(index,dx)
      if (index == 0 && dx < -10) {
        setIndex(1);
      } else if (index == 1 && dx > 10) {
        setIndex(0);
      }
      console.log("end", index);
    },
  });

  return (
    <View style={styles.container} {..._panResponder.panHandlers}>
      <TabView
        containerStyle={{ borderBottomWidth: 1, borderBottomColor: "#f0f0f0" }}
        value={index}
        onChange={setIndex}
      >
        <TabView.Item>TabView</TabView.Item>
        <TabView.Item>TabView</TabView.Item>
      </TabView>
      <Text style={styles.title}>
        Tab index {index + ""}---- Tab onOpen {onOpen + ""}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    paddingTop: 260,
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
