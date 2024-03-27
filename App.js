import React from "react";
import search from "./assets/search_black_24dp.svg";
import { Platform, View, Text, StyleSheet, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native-svg";

const App = () => {
  // Use useSelector hook to get the login status from Redux store

  return (
    <View className="h-[100%]">
      <LinearGradient
        className="h-[30%] rounded-b-2xl"
        colors={["#7289F1", "#aebff4"]}
      >
        <GestureHandlerRootView style={styles.container}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Search name movie or select options"
            />
            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00e4de",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#0d1829",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "80%",
    maxWidth: 600,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    paddingLeft: 10,
    color: "#cccccc",
  },
  button: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: "#0d1829",
  },
});
export default App;
