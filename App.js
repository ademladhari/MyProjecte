import React, { useCallback, useState } from "react";
import { Provider, useSelector } from "react-redux"; // Import useSelector hook
import { store } from "./src/redux/store/store";
import AppNavigator from "./src/navigater/AppNavigator";
import { AppRegistry } from "react-native";

const App = () => {
  // Use useSelector hook to get the login status from Redux store

  return (
    <Provider store={store}>
      r
      <AppNavigator />
    </Provider>
  );
};
AppRegistry.registerComponent("myprojecte", () => App);

export default App;
