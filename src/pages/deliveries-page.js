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
import Carddelivery from "../components/Carddelivery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { data } from "../services/ServiceData";
import { fetchMedications } from "../redux/actions/actiondata";

export default function DeliveryPage({ navigation }) {
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
        await dispatch(fetchMedications()); // This line should dispatch the action
        // Make sure you are getting the data from the action

        console.log("Action dispatched successfully");
      } catch (error) {
        console.error("Error dispatching fetchMedications:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log("ded", medications);
    // Filter medications based on the search query and selected category
    if (medications && medications["medications"]) {
      let filteredMeds = medications["medications"];
      console.log("r");
      setFilteredMedications(filteredMeds);
      console.log(filteredMeds);
    } else {
      setFilteredMedications(null);
    }
  }, [medications]);

  return (
    <>
      <View className="h-[10%]">
        <View className="w-full h-[60%] bg-blue-600 text-red-400"></View>
      </View>
      <Text className="text-3xl  text-center"> Deliveries</Text>
      <ScrollView className="h-[20%] ">
        {filteredMedications !== null ? (
          filteredMedications.map((medication, index) => (
            <View className="h-[80px] my-3">
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("DetailsScreen", {
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
                  matrecule={medication.matercule}
                  name={medication.name}
                  price={medication.price}
                  place={medication.adress}
                  color={"p"}
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