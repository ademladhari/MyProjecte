import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Notifications = ({ props }) => {
  // const {message,demandID}= props  ////// add date later
  return (
    <View className="h-screen w-full    ">
      <View className="lg:w-2/5 sm:w-3/5 w-[full] bg-gray-100  rounded-xl mx-auto  m-4 shadow-sm">
        <View className="mt-2 p-3 h-[35%]  py-4 flex flex-row bg-white rounded-lg shadow w-full">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/893/893257.png",
            }}
            style={{ width: 30, height: 30, marginRight: 13, marginTop: 16 }}
          />
          <View style={{ flex: 1 }}>
            <Text className="mt-1 text-sm flex-wrap w-[90%]"></Text>
            <Text style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
              March 3, 2024 {/* Add your desired date here */}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Notifications;
