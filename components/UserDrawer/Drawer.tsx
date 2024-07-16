import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {useState,useEffect} from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,Appearance,PanResponder
} from "react-native";
import { Text, View } from "@/components/Themed";
import type {
  AppearancePreferences,
  ColorSchemeName,
  // @ts-ignore
} from 'react-native/Libraries/Utilities/NativeAppearance';
import UserAvatar from "../user/UserAvatar";
import MyDrawer from "../MyDrawer/MyDrawer";
import * as Haptics from 'expo-haptics';
import { getDirectionByCoord ,Direction} from "@/utils/panDirection";

const Menus = [
  {
    icon: {
      component: <AntDesign name="user" size={24} />,
    },
    label: "个人空间",
  },
  {
    icon: {
      component: <FontAwesome name="star-o" size={24} />,
    },
    label: "收藏",
  },
  {
    icon: {
      component: <Feather name="mic" size={24} />,
    },
    label: "直播",
  },
];

let releasePanRespond = true

const UserDrawer = () => {
  const [nativeColorScheme, setNativeColorScheme] = useState<ColorSchemeName | null>(null);
  
  useEffect(() => {
    Appearance.setColorScheme(nativeColorScheme);
  }, [nativeColorScheme]);
  function changeThemed(){
    Haptics.selectionAsync();
    setNativeColorScheme(nativeColorScheme == 'dark' ? 'light' : 'dark');
  } 
  const listPan = PanResponder.create({
    onStartShouldSetPanResponder:()=>releasePanRespond,
    onMoveShouldSetPanResponder:()=>releasePanRespond,
    onPanResponderTerminationRequest:()=>!releasePanRespond,
    onPanResponderMove:(evt,gesture)=>{
      const {dx,dy} = gesture;
      const direction = getDirectionByCoord({x:dx,y:dy});
      if(direction == Direction.left && dx < -20){
        releasePanRespond = false
      }
    },
    onPanResponderTerminate:()=>{
      releasePanRespond = true
    }
  })
 
  return (
    <View style={UserStyles["container"]}  {...listPan.panHandlers}>
      <TouchableOpacity>
        <UserAvatar></UserAvatar>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={UserStyles["name"]}>官凉</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={UserStyles["id"]}>@President</Text>
      </TouchableOpacity>
      <View style={UserStyles["followAboart"]}>
        <TouchableOpacity
          style={{ ...UserStyles["following"], paddingRight: 10 }}
        >
          <Text style={UserStyles["followAboartCount"]}>0</Text>
          <Text style={UserStyles["followType"]}>正在关注</Text>
        </TouchableOpacity>
        <TouchableOpacity style={UserStyles["followers"]}>
          <Text style={UserStyles["followAboartCount"]}>0</Text>
          <Text style={UserStyles["followType"]}>关注者</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={UserStyles["menuContainer"]}>
          {Menus.map((item) => (
            <TouchableHighlight key={item.label}>
              <View style={UserStyles["menuItem"]}>
                {item.icon.component}
                <Text style={UserStyles["menuLabel"]}>{item.label}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={UserStyles["themeChange"]} onPress={()=>changeThemed()}>
        <Feather name="sun" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
export default UserDrawer;

const UserStyles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 30,
    height: "100%",
  },
  name: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 500,
  },
  id: {
    paddingTop: 5,
    color: "#000000a6",
  },
  followAboart: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
  },
  following: {
    display: "flex",
    flexDirection: "row",
  },
  followers: {
    display: "flex",
    flexDirection: "row",
  },
  followAboartCount: {
    fontWeight: 500,
  },
  followType: {
    color: "#000000a6",
    paddingLeft: 4,
  },
  menuContainer: {
    marginTop: 40,
  },
  menuItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },
  menuLabel: {
    fontSize: 20,
    fontWeight: 500,
    marginLeft: 25,
  },
  themeChange: {
    position: "absolute",
    left: 30,
    bottom: 40,
  },
});
