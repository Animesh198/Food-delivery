import { View, Text } from "react-native";
import React from "react";
import About from "../Components/RestaurantDetail/About";
import MenuItem from "../Components/RestaurantDetail/MenuItem";
import { ScrollView } from "react-native";

export default function RestaurantDetail() {
  return (
    <View>
      <About />
      <MenuItem />
    </View>
  );
}
