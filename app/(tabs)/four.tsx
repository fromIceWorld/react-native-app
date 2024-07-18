import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet } from 'react-native';
import UserAvatar from "@/components/user/UserAvatar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 44,
  },
});

const Four = () => {
  return (
    <>
     <View>
      <UserAvatar></UserAvatar>
    </View>
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
            console.log('sign',credential)
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              console.log('load cancel')
              // handle that the user canceled the sign-in flow
            } else {
              console.log('load error')
              // handle other errors
            }
          }
        }}
      />
    </View>
    </>
   
  );
};
export default Four;
