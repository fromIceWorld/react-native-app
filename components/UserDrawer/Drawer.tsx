import { useState } from "react";
import { ScrollView, StyleSheet,TouchableHighlight,TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";


import UserAvatar from "../user/UserAvatar";


const UserDrawer = () => {
  return (
    <View style={UserStyles['container']}>
      <TouchableOpacity>
        <UserAvatar></UserAvatar>
      </TouchableOpacity>
      <TouchableOpacity style={UserStyles['name']}>
        <View>
          <Text >John Doe</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity  style={UserStyles['id']}>
        <Text >@President</Text>
      </TouchableOpacity>
      
      <ScrollView>
        
      </ScrollView>
    </View>
  );
};
export default UserDrawer;

const UserStyles = {
  container:{
    paddingTop:50,
    paddingLeft:20,
  },
  name: {
    paddingTop: 10,
    fontSize:16
  },
  id: { 
    paddingTop:2
},
};