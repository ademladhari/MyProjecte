import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";

export const DetailsScreen = ({ route }) => {
  const { name, description, image, price } = route.params;

  return (
    <View>
      <Text>Medication Details</Text>

      <Text>Name: {name}</Text>
      <Text>Description: {description}</Text>
      <Text>Price: ${price}</Text>
    </View>
  );
};
