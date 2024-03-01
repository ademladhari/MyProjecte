import React from "react";
import { Image, Text, View } from "react-native";

const DeliveryDetailsCard = (prop) => {
  const { img, number, deliveredOrPending, color } = prop;
  return (
    <View className=" w-[90%] h-[120px] bg-[#FFFFFE] md:w-[50%] mt-8  ml-5 rounded-md  ">
      <View className="flex flex-row ">
        <View className="w-[20%]">
          <Text className=" mt-5 ml-6  text-xl text-Bold ">p</Text>
        </View>
        <View className="w-[50%]">
          <Text className="  text-xl mt-5 text-Bold text-blue-500 ">
            bill:#SPOO162
          </Text>
          <Text className="   font-normal ">08/01/2024</Text>
          <Text className=" text-lg mt-5 text-Bold font-normal ">
            3x AMPM PLUS 150ML
          </Text>
        </View>
        <View className="w-[25%]">
          <View className="flex flex-col">
            <Text className="mt-4 ml-5">Img here</Text>
            <Text className={`text-xl mt-12 ml-5 text-${color}   `}>
              133.00
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryDetailsCard;
