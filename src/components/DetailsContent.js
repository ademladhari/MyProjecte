import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Buttom from "./Buttom";
const DetailsContent = (props) => {
  const { name, image } = props;
  const [selectedItem, setSelectedItem] = useState(null);

  const longText =
    " Cephalexin is generally prescribed to treat bacterial infections.Cephalexin is generally prescribed to treat bacterial infections.Cephalexin is generally prescribed to treat bacterial infections. It is used to treat various infections, It is used to treat various infections, It is used to treat various infections, including respiratory tract infections...";
  const TruncatedText = ({ text, maxLength }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
      setExpanded(!expanded);
    };

    return (
      <View style={{ marginBottom: expanded ? 0 : 10 }}>
        <Text numberOfLines={expanded ? undefined : 3} ellipsizeMode="tail">
          {text.length > maxLength && !expanded
            ? text.substring(0, maxLength) + "..."
            : text}
        </Text>
        {text.length > maxLength && (
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={{ color: "blue" }}>
              {expanded ? "Read Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View
      className="  mt-5 h-[70%]  rounded-t-3xl   "
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <View className="">
        <Image
          className="mx-auto mt-3 w-[180px] h-[193px] rounded-xl"
          source={require("../../assets/test.png")}
        />
        <Text className="ml-1 text-2xl mt-14">Cephlexin</Text>
        <Text className=" text-lg ">Capsules USP</Text>
        <TruncatedText text={longText} maxLength={150} />
        <View>
          <View className=" flex  flex-row justify-between">
            <Text className="text-xl font-light ">Availability</Text>
            <Text className="text-xl ">254€</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 9, marginTop: "3%" }}>
            {/* TouchableOpacity 1 */}
            <TouchableOpacity
              style={{
                width: 105,
                height: 40,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#7289F1",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden", // Ensure gradient doesn't overflow
              }}
              onPress={() => setSelectedItem("eaf")}
            >
              {selectedItem === "eaf" && (
                <LinearGradient
                  colors={["#7289F1", "#9EB3FF"]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 18,
                  color: selectedItem === "eaf" ? "#000" : "#7289F1",
                }}
              >
                eaf
              </Text>
            </TouchableOpacity>

            {/* TouchableOpacity 2 */}
            <TouchableOpacity
              style={{
                width: 105,
                height: 40,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#7289F1",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden", // Ensure gradient doesn't overflow
              }}
              onPress={() => setSelectedItem("arzd")}
            >
              {selectedItem === "arzd" && (
                <LinearGradient
                  colors={["#7289F1", "#9EB3FF"]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 18,
                  color: selectedItem === "arzd" ? "#000" : "#7289F1",
                }}
              >
                arzd
              </Text>
            </TouchableOpacity>

            {/* TouchableOpacity 3 */}
            <TouchableOpacity
              style={{
                width: 105,
                height: 40,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#7289F1",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden", // Ensure gradient doesn't overflow
              }}
              onPress={() => setSelectedItem("azd")}
            >
              {selectedItem === "azd" && (
                <LinearGradient
                  colors={["#7289F1", "#9EB3FF"]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 18,
                  color: selectedItem === "azd" ? "#000" : "#7289F1",
                }}
              >
                azd
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row mt-8 ml-[-8px]">
            <View className="w-[45px] h-[45px] rounded-full bg-[#E4EBFF] mt-1 flex items-center justify-center">
              <MaterialCommunityIcons
                name="arrow-left-thin"
                size={40}
                color="#000"
              />
            </View>
            <TouchableOpacity className="w-[250px] bg-[#7289F1] rounded-xl ml-14 mt-1 pt-1  h-[45px]">
              <Text className="text-center text-2xl">hehe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsContent;
