import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTabs from "../Components/Home/HeaderTabs";
import SearchBar from "../Components/Home/SearchBar";
import Categories from "../Components/Home/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../Components/Home/RestaurantItems";
import allRestaurantData from "../allRestaurantData.json";
import BottomTabs from "../Components/Home/BottomTabs";

export default function Home({ navigation }) {
  const [restaurantData, setrestaurantData] = useState(localRestaurants);
  const [activeTab, setactiveTab] = useState("Delivery");

  const getRestaurantsFromLocalJson = () => {
    setrestaurantData(
      allRestaurantData.filter((category) =>
        category.categories.includes(activeTab)
      )
    );
  };
  useEffect(() => getRestaurantsFromLocalJson(), [activeTab]);

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#eee",
        flex: 1,
      }}
    >
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setactiveTab={setactiveTab} />
        <SearchBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <BottomTabs />
    </SafeAreaView>
  );
}
