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
    <View className=" w-[90%] h-[280px] bg-[#FFFFFE] md:w-[50%]   ml-5 rounded-md  ">
      <View className="">
        <View className="w-full">
          <Text className=" mt-5  mb-2 ml-6  text-xl text-Bold ">Profile</Text>

          <Line color="black" height={1} width="90%" />
          <Text className=" mt-3 ml-6  text-xl  font-nor;ql">User Name</Text>
          <Text className=" mt-1 ml-6  text-base font-extralight ">{name}</Text>
        </View>
        <View className="">
          <Text className=" mt-3 ml-6  text-xl text-Bold">Phone Number </Text>
          <Text className=" mt-1 ml-6 text-base font-extralight  ">
            {Phonenumber}
          </Text>
          <Text className=" mt-3 ml-6  text-xl text-bold ">password</Text>
          <Text className="  mt-1 ml-6 text-base font-extralight  ">
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
