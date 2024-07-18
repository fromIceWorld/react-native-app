
import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import MyVideo from '@/components/video/Video';

export default function Space() {
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        <View style={styles.page} key="1">
       <MyVideo></MyVideo>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 300,
    width: '100%',
    backgroundColor: '#0553',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});