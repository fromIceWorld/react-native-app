import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import { useState, useRef } from "react";
const tabs = [
  {
    text: "1",
    color: "#fff",
  },
  {
    text: "2",
    color: "#fff",
  },
  {
    text: "3",
    color: "#fff",
  },
];

const tabView = () => {
  const [index, setIndex] = useState(0);
  const [releasePan, setPanReleasse] = useState(false);
  const viewWidth = useRef(0);
  const handleLayout = (event: any) => {
    console.log(event.nativeEvent.layout.width);
    const layoutWidth = event.nativeEvent.layout.width;
    viewWidth.current = layoutWidth;
    // 初始位置
    Animated.spring(barXY.x, {
      toValue: layoutWidth / 6 - 30,
      speed: 15,
      bounciness: 3,
      useNativeDriver: true,
    }).start();
  };
  const panXY = useRef(new Animated.ValueXY()).current;
  const barXY = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current,
    barEvent = Animated.event(
      [
        {
          dx: barXY.x,
          dy: barXY.y,
        },
      ],
      {
        useNativeDriver: false,
      }
    );
  const panEvent = Animated.event(
    [
      {
        dx: panXY.x,
        dy: panXY.y,
      },
    ],
    {
      useNativeDriver: false,
    }
  );
  console.log(typeof panEvent);
  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderTerminationRequest: (evt, gestureState) => {
      return releasePan;
    },
    onPanResponderGrant: (evt, gestureState) => {},
    onPanResponderMove: (evt, gestureState) => {
      const { dx, vx } = gestureState;
      // 当在边界滑动时，交出控制权
      if ((index == 0 && dx >= 0) || (index == 2 && dx <= 0)) {
        setPanReleasse(true);
      }
      if (Math.abs(dx) < 20) {
        return;
      }
      barEvent({
        dx:
          (index * viewWidth.current + dx * -1) / 3 +
          viewWidth.current / 6 -
          30,
        dy: 0,
      });
      panEvent({ dx: index * viewWidth.current * -1 + dx, dy: 0 });
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 动画被打断后，需要复位
      const { dx, dy, vx } = gestureState;
      let sign = -Math.sign(dx);
      // 越界
      if (
        Math.abs(dx) < 30 ||
        (index == 0 && sign < 0) ||
        (index == 2 && sign > 0)
      ) {
        sign = 0;
      }

      let nextIndex = index + sign;
      setIndex(nextIndex);
      Animated.spring(panXY.x, {
        toValue: viewWidth.current * nextIndex * -1,
        speed: 15,
        bounciness: 3,
        useNativeDriver: true,
      }).start();
      Animated.spring(barXY.x, {
        toValue:
          (viewWidth.current * nextIndex) / 3 + viewWidth.current / 6 - 30,
        speed: 15,
        bounciness: 3,
        useNativeDriver: true,
      }).start();
      setPanReleasse(false);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, dy, vx } = gestureState;
      let sign = -Math.sign(dx);
      // 越界
      if (
        Math.abs(dx) < 30 ||
        (index == 0 && sign < 0) ||
        (index == 2 && sign > 0)
      ) {
        sign = 0;
      }

      let nextIndex = index + sign;
      setIndex(nextIndex);
      Animated.spring(panXY.x, {
        toValue: viewWidth.current * nextIndex * -1,
        speed: 15,
        bounciness: 3,
        useNativeDriver: true,
      }).start();
      Animated.spring(barXY.x, {
        toValue:
          (viewWidth.current * nextIndex) / 3 + viewWidth.current / 6 - 30,
        speed: 15,
        bounciness: 3,
        useNativeDriver: true,
      }).start();
    },
  });
  return (
    <>
      <Animated.View style={Style["tabHeader"]}>
        <Text
          style={{ ...Style["scrollLabel"], opacity: index == 0 ? 1 : 0.5 }}
        >
          广场
        </Text>
        <Text
          style={{ ...Style["scrollLabel"], opacity: index == 1 ? 1 : 0.5 }}
        >
          地图
        </Text>
        <Text
          style={{ ...Style["scrollLabel"], opacity: index == 2 ? 1 : 0.5 }}
        >
          123
        </Text>
        <Animated.View
          style={{
            ...Style["scrollBar"],
            transform: [{ translateX: barXY.x }],
          }}
        >
          <Text>2</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        onLayout={handleLayout}
        style={{
          ...Style["tabContainer"],
          transform: [{ translateX: panXY.x }],
        }}
        {..._panResponder.panHandlers}
      >
        {tabs.map((item) => (
          <View
            key={item.text}
            style={{ ...Style["tabOne"], backgroundColor: item.color }}
          >
            <Text>
              {item.text} | {index}
            </Text>
          </View>
        ))}
      </Animated.View>
    </>
  );
};
const Style = StyleSheet.create({
  tabHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    borderBottomWidth: 1,

    borderBottomHeight: 10,
    borderBottomColor: "#0505050f",
    color: "red",
  },
  scrollLabel: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 500,
    padding: 12,
    width: "33%",
  },
  scrollBar: {
    width: 60,
    height: 3,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#1677ff",
    borderRadius: 4,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    height: 400,
    backgroundColor: "red",
  },
  tabOne: {
    width: "100%",
  },
});
export default tabView;
