import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// Button component to display the IDs
export const ShowCheckedIdsButton = ({ checkedIds, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Show Checked IDs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  buttonContainer: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
    top: -17,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
