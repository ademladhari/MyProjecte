import { useDispatch } from "react-redux";
import { login } from "../../services/AuthLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native"; // Import Alert from react-native
import { getUserData } from "./ActionUser";
import { useRef, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const CHECK_AUTHENTICATION_REQUEST = "CHECK_AUTHENTICATION_REQUEST";
export const CHECK_AUTHENTICATION_SUCCESS = "CHECK_AUTHENTICATION_SUCCESS";
export const CHECK_AUTHENTICATION_FAILURE = "CHECK_AUTHENTICATION_FAILURE";

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const { token, user } = await login(username, password);
      const [expoPushToken, setExpoPushToken] = useState("");
      const [notification, setNotification] = useState(false);
      const notificationListener = useRef();
      const responseListener = useRef();
      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", token);
      useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
          setExpoPushToken(token)
        );

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
          });

        return () => {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        };
      }, []);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user },
      });
      // Phone Token Creation
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      // Show error alert
      showAlert("Login Failed");
    }
  };
};
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

export const checkAuthentication = () => {
  return async (dispatch) => {
    dispatch({ type: CHECK_AUTHENTICATION_REQUEST });
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("userData"); // Example function to fetch user data
      if (token) {
        dispatch({
          type: CHECK_AUTHENTICATION_SUCCESS,
          payload: { token, user },
        });
        // Show success alert
      } else {
        dispatch({ type: CHECK_AUTHENTICATION_FAILURE });
        // Show error alert
        showAlert("Authentication Failed");
      }
    } catch (error) {
      dispatch({ type: CHECK_AUTHENTICATION_FAILURE, payload: error.message });
      // Show error alert
      showAlert("Error: Authentication Failed");
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userData");

      dispatch({ type: LOGOUT_SUCCESS });
      // Show success alert
      showAlert("Logout Successful");
    } catch (error) {
      dispatch({ type: LOGOUT_FAILURE, payload: error.message });
      // Show error alert
      showAlert("Logout Failed");
    }
  };
};

// Function to show an alert
const showAlert = (message) => {
  Alert.alert(
    "Alert",
    message,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};
const storePushToken = async (userData) => {
  if (!Device.isDevice) {
    return;
  }
  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: "9675060f-ce94-49c2-af77-09e9b5674ec5",
    })
  ).data;
  const tokenData = userData.pushTokens || {};
  const tokenArray = Object.values(tokenData);
  if (tokenArray.includes(token)) {
    return;
  }
  tokenArray.push(token);
  for (let i = 0; i < tokenArray.length; i++) {
    const tok = tokenArray[i];
    tokenData[i] = tok;
  }
};
