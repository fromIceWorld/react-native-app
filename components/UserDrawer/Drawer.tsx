import Drawer from "react-native-drawer";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import UserCard from "@/components/user/UserCard";

interface Prop {
  open: boolean;
}

const UserDrawer = (prop: Prop) => {
  let [drawerOpen, setDrawerStatus] = useState(false);
  return (
    <View>
      <UserCard></UserCard>
      <ScrollView>
        <Text>123</Text>
      </ScrollView>
    </View>
  );
};
export default UserDrawer;
