import { Avatar } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

const UserAvatar = () => {
  return (
    <View style={Style["bg"]}>
      <Avatar
        avatarStyle={Style["avatar"]}
        size={36}
        source={require('@/assets/images/adaptive-icon.png')}
        ></Avatar>
    </View>
  );
};

const Style = StyleSheet.create({
  bg: {
  },
  avatar: {
    borderRadius: 48,
  },
});

export default UserAvatar;
