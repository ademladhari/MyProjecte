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
  TextInput,
  KeyboardAvoidingView,
  Platform, // Import TextInput for search input
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
import { fetchNotifications } from "../redux/actions/ActionNotification";
import CheckBox from "../components/Checkbox";
import { ShowCheckedIdsButton } from "../components/checkedbutton";
import { patchData } from "../redux/actions/ActionUpdate";
import {
  handleCheckBoxPress,
  handleShowCheckedIds,
} from "../utils/api/CardDeliveryFunctions";
import SearchBar from "../components/search-bar";

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
  const [filteredDemandes, setfilteredDemandes] = useState([]);
  const [userID, setUserID] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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
    const fetchData = async () => {
      try {
        dispatch(fetchNotifications()); // This line should dispatch the action
        // Make sure you are getting the data from the action
        console.log("Action dispatched successfully");
      } catch (error) {
        console.error("Error dispatching fetchMedications:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const Notifications = useSelector((state) => state.notification);
  const [checkedCards, setCheckedCards] = useState([]);
  const [showCheckbox, setshowCheckbox] = useState(false);
  const [searchBy, setSearchBy] = useState("requestName");

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
  function countDeliveredStatus(demandes) {
    if (!demandes || !Array.isArray(demandes)) return 0;

    return demandes.reduce((count, demande) => {
      return demande.Status === "livre" && demande.agentUserID === userID
        ? count + 1
        : count;
    }, 0);
  }
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
  function countOtherStatus(demandes) {
    if (!demandes || !Array.isArray(demandes)) return 0;

    return demandes.reduce((count, demande) => {
      return demande.Status !== "livre" &&
        demande.agentUserID === userID &&
        demande.Status !== "en cours"
        ? count + 1
        : count;
    }, 0);
  }
  const resetCheckBoxs = () => {
    setCheckedCards([]);
    setshowCheckbox(false);
  };
  // Function to handle checkbox press
  const [lastPress, setLastPress] = useState(0);
  const [lastDemandeID, setLastDemandeID] = useState(0);

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
  const updateStatusForChecked = () => {
    // Update filteredDemandes after modifying them
    console.log(checkedCards);
    const updatedFilteredDemandes = demandes.map((demande) => {
      console.log(demande.DemandID);
      if (checkedCards.includes(demande.DemandID)) {
        return { ...demande, Status: "collecté" };
      }
      return demande;
    });
    setfilteredDemandes(updatedFilteredDemandes);
  };
  const handleQRCodeRead = (event) => {
    // Handle QR code data read from the scanner
    const { data } = event;
    // Do something with the QR code data, such as navigating to a new screen
    // Example:
    navigation.navigate("QRCodeDetails", { data });
  };
  return (
    <View
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View className="mb-2">
        <Text className="text-2xl ml-4">Hi,!</Text>
        <Text className="text-base ml-4">{formattedDate}</Text>
      </View>
      <KeyboardAvoidingView className="flex w-[full]   flex-row rounded-xl">
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
      </KeyboardAvoidingView>
      <TouchableOpacity
        activeOpacity={1}
        className="h-[70%] "
        onPress={() => {
          resetCheckBoxs();
        }}
      >
        <KeyboardAvoidingView className="h-[100%]">
          <View style={{ flex: 1 }}>
            {/* Other components... */}
            <TouchableOpacity
              onPress={() => navigation.navigate("QRCodeScanner")}
              style={styles.qrButton}
            >
              <Text style={styles.qrButtonText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xl mt-2 mb-3 ml-4">Pending</Text>
          <SearchBar
            setSearchBy={setSearchBy}
            setSearchQuery={setSearchQuery}
            searchBy={searchBy}
          ></SearchBar>
          <ScrollView className=" ">
            {filteredDemandes !== undefined && filteredDemandes.length > 0 ? (
              filteredDemandes.map((demande, index) => (
                <>
                  {demande.agentUserID === userID &&
                    demande.Status !== "livre" &&
                    demande.Status != "en cours" && (
                      <View className="h-[80px] my-3" key={index}>
                        <TouchableOpacity
                          onPress={() => handleDoublePress(demande)}
                          onLongPress={() => {
                            handleCheckBoxPress(
                              demande.DemandID,
                              checkedCards,
                              setCheckedCards
                            );
                            setshowCheckbox(true);
                          }}
                          delayLongPress={100}
                          style={styles.cardContainer}
                        >
                          <Carddelivery
                            key={index}
                            showCheckbox={showCheckbox}
                            demande={demande}
                            setCheckedCards={setCheckedCards}
                            checkedCards={checkedCards}
                            handleCheckBoxPress={handleCheckBoxPress}
                            name={getStatusLabName(demande)}
                            price={demande.price}
                            place={getStatusAddress(demande)}
                            color={"p"}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                </>
              ))
            ) : (
              <Text style={styles.noDataText}>No Demandes available</Text>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableOpacity>
      {showCheckbox && (
        <ShowCheckedIdsButton
          onPress={() => {
            handleShowCheckedIds(checkedCards, dispatch, "collecté");
            updateStatusForChecked();
            resetCheckBoxs();
          }}
        />
      )}
    </View>
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
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  noDataText: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
