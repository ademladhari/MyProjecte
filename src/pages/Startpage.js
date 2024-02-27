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
import Buttom from "../components/Buttom";

export default function Startpage({ navigation }) {
  const goToAuthScreen = () => {
    navigation.navigate("Auth");
  };
  return (
    <View>
      <Image
        className=" mt-[30px] mb-[20px] h-[400px]  rounded-xl shadow mx-auto"
        source={require("../../assets/Location tracking-pana 1.png")}
      />
      <Text className="  text-4xl text-center font-semibold ">Welcome</Text>

      <Text className=" text-sm text-center mt-24">
        {" "}
        Now, you can have your medications delivered to your home in just a few
        clicks
      </Text>
      <Buttom
        route={goToAuthScreen}
        name={"Start"}
        width={"90%"}
        height={"70%"}
      />
      <StatusBar style="auto" />
    </View>
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
