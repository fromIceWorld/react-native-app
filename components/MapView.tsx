import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, PanResponder } from "react-native";

export default function Map() {
  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: (evt, gesture) => {
      return true;
    },
  });
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
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
