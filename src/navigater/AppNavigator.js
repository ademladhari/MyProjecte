import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthentication, logoutUser } from "../redux/actions/actionAuth";
import HomePage from "../pages/HomePage";
import DetailsScreen from "../pages/DetailsScreen";
import Auth from "../pages/Auth";
import DeliveryPage from "../pages/deliveries-page";
import NotificationsPage from "../pages/notification-page";
import Profile from "../pages/profile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import { Dimensions, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Collectedpage from "../pages/collected-page";
import QRCodeScanner from "../pages/scannerscreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const screenWidth = Dimensions.get("window").width;
const CustomDrawerContent = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser());
  }

  return (
    <View
      className="mt-10"
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => navigateToScreen("Home")}>
          <DrawerItem
            label=""
            icon={({ color, size }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="home" color={color} size={size} />
                <Text style={{ marginLeft: 10, width: screenWidth * 0.4 }}>
                  Home
                </Text>
              </View>
            )}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen("Delivery")}>
          <DrawerItem
            label=""
            icon={({ color, size }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={"truck"}
                  size={25}
                  color={color}
                />

                <Text style={{ marginLeft: 10 }}>Delivery</Text>
              </View>
            )}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen("collected")}>
          <DrawerItem
            label=""
            icon={({ color, size }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={"truck"}
                  size={25}
                  color={color}
                />

                <Text style={{ marginLeft: 10 }}>Collected</Text>
              </View>
            )}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen("Notification")}>
          <DrawerItem
            label=""
            icon={({ color, size }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="notifications" color={color} size={size} />
                <Text style={{ marginLeft: 10 }}>Notification</Text>
              </View>
            )}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen("Profile")}>
          <DrawerItem
            label=""
            icon={({ color, size }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="person" color={color} size={size} />
                <Text style={{ marginLeft: 10 }}>Profile</Text>
              </View>
            )}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => logout()}>
          <DrawerItem
            label=""
            icon={({ color, size }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={"logout-variant"}
                  size={30}
                  color={color}
                />
                <Text style={{ marginLeft: 10 }}>LogOut</Text>
              </View>
            )}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MainNavigator = () => (
  <Drawer.Navigator drawerContent={CustomDrawerContent}>
    {/* Define your screens here */}
    <Drawer.Screen name="Home" component={HomePage} />
    <Drawer.Screen name="Delivery" component={DeliveryPage} />
    <Drawer.Screen name="collected" component={Collectedpage} />
    <Drawer.Screen name="Delivered" component={DeliveryPage} />
    <Drawer.Screen name="Notification" component={NotificationsPage} />
    <Drawer.Screen name="Profile" component={Profile} />
  </Drawer.Navigator>
);

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
            <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />

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

export default AppNavigator;
