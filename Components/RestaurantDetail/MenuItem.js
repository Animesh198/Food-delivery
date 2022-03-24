import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    margin: 15,
  },

  titleStyle: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default function MenuItem({
  restaurantName,
  foods,
  hideCheckbox,
  marginLeft,
}) {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });
  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <View style={{ paddingBottom: 300, flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingBottom: 530 }}>
        {foods.map((food, index) => (
          <View key={index}>
            <View style={styles.menuItemStyle}>
              {hideCheckbox ? (
                <></>
              ) : (
                <BouncyCheckbox
                  iconStyle={{
                    borderColor: "lightgray",
                    borderRadius: 0,
                  }}
                  fillColor="green"
                  onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                  isChecked={isFoodInCart(food, cartItems)}
                />
              )}
              <FoodInfo food={food} />
              <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const FoodInfo = (props) => {
  return (
    <View style={{ width: 200, justifyContent: "space-evenly" }}>
      <Text style={styles.titleStyle}>{props.food.title}</Text>
      <Text>{props.food.description}</Text>
      <Text>{props.food.price}</Text>
    </View>
  );
};

const FoodImage = ({ marginLeft, ...props }) => {
  return (
    <View>
      <Image
        source={{ uri: props.food.image }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
          marginLeft: marginLeft,
        }}
      />
    </View>
  );
};
