import React,{useState,useRef} from "react";
import MapView,{Marker} from "react-native-maps";
import { StyleSheet, View, PanResponder,Animated } from "react-native";
import { Dimensions } from "react-native";

export default function Map() {
  const mapIns = useRef(null);
  const {width,height} = Dimensions.get('window')
  const [region,setRegin] = useState({
    latitude: 39.9082,
    longitude: 116.3976,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [markers,setMarkers] = useState([
    {
      title:'1',
      latlng:{latitude:39.9082,longitude:116.3976},
      description:'模拟'
    }
  ])
  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    // onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: (evt, gesture) => {
      return false;
    },
    onPanResponderMove:(evt,gesture)=>{
      console.log('map move')
    }
  });
  return (
    <Animated.View style={{...styles.container,width,height}} {...pan.panHandlers}>
      <MapView style={{width,height}} region={region} ref={(map:any)=>mapIns.current = map}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
      </MapView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
