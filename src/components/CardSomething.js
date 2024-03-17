import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

const CardSomething = (prop) => {
  const { img, number, deliveredOrPending, color, name, colorText } = prop;
  return (
    <View className=" w-[42%] bg-[#FFFFFE]  ml-5 rounded-md  ">
      <MaterialCommunityIcons
        style={{ top: "10%", left: "65%" }}
        name={name}
        size={45}
        color={color}
      />

      <Text
        className={`text-3xl ${colorText} ml-3 mt-6`}
        style={{ color: color }}
      >
        {number}
      </Text>
      <Text className="text-sm ml-3">{deliveredOrPending}</Text>
    </View>
  );
};

export default CardSomething;
