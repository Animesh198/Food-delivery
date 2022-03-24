import { View, Text, Modal, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import "firebase/compat/firestore";
import { NavigationContainer } from "@react-navigation/native";
import LottieView from "lottie-react-native";
export default function ViewCart({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const addOrderToFirebase = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection("orders")
      .add({
        items: items,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);

          navigation.navigate("OrderCompleted");
        }, 2500);
      });
  };

  const styles = StyleSheet.create({
    modalConatiner: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: "center",
      fontWeight: "700",
      fontSize: 18,
      marginBottom: 10,
    },
    subTotalConatainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    subTotalText: {
      textAlign: "left",
      fontWeight: "800",
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalConatiner}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}

              <View style={styles.subTotalConatainer}>
                <Text style={styles.subTotalText}>SubTotal</Text>
                <Text>{`$${total}`}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    backgroundColor: "black",
                    alignItems: "center",
                    padding: 13,
                    borderRadius: 30,
                    width: 300,
                    position: "relative",
                  }}
                  onPress={() => {
                    addOrderToFirebase();
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            Bottom: 30,
            zIndex: 999,
            marginTop: "170%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                alignItems: "center",
                backgroundColor: "black",
                padding: 13,
                borderRadius: 30,
                width: 250,
                position: "relative",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                View Cart
              </Text>
              <Text
                style={{ color: "white", fontSize: 20 }}
              >{`$${totalUSD}`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.4,
            justifyContent: "center",
            alignItems: "center",
            height: "150%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
