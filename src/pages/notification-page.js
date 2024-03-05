import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileSetting from "../components/Profile-Setting";
import AdressCard from "../components/adress-card";
import Buttom from "../components/Buttom";
import { logoutUser } from "../redux/actions/actionAuth";
import NotificationCard from "../components/notification-card";

export default function NotificationsPage({ navigation }) {
  // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <View>
      <View className="w-full h-[5%] bg-blue-600 text-red-400"></View>
      <View>
        <Text className="text-3xl ml-2 mt-2">Notification</Text>
      </View>
      <View>
        <NotificationCard></NotificationCard>
      </View>
    </View>
  );
}
