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
import { getStatusAddress, getStatusLabName } from "../utils/api/functions";

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
  const demandes = useSelector((state) => state.demandes.demandes);

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
  console.log("heheh", demandes);
  return (
    <>
      <ScrollView className="h-[20%] ">
        {demandes !== null && demandes.length > 0 ? (
          demandes.map(
            (demande, index) =>
              demande.agentUserID === null && (
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
                  </TouchableOpacity>
                </View>
              )
          )
        ) : (
          <Text>Loading dazdzad...</Text>
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
