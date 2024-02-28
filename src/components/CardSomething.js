import React from "react";
import { Image, Text, View } from "react-native";

const CardSomething = (prop) => {
  const { img, number, deliveredOrPending, color } = prop;
  return (
    <View className=" w-[42%] bg-[#FFFFFE]  ml-5 rounded-md  ">
      <Image
        className=" w-[45%] h-[45%] ml-[50%] mt-3 rounded-full"
        source={img}
      />
      <Text className={`text-3xl text-${color} ml-3`}>{number}</Text>
      <Text className="text-sm ml-3">{deliveredOrPending}</Text>
    </View>
  );
};

export default CardSomething;
