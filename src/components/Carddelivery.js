import React from "react";
import { Image, Text, View } from "react-native";

const Carddelivery = (prop) => {
  const { img, number, deliveredOrPending, color } = prop;
  return (
    <View className=" w-[90%] h-[40%] bg-[#FFFFFE] md:w-[50%] mt-3  ml-5 rounded-md  ">
      <View className="flex flex-row ">
        <View className="w-[20%]">
          <Text className=" mt-5 ml-6  text-xl text-Bold ">p</Text>
        </View>
        <View className="w-[50%]">
          <Text className="  text-xl mt-5 text-Bold text-blue-500 ">
            #SPOO162
          </Text>
          <Text className=" text-lg mt-2 text-Bold font-normal ">
            3x AMPM PLUS 150ML
          </Text>
        </View>
        <View className="w-[25%]">
          <Text className={`text-xl mt-6 ml-5 text-${color}   `}>133.00</Text>
        </View>
      </View>
    </View>
  );
};

export default Carddelivery;
