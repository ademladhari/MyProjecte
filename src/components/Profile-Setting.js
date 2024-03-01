import React from "react";
import { Image, Text, View } from "react-native";
const ProfileSetting = (prop) => {
  const { name, Phonenumber, password, adress, region } = prop;
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
    <View className=" w-[90%] h-[320px] bg-[#FFFFFE] md:w-[50%] mt-8  ml-5 rounded-md  ">
      <View className="">
        <View className="w-full">
          <Text className=" mt-5  mb-4 ml-6  text-xl text-Bold ">Profile</Text>

          <Line color="black" height={1} width="90%" />
          <Text className=" mt-5 ml-6  text-xl text-Bold">User Name</Text>
          <Text className=" mt-5 ml-6  text-xl text-base font-thin ">
            {name}
          </Text>
        </View>
        <View className="">
          <Text className=" mt-5 ml-6  text-xl text-Bold">Phone Number </Text>
          <Text className=" mt-1 ml-6  text-xl text-base font-thin ">
            {Phonenumber}
          </Text>
          <Text className=" mt-5 ml-6  text-xl text-bold ">
            password
          </Text>
          <Text className="  mt-1 ml-6 text-xl text-base font-thin ">
            {password}{" "}
          </Text>
          <Text className=" text-lg mt-5 text-Bold font-normal "></Text>
        </View>
        <View className="w-[25%]">
          <View className="flex flex-col"></View>
        </View>
      </View>
    </View>
  );
};

export default ProfileSetting;
