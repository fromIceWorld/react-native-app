import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import { useState, useRef } from "react";
import MyDrawer from "./MyDrawer/MyDrawer";
import { Diriction, getDirectionByCoord } from "@/utils/panDirection";

interface TabProp{
  label:string,
  component:React.JSX.Element
}
interface TabsProp{
  tabs:TabProp[]
}



const TabView = (prop:TabsProp) => {
  const tabCount = useRef(prop.tabs.length)
  const [tabIndex, setTabIndex] = useState(0);
  const viewWidth = useRef(0);
  const handleLayout = (event: any) => {
    console.log(event.nativeEvent.layout.width);
    const layoutWidth = event.nativeEvent.layout.width;
    viewWidth.current = layoutWidth;
    // 初始位置
    Animated.spring(barXY.x, {
      toValue: layoutWidth / (tabCount.current*2) - 30,
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


  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => TabView.canTabViewRespond,
    onMoveShouldSetPanResponder: (evt, gestureState) => TabView.canTabViewRespond,
    onPanResponderTerminationRequest: (evt, gestureState) => !TabView.canTabViewRespond,
    onPanResponderGrant: (evt, gestureState) => {
      // canTabViewRespond = true
    },
    onPanResponderMove: (evt, gestureState) => {

      const { dx,dy, vx } = gestureState;
      console.log('tabview onMove',dx,dy, )
      const direction = getDirectionByCoord({x:dx,y:dy});
      // 当在边界滑动时，交出控制权
      let barTargetDX = 0;
      if((tabIndex == 0 && direction == Diriction.right) || (tabIndex == tabCount.current-1 && direction == Diriction.left)){
        TabView.canTabViewRespond = false
        barTargetDX = 0;
        return
      }else{
        barTargetDX =  Math.max((tabIndex * viewWidth.current + dx * -1) / tabCount.current +
        viewWidth.current / (tabCount.current*2) -30,viewWidth.current / (tabCount.current*2) - 30)
      }
      let panTargetDX = 0
      if(tabIndex == 0 && dx >=0){
        panTargetDX = 0
      }else if((tabIndex == tabCount.current-1) && dx <=0){
        panTargetDX = tabIndex * viewWidth.current * -1 
      }else{
        panTargetDX = tabIndex * viewWidth.current * -1 + dx
      }
      barEvent({
        dx: barTargetDX,
        dy: 0,
      });
      panEvent({ dx: panTargetDX, dy: 0 });
    },

    onPanResponderTerminate: (evt, gestureState) => {
      // 动画被打断后，需要复位
      const { dx, dy, vx } = gestureState;
      let sign = -Math.sign(dx);
      // 越界
      if (
        Math.abs(dy) > Math.abs(dx) ||
        (tabIndex == 0 && sign < 0) ||
        (tabIndex == tabCount.current-1 && sign > 0)
      ) {
        sign = 0;
      }

      let nextIndex = tabIndex + sign;
      setTabIndex(nextIndex);
      Animated.spring(panXY.x, {
        toValue: viewWidth.current * nextIndex * -1,
        speed: 15,
        bounciness: 3,
        useNativeDriver: true,
      }).start();
      Animated.spring(barXY.x, {
        toValue:
          (viewWidth.current * nextIndex) / tabCount.current + viewWidth.current / (tabCount.current*2) -30 ,
        speed: 15,
        bounciness: 3,
        useNativeDriver: true,
      }).start();
      TabView.canTabViewRespond = true
    },
    onPanResponderRelease: (evt, gestureState) => {
      console.log('tabView release')

      const { dx, dy, vx } = gestureState;
      let sign = -Math.sign(dx);
      // 越界
      if (
        Math.abs(dy) > Math.abs(dx) ||
        (tabIndex == 0 && sign < 0) ||
        (tabIndex == tabCount.current -1 && sign > 0)
      ) {
        sign = 0;
      }

      let nextIndex = tabIndex + sign;
      setTabIndex(nextIndex);
      Animated.spring(panXY.x, {
        toValue: viewWidth.current * nextIndex * -1,
        speed: 15,
        bounciness: 3,
        useNativeDriver: true,
      }).start();
      Animated.spring(barXY.x, {
        toValue:
          (viewWidth.current * nextIndex) / tabCount.current + viewWidth.current / (tabCount.current * 2) -30,
        speed: 15,
        bounciness: 3,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderReject:()=>{
      TabView.canTabViewRespond = true

    }
  });
  return (
    <>
      <Animated.View style={Style["tabHeader"]}>
        {prop.tabs.map((item,index)=>
          <Text
          key={item.label}
          style={{ ...Style["scrollLabel"], opacity: index == tabIndex ? 1 : 0.5 }}
        >
          {item.label}
        </Text>
        )}
        <Animated.View
          style={{
            ...Style["scrollBar"],
            transform: [{ translateX: barXY.x }],
          }}
        >
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
        {prop.tabs.map((item) => (
          <View
            key={item.label}
            style={Style["tabOne"] }
          >
            {item.component}
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
    left:0,
    bottom: 0,
    backgroundColor: "#1677ff",
    borderRadius: 4,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    height: '100%',
    backgroundColor: "red",
  },
  tabOne: {
    width: "100%",
    backgroundColor: '#fff'
  },
});

TabView.canTabViewRespond = false
export default TabView;
