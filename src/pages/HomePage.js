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
import { fetchMedications } from "../redux/actions/actiondata";
import { getStatusAddress, getStatusLabName } from "../utils/api/functions";

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
  const demandes = useSelector((state) => state.demandes.demandes);
  console.log("here", demandes);
  const [filteredMedications, setFilteredMedications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchMedications()); // This line should dispatch the action
        // Make sure you are getting the data from the action
        console.log("Action dispatched successfully");
      } catch (error) {
        console.error("Error dispatching fetchMedications:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Filter demandes based on the search query and selected category
    if (demandes) {
      let filteredMeds = demandes;

      setFilteredMedications(filteredMeds);
    } else {
      setFilteredMedications(null);
    }
  }, [demandes]);

  return (
    <>
      <View className="h-[15%]">
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
      <ScrollView className="h-[20%] ">
        <Text className="text-xl mt-3 ml-4"> Pending</Text>

        {filteredMedications !== undefined && filteredMedications.length > 0 ? (
          filteredMedications.map((demande, index) => (
            <View className="h-[80px] my-3">
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("DetailsScreen", {
                    demande: demande,
                  })
                }
                style={styles.cardContainer}
              >
                {
                  <Carddelivery
                    key={index}
                    matrecule={demande.ArrivalLabName}
                    name={getStatusLabName(demande)}
                    price={demande.price}
                    place={getStatusAddress(demande)}
                    Governorate={demande.Governorate}
                    DepartureGovernorate={demande.DepartureGovernorate}
                    color={"p"}
                  />
                }
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
