import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import Carddelivery from "../components/Carddelivery";
import DeliveryDetailsCard from "../components/DeliveryDetailsCard";
import CustomerDetails from "../components/CustomerDetails";
import Buttom from "../components/Buttom";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getStatusAddress,
  getStatusAddressForMap,
  getStatusLabName,
} from "../utils/api/functions";
import { patchData } from "../redux/actions/ActionUpdate";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedications } from "../redux/actions/actiondata";

export default function DetailsScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const demandes = useSelector((state) => state.demandes.demandes);
  const { demande } = route.params;
  const [updateDemande, setdUpdatedemande] = useState(demande);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userJson = await AsyncStorage.getItem("userData");
        const user = JSON.parse(userJson);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handlePatch = async () => {
    const demandId = demande.DemandID;
    let updatedStatus = "";

    // Determine the next status based on the current status
    switch (updateDemande.Status) {
      case "en cours":
        updatedStatus = "affecté";
        break;
      case "affecté":
        updatedStatus = "collecté";
        break;
      case "collecté":
        updatedStatus = "livre";
        break;
      case "livre":
        updatedStatus = "livre";
        break;
      default:
        updatedStatus = "en cours";
        break;
    }

    // Update the demande object with the new status and other properties
    setdUpdatedemande((prevDemande) => ({
      ...prevDemande,
      Status: updatedStatus,
      Address: getStatusAddressForMap(prevDemande),
      name: getStatusLabName(prevDemande),
    }));
    // Dispatch the action to update the data
    if (updateDemande.Status === "en cours") {
      dispatch(
        patchData(demandId, {
          Status: updatedStatus,
          agentUserID: userData.UserID,
        })
      );
    } else {
      dispatch(
        patchData(demandId, {
          Status: updatedStatus,
        })
      );
    }
    // Add a short delay before fetching the data again
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Refetch data after patching
    dispatch(fetchMedications());
  };

  return (
    <View className="h-screen ">
      <View className="w-full h-[5%]  bg-blue-600 text-red-400"></View>
      <View className=" flex flex-row mb-4 ">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons
            name="chevron-back"
            size={34}
            color="blue"
            className=" ml-2 mt-8"
          />
        </TouchableOpacity>

        <Text className="text-2xl h-[100%]  ml-20 mt-3">Delivery Details</Text>
      </View>
      <View className="h-[35%]">
        {console.log(getStatusLabName(demande))}
        {userData && (
          <CustomerDetails
            number={updateDemande.DepartureTelMobile}
            Address={getStatusAddressForMap(updateDemande)}
            name={getStatusLabName(updateDemande)}
            statusdate={updateDemande.Statusdate}
            qrcode={updateDemande.codeQr}
          />
        )}
      </View>

      <View className="h-[13%]">
        <Text className="text-3xl text-blue-700 text-center border-b-[2.2px] w-[60%] m-auto  border-[blue]   mt-8">
          Demande Details
        </Text>
      </View>
      <View>
        <DeliveryDetailsCard demande={updateDemande}></DeliveryDetailsCard>
      </View>

      <View className="h-[10%] w-[90%] m-auto mt-7">
        <Button
          title={updateDemande.Status}
          className="rounded-lg "
          onPress={() => {
            handlePatch();
          }}
        ></Button>
      </View>
    </View>
  );
}
