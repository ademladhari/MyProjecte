import {
  CHECK_AUTHENTICATION_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/actionAuth";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        error: null, // Reset error on successful login
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload, // Update error message
      };
      case CHECK_AUTHENTICATION_SUCCESS: 
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        error: null, // Reset error on successful login
      
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
