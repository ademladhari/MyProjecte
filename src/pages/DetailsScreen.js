import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import Carddelivery from "../components/Carddelivery";
import DeliveryDetailsCard from "../components/DeliveryDetailsCard";
import CustomerDetails from "../components/CustomerDetails";
import Buttom from "../components/Buttom";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

export const DetailsScreen = ({ route }) => {
  const { name, description, image, price } = route.params;

  return (
    <View className="h-screen ">
      <View className="w-full h-[5%]  bg-blue-600 text-red-400"></View>
      <View className="h-[3%]  flex flex-row mb-4 ">
        <Image
          className="w-[8%] h-[100%] ml-2 mt-3"
          source={require("../../assets/back.png")}
        ></Image>
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
        <CustomerDetails />
      </View>
      <View className="h-[10%] mt-7">
        <Buttom name={"Submit"} width={"80%"} height={"100px"}></Buttom>
      </View>
    </View>
  );
};
