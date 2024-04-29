import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// Button component to display the IDs
export const ShowCheckedIdsButton = ({
  checkedIds,
  onPress,
  state,
  marginbottom,
}) => {
  return (
    <View className={`${marginbottom}`}>
      {console.log(marginbottom)}
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>change to {state}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    position: "relative",
    top: 14,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
