import { StyleSheet, PanResponder } from "react-native";
import { useState } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import useDrawerStore from "../../Store/drawerState";
import TabView from "@/components/tabView";

export default function TabOneScreen() {
  return (
    <>
      <TabView></TabView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    paddingTop: 260,
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
