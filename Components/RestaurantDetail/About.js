import { View, Text, Image } from "react-native";
import React from "react";

/*const title = "Farmhouse Kitchen Thai Cusine";*/

export default function About(props) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formattedCategory = categories.map((cat) => cat).join("•");

  const description = `${formattedCategory} • 🎫 • ${rating}⭐  (${reviews})`;
  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: "#eee",
      }}
    >
      <RestaurantImage image={image} />
      <RestaurantTitle title={name} />
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
