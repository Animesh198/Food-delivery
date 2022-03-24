import { View, Text, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItem from "../Components/RestaurantDetail/MenuItem";
export default function OrederCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Tandoori Chicken",
        description:
          "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
        price: "$19.20",
        image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
      },
    ],
  });
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => setLastOrder(doc.data()));
      });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          margin: 15,
          alignItems: "center",
          height: "100%",
          flex: 1,
        }}
      >
        <LottieView
          style={{
            height: 100,
            alignSelf: "center",
            marginBottom: 8,
          }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          your order at {restaurantName} completed with ${total}
        </Text>
        <MenuItem foods={lastOrder.items} hideCheckbox={true} />
        <LottieView
          style={{
            height: 200,
            alignSelf: "center",
            marginBottom: 10,
          }}
          source={require("../assets/animations/cooking.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
      </View>
    </SafeAreaView>
  );
}
