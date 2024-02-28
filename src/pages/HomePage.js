import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardSomething from "../components/CardSomething";

export default function HomePage({ navigation }) {
  const currentDate = new Date();
  // Format date as desired (e.g., "February 28, 2024")
  const formattedDate = currentDate.toLocaleDateString("en-EUROPE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <View className="h-[15%]">
        <View className="w-full h-[40%] bg-blue-600 text-red-400"></View>
        <Text className="text-2xl ml-4">Hi,!</Text>
        <Text className="text-base ml-4">{formattedDate}</Text>
      </View>
      <View className="flex w-[full] h-[23%] flex-row rounded-xl">
        <CardSomething
          img={require("../../assets/delivereddd.png")}
          deliveredOrPending={"Delivered"}
          number={27}
          color="green-700"
        />
        <CardSomething
          img={require("../../assets/pendinggg.png")}
          deliveredOrPending={"Pending"}
          number={27}
          color="red-400"
        />
      </View>
      <Text className="text-xl mt-3 ml-4"> Pending</Text>
      <View></View>
    </>
  );
}
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Set background color to transparent to see the gradient
  },
});
