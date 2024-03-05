import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";
const CustomerDetails = (prop) => {
  const { Address, number, deliveredOrPending, color } = prop;
  const Line = ({ color = "black", height = 1, width = "100%" }) => (
    <View
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        marginLeft: 30,
      }}
    />
  );
  const openMapWithDirections = (address) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const encodedAddress = encodeURIComponent(address);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&origin=${latitude},${longitude}`;
        Linking.openURL(url);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  function MapWithDirections({ address }) {
    useEffect(() => {
      openMapWithDirections(address);
    }, []);

    return null;
  }

  const handleCallPress = () => {
    Linking.openURL(`tel:${number}`);
  };
  return (
    <View className=" w-[90%] h-[100%] flex flex-col bg-[#FFFFFE]    ml-5 rounded-md  ">
      <View className="h-[33%] w-[100%] flex flex-row">
        <View className="flex w-[80%] flex-col p-6  ">
          <Text className="text-lg text-[#acacac]">Full Name</Text>
          <Text className="text-xl mt-2 ">Name</Text>
        </View>
        <Image
          className=" w-[20%] h-[45%]  mt-3 rounded-full"
          source={require("../../assets/delivereddd.png")}
        />
      </View>
      <Line color="black" height={1} width="80%" />

      <View className="h-[33%] w-[100%] flex flex-row">
        <View className="flex w-[80%] flex-col p-6  ">
          <Text className="text-lg text-[#acacac]">Phone Number</Text>
          <TouchableOpacity onPress={handleCallPress}>
            <Text className="text-xl mt-2">{number}</Text>
          </TouchableOpacity>
        </View>
        <Image
          className=" w-[17%] h-[51%] pb-3  mt-5  rounded-full"
          source={require("../../assets/phone-call.png")}
        />
      </View>
      <Line color="black" height={1} width="80%" />
      <View className="h-[30%] w-[100%] flex flex-row">
        <View className="flex w-[78%] flex-col p-6  ">
          <Text className="text-lg text-[#acacac]">Delivery Address</Text>
          <TouchableOpacity onPress={() => MapWithDirections(Address)}>
            <Text className="text-xl mt-2 ">{Address}</Text>
          </TouchableOpacity>
        </View>
        <Image
          className=" w-[22%] h-[60%] mt-5 mr rounded-full"
          source={require("../../assets/location5.jpg")}
        />
      </View>
    </View>
  );
};

export default CustomerDetails;
