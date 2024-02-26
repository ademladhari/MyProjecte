import React, { useContext, useDebugValue } from "react";
import AuthContext from "../reducers/reducerauth2";


const useAuth = () => {
  const { auth } = useContext(AuthContext);

  // Custom debug value for useDebugValue
  useDebugValue(auth ? "Logged In" : "Logged Out");

  return { auth };
};

export default useAuth;
