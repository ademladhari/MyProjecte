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
import Login from "../components/Login";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export default function Auth({ navigation }) {
  // Initialize navigation using useNavigation hook
  const goToAuthScreen = () => {
    navigation.navigate("HomeScreen");
  };
  return (
    <View>
      <Image
        className={`mb-[20px] h-[400px] w-[100%]  shadow mx-auto  absolute`}
        source={require("../../assets/authimg.png")}
      />
      <View className=" bg-slate-100 shadow-lg  shadow-black w-[80%] m-auto h-[67%] mt-[50%] rounded-xl">
        <Login goToAuthScreen={goToAuthScreen} />
      </View>
    </View>
  );
}
