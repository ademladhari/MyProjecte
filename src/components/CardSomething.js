import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";

const CardSomething = (prop) => {
  const {
    img,
    number,
    deliveredOrPending,
    color,
    name,
    colorText,
    page,
    userID,
  } = prop;
  const navigation = useNavigation(); // Get the navigation object

  return (
    <TouchableOpacity
      className="h-[100%] w-[42%] bg-[#FFFFFE] pb-2  ml-5 rounded-md  "
      onPress={() =>
        navigation.navigate(page, {
          userID: userID, // You haven't defined `demande` here, you might want to replace it with the appropriate variable.
        })
      }
    >
      <KeyboardAvoidingView>
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
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

export default CardSomething;
