import React from "react";
import { Image, Text, View } from "react-native";
const AdressCard = (prop) => {
  const { adress, region } = prop;
  const Line = ({ color = "black", height = 1, width = "100%" }) => (
    <View
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        marginLeft: 15,
      }}
    />
  );
  return (
    <View className=" w-[90%] h-[250px] bg-[#FFFFFE] md:w-[50%] mt-8  ml-5 rounded-md  ">
      <View className="">
        <View className="w-full">
          <Text className=" mt-5  mb-4 ml-6  text-xl text-Bold ">Adress</Text>

          <Line color="black" height={1} width="90%" />
          <Text className=" mt-3 ml-6 text-base">Adress</Text>
          <Text className=" mt-1 ml-6  text-base font-thin ">
            {adress}
          </Text>
        </View>
        <View className="">
          <Text className=" mt-3 ml-6 text-base  ">Region </Text>
          <Text className=" mt-1 ml-6  font-thin ">
            {region}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AdressCard;
