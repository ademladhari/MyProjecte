import React, { useCallback, useEffect, useRef, useState } from "react";
import { Provider, useSelector } from "react-redux"; // Import useSelector hook
import { store } from "./src/redux/store/store";
import AppNavigator from "./src/navigater/AppNavigator";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
const App = () => {
  // Use useSelector hook to get the login status from Redux store

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
