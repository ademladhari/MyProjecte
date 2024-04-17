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
import { fetchMedications } from "../redux/actions/actiondata";
import { getStatusAddress, getStatusLabName } from "../utils/api/functions";
import {
  handleCheckBoxPress,
  handleShowCheckedIds,
} from "../utils/api/CardDeliveryFunctions";
import { ShowCheckedIdsButton } from "../components/checkedbutton";
import SearchBar from "../components/search-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PendingPage({ navigation }) {
  const currentDate = new Date();
  const [checkedCards, setCheckedCards] = useState([]);
  const [showCheckbox, setshowCheckbox] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredDemandes, setfilteredDemandes] = useState([]);
  const [userID, setUserID] = useState(null);
  const [searchBy, setSearchBy] = useState("requestName");
  // Format date as desired (e.g., "February 28, 2024")
  const formattedDate = currentDate.toLocaleDateString("en-EUROPE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const updateStatusForChecked = () => {
    // Update filteredDemandes after modifying them
    console.log(checkedCards);
    const updatedFilteredDemandes = demandes.map((demande) => {
      console.log(demande.DemandID);
      if (checkedCards.includes(demande.DemandID)) {
        return { ...demande, Status: "affecté" };
      }
      return demande;
    });
    setfilteredDemandes(updatedFilteredDemandes);
  };

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
  const [lastPress, setLastPress] = useState(0);
  const [lastDemandeID, setLastDemandeID] = useState(0);
  const dispatch = useDispatch();

  const demandes = useSelector((state) => state.demandes.demandes);
  const resetCheckBoxs = () => {
    setCheckedCards([]);
  };
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
      let filterd = demandes;
      if (searchQuery.trim() !== "") {
        filterd = filterd.filter((demande) =>
          demande.requestName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setfilteredDemandes(filterd);
    } else {
      setfilteredDemandes(null);
    }
  }, [demandes, searchQuery]);
  useEffect(() => {
    // Filter demandes based on the search query and selected category
    if (demandes) {
      let filterd = demandes;
      console.log(searchBy);
      if (searchQuery.trim() !== "") {
        if (searchBy === "requestName") {
          filterd = filterd.filter((demande) =>
            demande.requestName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        } else if (searchBy === "DepartureAddress") {
          filterd = filterd.filter((demande) =>
            demande.DepartureAddress.toLowerCase().includes(
              searchQuery.toLowerCase()
            )
          );
        } else if (searchBy === "name") {
          filterd = filterd.filter((demande) =>
            demande.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      }
      setfilteredDemandes(filterd);
    } else {
      setfilteredDemandes(null);
    }
  }, [demandes, searchQuery, searchBy]);
  const handleDoublePress = (demande) => {
    const currentTime = new Date().getTime();
    const delta = currentTime - lastPress;

    // Check if the current demande is the same as the last one and the time between presses is less than 500 milliseconds
    if (demande.DemandID === lastDemandeID && delta < 500) {
      // Time between two presses is less than 500 milliseconds, consider it a double press
      handleCheckBoxPress(demande.DemandID, checkedCards, setCheckedCards);
      setshowCheckbox(true);
      navigation.navigate("DetailsScreen", {
        demande: demande,
      });
    } else {
      handleCheckBoxPress(demande.DemandID, checkedCards, setCheckedCards);
      setshowCheckbox(true);
    }

    // Store the current demande ID and time of press
    setLastDemandeID(demande.DemandID);
    setLastPress(currentTime);
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        className="h-[92%] "
        onPress={() => {
          setshowCheckbox(false);
          resetCheckBoxs(); // This will hide the checkbox when the user taps outside of it
        }}
      >
        <SearchBar
          setSearchBy={setSearchBy}
          setSearchQuery={setSearchQuery}
          searchBy={searchBy}
        ></SearchBar>
        <ScrollView className="h-[30%] ">
          {demandes !== null && demandes.length > 0 ? (
            filteredDemandes.map(
              (demande, index) =>
                demande.Status === "collecté" &&
                demande.agentUserID === userID && (
                  <View className="h-[90px] my-3">
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleDoublePress(demande)}
                      onLongPress={() => {
                        handleCheckBoxPress(
                          demande.DemandID,
                          checkedCards,
                          setCheckedCards
                        );
                        setshowCheckbox(true);
                      }}
                      style={styles.cardContainer}
                    >
                      <Carddelivery
                        key={index}
                        showCheckbox={showCheckbox}
                        demande={demande}
                        setCheckedCards={setCheckedCards}
                        checkedCards={checkedCards}
                        handleCheckBoxPress={handleCheckBoxPress}
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
      </TouchableOpacity>
      {console.log(showCheckbox)}
      {showCheckbox && (
        <ShowCheckedIdsButton
          checkedIds={checkedCards}
          onPress={() => {
            handleShowCheckedIds(checkedCards, dispatch, "affecté");
            updateStatusForChecked();
            resetCheckBoxs();
          }}
        />
      )}
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
