import React, { useEffect, useRef } from "react";
import { Image, Text, View, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const Carddelivery = (prop) => {
  const { matrecule, name, place, price, color, address } = prop;
  const Circle = ({ color = "F6995C", size = 40 }) => (
    <View
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: size / 2,
        marginLeft: 15,
        marginTop: 20,
      }}
    />
  );
  console.log(address);
  const CircleOpacity = ({ color = "#F6995C", size = 40 }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      const animation = Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 1000, // Adjust the duration as needed
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000, // Adjust the duration as needed
          useNativeDriver: true,
        }),
      ]);

      const loopAnimation = Animated.loop(animation);

      loopAnimation.start();

      return () => {
        loopAnimation.stop();
      };
    }, []);

    const scaleStyle = {
      transform: [{ scale: scaleValue }],
    };

    return (
      <Animated.View
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: 0.2,
          ...scaleStyle,
          marginLeft: 10, // Adjust according to your layout
          top: -25, // Adjust according to your layout
        }}
      />
    );
  };

  return (
    <View className=" w-[90%] h-[100%] bg-[#FFFFFE] md:w-[50%] mt-3  ml-5 rounded-md  ">
      <View className="flex flex-row ">
        <View className="w-[20%]">
          <Circle color="red" size={20} />
          <CircleOpacity color="red" size={30} />
        </View>
        <View className="w-[50%]">
          <Text className=" text-lg  text-Bold font-normal ">{name}</Text>
          <View className="w-[100%] h-[70%] pt-2  flex flex-row">
            <MaterialIcons
              name="place"
              className="mt-9"
              size={23}
              color="green"
            />

            <Text className=" w-28 h-[100%]  text-xm  text-Bold font-normal ">
              {place}
            </Text>
          </View>
        </View>
        <View className="w-[25%]">
          <Text className={`text-xl mt-7 ml-5 text-${color}   `}>
            {price} dt{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Carddelivery;
