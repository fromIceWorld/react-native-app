import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableHighlight,TouchableOpacity
} from "react-native";
import { Avatar } from "@rneui/themed";
import { router } from "expo-router";
import {Dimensions} from 'react-native'
const Style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width:Dimensions.get('window').width,
    height: 80,
  },
  avator: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 4,
  },
  avatorImg: {
    borderRadius: 4,
  },
  textMessage: {
    flex:1,
    height: 80,
    display: "flex",
    justifyContent: "space-around",
    marginRight:4,
    padding: 12,
    borderBottomWidth:1,
    borderBottomColor:'#0505050f',
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    color:'#555b6385',
    fontSize:12,
  },
  overview:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  message: {
    fontSize: 14,
    color: "#86939e",
  },
});
function chartWithany() {
  console.log('message')
  router.push({
    pathname: "/message/123",
    params: {
      name:'Tom',
      id: Math.random(),
    },
  });
}
const MessageItem = () => {

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={chartWithany}
    >
      <View style={Style["container"]}>
        <View style={Style["avator"]}>
          <Avatar
            avatarStyle={Style["avatorImg"]}
            size={48}
            source={require("@/assets/images/avator.webp")}
          />
        </View>
        <View style={Style["textMessage"]}>
          <View style={Style['overview']}>
          <Text style={Style["name"]}>Bob</Text>
          <Text style={Style["time"]}>2024/7/18</Text>
          </View>
         
          <Text style={Style["message"]}>Message</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default MessageItem;
