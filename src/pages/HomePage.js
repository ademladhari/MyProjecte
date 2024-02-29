import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollY,
} from "react-native";
import CardSomething from "../components/CardSomething";
import Carddelivery from "../components/Carddelivery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { data } from "../services/ServiceData";

export default function HomePage({ navigation }) {
  const currentDate = new Date();

  // Format date as desired (e.g., "February 28, 2024")
  const formattedDate = currentDate.toLocaleDateString("en-EUROPE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dispatch = useDispatch();
  const medications = useSelector((state) => state.medications);

  const [filteredMedications, setFilteredMedications] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(data);

        console.log("Action dispatched successfully");
      } catch (error) {
        console.error("Error dispatching fetchMedications:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Filter medications based on the search query and selected category
    if (medications && medications["testing"]) {
      let filteredMeds = medications["testin"];
      console.log("r");
      setFilteredMedications(filteredMeds);
      console.log(filteredMeds);
    } else {
      setFilteredMedications(null);
    }
  }, [medications]);

  return (
    <>
      <View className="h-[15%]">
        <View className="w-full h-[40%] bg-blue-600 text-red-400"></View>
        <Text className="text-2xl ml-4">Hi,!</Text>
        <Text className="text-base ml-4">{formattedDate}</Text>
      </View>
      <View className="flex w-[full] h-[23%] flex-row rounded-xl">
        <CardSomething
          img={require("../../assets/delivereddd.png")}
          deliveredOrPending={"Delivered"}
          number={27}
          color="green-700"
        />
        <CardSomething
          img={require("../../assets/pendinggg.png")}
          deliveredOrPending={"Pending"}
          number={27}
          color="red-400"
        />
      </View>

      <Text className="text-xl mt-3 ml-4"> Pending</Text>
      <ScrollView className="h-[20%] ">
        {filteredMedications !== null ? (
          filteredMedications.map((medication, index) => (
            <View className="h-[30%]">
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("MedicationDetails", {
                    name: medication.name,
                    image: require("../../assets/pendinggg.png"),
                    description: medication.description,
                    price: medication.price,
                  })
                }
                style={styles.cardContainer}
              >
                <Carddelivery
                  key={index}
                  // img={require("../../assets/pendinggg.png")}
                  // deliveredOrPending={"Pending"}
                  // number={27}
                  // color="red-400"
                  name={medication.name}
                  description={medication.description}
                  price={medication.price}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>Loading loding data...</Text>
        )}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Set background color to transparent to see the gradient
  },
});
