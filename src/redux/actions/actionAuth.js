import { useDispatch } from "react-redux";
import { login } from "../../services/AuthLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native"; // Import Alert from react-native
import { getUserData } from "./ActionUser";

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
      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user },
      });
      // Show success alert
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      // Show error alert
      showAlert("Login Failed");
    }
  };
};

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
