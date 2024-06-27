import Drawer from "react-native-drawer";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import UserAvatar from "../user/UserAvatar";

interface Prop {
  open: boolean;
}

const UserDrawer = (prop: Prop) => {
  let [drawerOpen, setDrawerStatus] = useState(false);
  return (
    <View>
      <UserAvatar></UserAvatar>
      <Text style={UserStyles['name']}>神经元</Text>
      <Text style={UserStyles['id']}>@12424232123234</Text>
      <ScrollView>
        
      </ScrollView>
    </View>
  );
};
export default UserDrawer;

const UserStyles = {
  name: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  id: { 
    paddingLeft: 10,
},
};