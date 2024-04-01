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
import DetailsContent from "./src/components/DetailsContent";

const App = () => {
  return (
    <SafeAreaView className="h-[100%]">
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <Text className="text-center text-5xl mt-9">Details</Text>
      <View className="mx-auto w-[85%] h-[55%]">
        <DetailsContent></DetailsContent>
      </View>
    </SafeAreaView>
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
