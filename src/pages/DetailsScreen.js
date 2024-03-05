import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import Carddelivery from "../components/Carddelivery";
import DeliveryDetailsCard from "../components/DeliveryDetailsCard";
import CustomerDetails from "../components/CustomerDetails";
import Buttom from "../components/Buttom";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DetailsScreen = ({ route, navigation }) => {
  const { name, description, image, price } = route.params;
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
    fetchUserData()
  },[])
 
  return (
    <View className="h-screen ">
      <View className="w-full h-[5%]  bg-blue-600 text-red-400"></View>
      <View className=" flex flex-row mb-4 ">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        >
          <Ionicons
            name="chevron-back"
            size={34}
            color="blue"
            className=" ml-2 mt-8"
          />
        </TouchableOpacity>

        <Text className="text-2xl h-[100%]  ml-20 mt-3">Delivery Details</Text>
      </View>
      <View>
        <DeliveryDetailsCard
          img={require("../../assets/pendinggg.png")}
          deliveredOrPending={"Pending"}
          number={27}
          color="red-400"
        ></DeliveryDetailsCard>
      </View>
      <View className="h-[13%]">
        <Text className="text-3xl text-blue-700 text-center border-b-[2.2px] w-[60%] m-auto  border-[blue]   mt-8">
          Medication Details
        </Text>
      </View>

      <View className="h-[45%]">
      {userData && (
        <CustomerDetails number={userData.TelMobile} Address={userData.Governorate} />
      )}</View>
      <View className="h-[10%] mt-7">
        <Buttom name={"livree"} width={"80%"} height={"100px"}></Buttom>
      </View>
    </View>
  );
};
