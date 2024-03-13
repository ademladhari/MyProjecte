import React from "react";
import { Image, Text, View } from "react-native";

const DeliveryDetailsCard = (prop) => {
  const { demande } = prop;
  return (
    <View className=" w-[90%] h-[170px] bg-[#FFFFFE] md:w-[50%] mt-3  ml-5 rounded-md  ">
      <View className="flex flex-row ">
        <View className="w-[20%]">
          <Text className=" mt-4 ml-6  text-xl text-Bold ">p</Text>
        </View>
        <View className="w-[50%]">
          <Text className="  text-xl mt-4 text-Bold text-blue-500 ">
            {demande.requestName}
          </Text>
          <Text className="   font-normal ">{demande.Statusdate}</Text>
          <Text className=" text-lg mt-5 text-Bold font-normal ">
            {demande.codeQr}
          </Text>
        </View>
        <View className="w-[25%]">
          <View className="flex flex-col">
            <Text className="mt-4 text-xl ml-5">{demande.temperature} °C</Text>
            <Text className={`text-xl mt-12 ml-5    `}>{demande.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryDetailsCard;
