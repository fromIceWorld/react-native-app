import { StyleSheet, PanResponder } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import useDrawerStore from "../../Store/drawerState";

export default function TabOneScreen() {
  const open = useDrawerStore((state: any) => state.open),
    setLeft = useDrawerStore((state: any) => state.setLeft),
    openDrawer = useDrawerStore((state: any) => state.openDrawer);

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setLeft(0);
      // 开始滑动时的处理逻辑
    },
    onPanResponderMove: (evt, gestureState) => {
      openDrawer();
      // setLeft(Math.max(gestureState.dx, 0));
      // // 正在滑动时的处理逻辑
    },
    onPanResponderRelease: (evt, gestureState) => {
      // 滑动结束时的处理逻辑
    },
  });

  return (
    <View style={styles.container} {..._panResponder.panHandlers}>
      <Text style={styles.title} onPress={() => openDrawer()}>
        Tab One {open + ""}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
