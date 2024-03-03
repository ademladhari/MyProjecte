import { useDispatch } from "react-redux";
import { login } from "../../services/AuthLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      console.log("clf", user);
      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const checkAuthentication = () => {
  return async (dispatch) => {
    dispatch({ type: CHECK_AUTHENTICATION_REQUEST });
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("userData"); // Example function to fetch user data
      console.log("hhhhh", user);
      console.log(token);
      if (token) {
        dispatch({
          type: CHECK_AUTHENTICATION_SUCCESS,
          payload: { token, user },
        });
      } else {
        dispatch({ type: CHECK_AUTHENTICATION_FAILURE });
      }
    } catch (error) {
      dispatch({ type: CHECK_AUTHENTICATION_FAILURE, payload: error.message });
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
    } catch (error) {
      dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    }
  };
};
