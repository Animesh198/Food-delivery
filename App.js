import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Screens/Home";
import RestaurantDetail from "./Screens/RestaurantDetail";
//import Home from "./Screens/Home";

export default function App() {
  return <RestaurantDetail />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
