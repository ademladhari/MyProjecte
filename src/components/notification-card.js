import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const NotificationCard = ({ message, date }) => {
  console.log("here");

  return (
    <View className=" w-full    ">
      <View className="lg:w-2/5 sm:w-3/5 w-[full] bg-gray-100  rounded-xl mx-auto  m-4 shadow-sm h-[70px]">
        <View className="mt-2 p-3    py-4 flex flex-row bg-white rounded-lg shadow w-full">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/893/893257.png",
            }}
            style={{ width: 30, height: 30, marginRight: 13, marginTop: 16 }}
          />
          <View style={{ flex: 1 }}>
            <Text className="mt-1 text-sm flex-wrap w-[90%]"> {message}</Text>
            <Text style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              {date}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
