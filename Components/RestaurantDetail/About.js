import { View, Text, Image } from "react-native";
import React from "react";

const image =
  "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg";
const title = "Farmhouse Kitchen Thai Cusine";
const description = "Thai + ComfortFood • $$ • 🎫 • 4⭐ (2912+)";
export default function About() {
  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: "#eee",
      }}
    >
      <RestaurantImage image={image} />
      <RestaurantTitle title={title} />
      <RestaurantDesc description={description} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantTitle = (props) => (
  <Text
    style={{
      fontSize: 25,
      fontWeight: "900",
      marginHorizontal: 15,
      marginTop: 5,
    }}
  >
    {props.title}
  </Text>
);

const RestaurantDesc = (props) => (
  <Text
    style={{
      marginTop: 5,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 12,
      marginBottom: 5,
    }}
  >
    {props.description}
  </Text>
);
