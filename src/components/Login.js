import React, { useEffect, useRef, useState } from "react";
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
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Stack = createStackNavigator();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const handleLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("tokencondition", token);
    if (!token) {
      console.log("first");
      registerForPushNotificationsAsync().then((token) =>
        console.log("expotoken", token)
      );

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      dispatch(loginUser(username, password, () => {}));
    } else {
      dispatch(checkAuthentication(() => {}));
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
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    console.log("here");
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "9675060f-ce94-49c2-af77-09e9b5674ec5",
      })
    ).data;
    console.log("token", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
