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
import { fetchUserData } from "../redux/actions/actionUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userJson = await AsyncStorage.getItem("userData");
        const user = JSON.parse(userJson);
        setUserID(user.UserID);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
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
  function countDeliveredStatus(demandes) {
    let deliveredCount = 0;
    demandes.forEach((demande) => {
      if (demande.Status === "livre") {
        deliveredCount++;
      }
    });
    return deliveredCount;
  }
  function countOtherStatus(demandes) {
    let otherCount = 0;
    demandes.forEach((demande) => {
      if (demande.Status !== "livre" && demande.Status !== "en cours") {
        otherCount++;
      }
    });
    return otherCount;
  }
  return (
    <>
      <View className="h-[12%]">
        <Text className="text-2xl ml-4">Hi,!</Text>
        <Text className="text-base ml-4">{formattedDate}</Text>
      </View>
      <View className="flex w-[full] h-[18%]  flex-row rounded-xl">
        <CardSomething
          img={require("../../assets/delivereddd.png")}
          deliveredOrPending={"Delivered"}
          number={countDeliveredStatus(demandes)}
          color="green"
          colorText={"green-600"}
          name={"truck-check"}
        />
        <CardSomething
          img={require("../../assets/pendinggg.png")}
          deliveredOrPending={"Pending"}
          number={countOtherStatus(demandes)}
          color="red"
          colorText="text-[red]"
          name={"truck-fast"}
        />
      </View>
      <ScrollView className="h-[20%] ">
        <Text className="text-xl mt-3 ml-4"> Pending</Text>

        {filteredMedications !== undefined && filteredMedications.length > 0 ? (
          filteredMedications.map((demande, index) => (
            <>
              {demande.agentUserID === userID && demande.Status !== "livre" && (
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
                    {console.log(demande.Status)}

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
              )}
            </>
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
