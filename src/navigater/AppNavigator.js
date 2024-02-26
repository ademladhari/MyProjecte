// AppNavigator.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import your screens

import Startpage from "../pages/Startpage";
import Auth from "../pages/Auth";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="startup"
          component={Startpage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="auth"
          component={Auth}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
