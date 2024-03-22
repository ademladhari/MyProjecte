import React, { useCallback, useEffect, useRef, useState } from "react";
import { Provider, useSelector } from "react-redux"; // Import useSelector hook
import { store } from "./src/redux/store/store";
import AppNavigator from "./src/navigater/AppNavigator";

const App = () => {
  // Use useSelector hook to get the login status from Redux store

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
