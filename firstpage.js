import React from "react";
import search from "./assets/search_black_24dp.svg";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Catalogueitems from "./src/components/Catalogueitems";
import Medicationitems from "./src/components/Medicationitems";

const App = () => {
  return (
    <ScrollView className="h-[100%]">
      <StatusBar backgroundColor="#7289F1" barStyle="light-content" />
      <KeyboardAvoidingView className="h-[17%]">
        <LinearGradient
          className=" rounded-b-[35px]"
          colors={["#7289F1", "#9EB3FF"]}
        >
          <GestureHandlerRootView style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search name movie or select options"
              />
              <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="magnify" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </GestureHandlerRootView>
          <View className="flex h-[60%]w-[100%] flex-row mt-[5%] justify-around   ">
            <View className="w-[25%] h-[70%] flex bg-[#AEBFF4] rounded-3xl  justify-center  ">
              <Image
                className=" m-auto "
                source={require("./assets/svg1.png")}
              />
              <Text className="text-center mb-3">Emergency Pharmacy</Text>
            </View>
            <View className="w-[25%] h-[70%] flex bg-[#AEBFF4] rounded-3xl  justify-center  ">
              <Image
                className=" m-auto "
                source={require("./assets/checklist.png")}
              />
              <Text className="text-center mb-3">On Order</Text>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
      <View>
        <Text className="font-bold text-2xl ml-3 mt-[10%]">Catalogue</Text>

        <Catalogueitems />
      </View>
      <View>
        <Text className="font-bold text-2xl ml-3 mt-4">My Medications</Text>
        <Medicationitems />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",

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
    backgroundColor: "#ffffff",
  },
});
export default App;
