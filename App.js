import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store/store";
import  AppNavigator  from "./src/navigater/AppNavigator";
// Import your Redux store
// Example import of your main component

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
