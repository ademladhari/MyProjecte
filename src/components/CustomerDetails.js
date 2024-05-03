import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from "react-native";
import openMap from "react-native-open-maps";

const CustomerDetails = (prop) => {
  const {
    Address,
    number,
    deliveredOrPending,
    color,
    name,
    qrcode,
    Coordinates,
  } = prop;

  function _goToYosemite(Address) {
    openMap({ query: Address });
  }
  console.log(Coordinates);
  const Line = ({ color = "black", height = 1, width = "100%" }) => (
    <View
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        marginLeft: 20,
      }}
    />
  );
  const navigation = useNavigation(); // Get the navigation object

  const handleCallPress = () => {
    Linking.openURL(`tel:${number}`);
  };
  const parseCoordinates = (inputStr) => {
    // Extract numbers from the string
    const matches = inputStr.match(/[-+]?[0-9]*\.?[0-9]+/g);

    // Check if two numbers are found and convert them to float
    if (matches && matches.length === 2) {
      return {
        latitude: parseFloat(matches[0]),
        longitude: parseFloat(matches[1]),
      };
    } else {
      return null; // or throw an error based on your error handling strategy
    }
  };
  const destination = parseCoordinates(Coordinates);
  console.log(destination);
  return (
    <View className=" w-[90%] h-[100%] flex flex-col bg-[#FFFFFE] ml-5 rounded-md  ">
      <View className="h-[30%] w-[100%] flex flex-row">
        <View className="flex w-[85%] flex-col p-5  ">
          <Text className="text-lg text-[#acacac]">Full Name</Text>
          <Text className="text-lg mt-1 ">{name}</Text>
        </View>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={35}
          color="green"
          style={{ marginTop: 25 }}
        />
      </View>
      <Line color="black" height={1} width="80%" />

      <View className="h-[30%] w-[100%] flex flex-row">
        <View className="flex w-[85%]  flex-col p-5  ">
          <Text className="text-lg text-[#acacac]">Phone Number</Text>
          <TouchableOpacity onPress={handleCallPress}>
            <Text className=" text-base mt-2">{number}</Text>
          </TouchableOpacity>
        </View>
        <MaterialCommunityIcons
          name="card-account-phone"
          style={{ marginTop: 25 }}
          size={35}
          color="green"
        />
      </View>
      <Line color="black" height={1} width="80%" />
      <View className="h-[30%] w-[100%] mb-1 flex flex-row">
        <View className="flex w-[83%] flex-col p-5  ">
          <Text className="text-lg text-[#acacac]">Delivery Address</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("map", {
                destination: destination,
              })
            }
          >
            <Text className="text-sm  w-[80%] whitespace-nowrap overflow-x-scroll h-[40px] ">
              {Address}
            </Text>
          </TouchableOpacity>
        </View>
        <MaterialCommunityIcons
          name="map-marker-account-outline"
          style={{ marginTop: 25 }}
          size={45}
          color="green"
        />
      </View>
      <Line color="black" height={1} width="80%" />
    </View>
  );
};

export default CustomerDetails;
