import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo
import { SvgUri } from "react-native-svg";
import Auth from "../pages/Auth";
import HomePage from "../pages/HomePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { DetailsScreen } from "../pages/DetailsScreen";
import DeliveryPage from "../pages/deliveries-page";
import profile from "../pages/profile";
import Profile from "../pages/profile";
import { useDispatch, useSelector } from "react-redux";
import StartPage from "../pages/StartPage";
import { useEffect } from "react";
import { checkAuthentication } from "../redux/actions/actionAuth";

const Stack = createStackNavigator();
const tab = createBottomTabNavigator();

const AppNavigator = ({ navigation }) => {
  // Set the authentication status here

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthentication());
  }, []);
  console.log(isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Startup"
              component={StartPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={Auth}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeScreen"
              component={HomeScreen}
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

const HomeScreen = () => (
  <tab.Navigator>
    <tab.Screen
      name="Home"
      component={HomePage}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }}
    />
    <tab.Screen
      name="Delivery"
      component={DeliveryPage}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <SvgUri
            uri={require("../../assets/reshot-icon-deliveryman-WXMKFGR8LT.svg")}
            width="100%"
            height="100%"
            fill={color}
          />
        ),
      }}
    />
    <tab.Screen
      name="HomeScreen"
      component={HomePage}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="notifications" color={color} size={size} />
        ),
      }}
    />
    <tab.Screen
      name="profile"
      component={Profile}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      }}
    />
    {/* Add more screens here if needed */}
  </tab.Navigator>
);

export default AppNavigator;
