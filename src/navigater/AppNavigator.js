import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthentication } from "../redux/actions/actionAuth";
import HomePage from "../pages/HomePage";
import DetailsScreen from "../pages/DetailsScreen";
import Auth from "../pages/Auth";
import DeliveryPage from "../pages/deliveries-page";
import NotificationsPage from "../pages/notification-page";
import Profile from "../pages/profile";
import { Ionicons } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Auth"
            component={Auth}
          />
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Main"
              component={MainNavigator}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="DetailsScreen"
              component={DetailsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Home"
      component={HomePage}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name="Delivery"
      component={DeliveryPage}
      options={{
        drawerIcon: ({ color, size }) => (
          <SvgUri
            uri={require("../../assets/reshot-icon-deliveryman-WXMKFGR8LT.svg")}
            width="100%"
            height="100%"
            fill={color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Notification"
      component={NotificationsPage}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="notifications" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={Profile}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default AppNavigator;
