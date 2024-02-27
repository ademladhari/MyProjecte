import { useDispatch } from "react-redux";
import { login } from "../../services/AuthLogin";

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
      const token = await login(username, password);
      console.log(token);
      dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
      console.log(error)
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const checkAuthentication = () => {
  return async (dispatch) => {
    dispatch({ type: CHECK_AUTHENTICATION_REQUEST });
    try {
      // You should implement this part based on your authentication logic
      // For example, you might need to check if the user has a valid token
      // If authenticated, dispatch CHECK_AUTHENTICATION_SUCCESS
      // If not authenticated, dispatch CHECK_AUTHENTICATION_FAILURE
    } catch (error) {
      dispatch({ type: CHECK_AUTHENTICATION_FAILURE, payload: error.message });
    }
  };
};
