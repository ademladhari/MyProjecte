import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Startpage from "../pages/Startpage";
// Import your screens
// Corrected naming convention
import Auth from "../pages/Auth";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Startup" // Corrected screen name
          component={Startpage} // Corrected component name
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Auth"
          component={Auth}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
