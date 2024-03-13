import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileSetting from "../components/Profile-Setting";
import AdressCard from "../components/adress-card";
import Buttom from "../components/Buttom";
import { logoutUser } from "../redux/actions/actionAuth";

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userJson = await AsyncStorage.getItem("userData");
        const user = JSON.parse(userJson);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const dispatch = useDispatch();
  function logout() {
    dispatch(logoutUser());
    console.log("here");
  }

  // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <View>
      <View className="mt-12 text-lg font-bold mb-14 ">
        <Text className="text-center font-bold">
          Welcome, {userData && userData.Email}
        </Text>
      </View>

      <View>
        {userData && (
          <ProfileSetting
            name={userData.Name}
            Phonenumber={userData.TelMobile}
            password={userData.Password}
          />
        )}
      </View>

      <View>
        {userData && (
          <AdressCard adress={userData.Address} region={userData.Governorate} />
        )}
      </View>
      <View className="w-[90%] m-auto rounded-lg">
        <Button
          title="zae"
          className="rounded-lg"
          onPress={() => {
            logout();
          }}
        >
          <Text>aze</Text>
        </Button>
      </View>
    </View>
  );
}
