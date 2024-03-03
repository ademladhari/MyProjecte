import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Buttom from "./Buttom";
import { useDispatch } from "react-redux";
import { checkAuthentication, loginUser } from "../redux/actions/actionAuth";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Stack = createStackNavigator();

  const handleLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      dispatch(
        loginUser(username, password, () => {
          navigation.navigate("HomeScreen")
        })
      );
    } else {
      dispatch(checkAuthentication(() => {
        navigation.navigate("HomeScreen")}));
    }
  };

  return (
    <View>
      <Text className="text-4xl font-bold mt-12 ml-4 mb-16">Login</Text>
      <Text className="text-base ml-6">User Name</Text>
      <TextInput
        className=" border-[0.5px] pb-0 p-1 ml-4  pl-2 rounded-lg w-[90%]"
        placeholder="User Name or Phone Number"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text className="text-base ml-6 mt-5">User Name</Text>
      <TextInput
        className=" border-[0.5px] pb-0 p-1 ml-4  pl-2 rounded-lg w-[90%]"
        placeholder="Your Password "
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text className="text-sm ml-32 mt-5 mb-12">Forget Password ?</Text>

      <Buttom name={"login"} width={"90%"} height={"70%"} route={handleLogin} />
    </View>
  );
};

export default Login;
