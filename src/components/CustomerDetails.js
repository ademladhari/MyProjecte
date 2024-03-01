import React from "react";
import { Image, Text, View } from "react-native";

const CustomerDetails = (prop) => {
  const { img, number, deliveredOrPending, color } = prop;
  const Line = ({ color = "black", height = 1, width = "100%" }) => (
    <View
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        marginLeft: 30,
      }}
    />
  );
  return (
    <View className=" w-[90%] h-[100%] flex flex-col bg-[#FFFFFE]    ml-5 rounded-md  ">
      <View className="h-[33%] w-[100%] flex flex-row">
        <View className="flex w-[80%] flex-col p-6  ">
          <Text className="text-lg text-[#acacac]">Full Name</Text>
          <Text className="text-xl mt-2 ">Name</Text>
        </View>
        <Image
          className=" w-[20%] h-[45%]  mt-3 rounded-full"
          source={require("../../assets/delivereddd.png")}
        />
      </View>
      <Line color="black" height={1} width="80%" />

      <View className="h-[33%] w-[100%] flex flex-row">
        <View className="flex w-[80%] flex-col p-6  ">
          <Text className="text-lg text-[#acacac]">Phone Number</Text>
          <Text className="text-xl mt-2 ">93303780</Text>
        </View>
        <Image
          className=" w-[17%] h-[51%] pb-3  mt-5  rounded-full"
          source={require("../../assets/phone-call.png")}
        />
      </View>
      <Line color="black" height={1} width="80%" />
      <View className="h-[30%] w-[100%] flex flex-row">
        <View className="flex w-[78%] flex-col p-6  ">
          <Text className="text-lg text-[#acacac]">Delivery Address</Text>
          <Text className="text-xl mt-2 ">somewhere in the world</Text>
        </View>
        <Image
          className=" w-[22%] h-[60%] mt-5 mr rounded-full"
          source={require("../../assets/location5.jpg")}
        />
      </View>
    </View>
  );
};

export default CustomerDetails;
