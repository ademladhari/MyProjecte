import React, { createContext, useReducer } from "react";

// Define initial state
const initialState = {};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext(initialState);

// Create provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAuth = (authData) => {
    dispatch({ type: "SET_AUTH", payload: authData });
  };

  return (
    <AuthContext.Provider value={{ auth: state.auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
