import React from "react";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        {/* Add your "hehe" screen here */}
        {/* For example: */}
        <DrawerItem
          label="Hehe"
          onPress={() => props.navigation.navigate("hehe")}
          icon={({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
