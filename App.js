// App.js
import { GestureHandlerRootView } from "react-native-gesture-handler";

import React from "react";
import AppNavigator from "./src/navigater/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import { AuthProvider } from "./src/redux/reducers/reducerauth2";

const App = () => {
  return;
  <AuthProvider>
    <AppNavigator />;
  </AuthProvider>;
};

export default App;
