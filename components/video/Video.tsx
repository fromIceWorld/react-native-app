import {useRef,useState,useEffect} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import MyImage from '../image/image';

export default function MyVideo() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
 
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        posterSource={require('@/assets/images/humen.jpg')}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
});
