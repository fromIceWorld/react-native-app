import { Avatar } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

const UserAvatar = () => {
  return (
    <View style={Style["bg"]}>
      <Avatar
        avatarStyle={Style["avatar"]}
        size={36}
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      ></Avatar>
    </View>
  );
};

const Style = StyleSheet.create({
  bg: {
    marginLeft: 15,
  },
  avatar: {
    borderRadius: "50%",
  },
});

export default UserAvatar;
