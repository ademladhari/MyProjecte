import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Medicationitems = (props) => {
  const { name, image } = props;
  return (
    <View
      className="mt-5 h-[40%] w-full"
      horizontal={false} // Enable vertical scrolling
      showsVerticalScrollIndicator={true} // Show vertical scroll indicator
    >
      <View className="flex flex-row flex-wrap">
        {[...Array(8)].map((_, index) => (
          <View key={index} className="w-[140px]  ml-[10%] mb-6">
            <View className="w-[130px] h-[180px] rounded-xl bg-[#9EB3FF]">
              <Image
                className="mx-auto mt-3 w-[40%] h-[35%] rounded-xl"
                source={require("../../assets/svg1.png")}
              />
              <Text className="ml-9 mt-2">Vitamins</Text>
              <View className="flex flex-row items-center  mt-7 justify-around">
                <Text className=""> $10</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#3A47C1",
                    borderRadius: 999, // Set a large value for fully rounded
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginLeft: 8,
                  }}
                  onPress={() => console.log("Item added")}
                >
                  <FontAwesome name="plus" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Medicationitems;
