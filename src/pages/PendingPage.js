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
  RefreshControl,
} from "react-native";
import Carddelivery from "../components/Carddelivery";
import { useContext, useEffect, useState } from "react";
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
import { fetchUserData } from "../redux/actions/actionUserData";
import { CountContext } from "../../App";
import { NotificationHistoryData } from "../services/Notificaiton";

export default function PendingPage({ navigation }) {
  const currentDate = new Date();
  const [checkedCards, setCheckedCards] = useState([]);
  const [showCheckbox, setshowCheckbox] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredDemandes, setfilteredDemandes] = useState(
    demandes ? demandes : []
  );

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
    const updatedFilteredDemandes = filteredDemandes.map((demande) => {
      if (checkedCards.includes(demande.DemandID)) {
        return { ...demande, Status: "collected" };
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
  }, [refreshing]);

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    resetCheckBoxs();
    // Simulate refreshing the page
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const demandes = useSelector((state) => state.userData.UserData);
  console.log("demandes,", demandes);
  const resetCheckBoxs = () => {
    setCheckedCards([]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ysers", userID);
        dispatch(fetchUserData(userID));
        // Make sure you are getting the data from the action
        console.log("Action dispatched successfully");
      } catch (error) {
        console.error("Error dispatching fetchMedications:", error);
      }
    };
    fetchData();
  }, [dispatch, userID, refreshing]);

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
        } else if (searchBy === "ArrivalAddress") {
          filterd = filterd.filter((demande) =>
            demande.ArrivalAddress.toLowerCase().includes(
              searchQuery.toLowerCase()
            )
          );
        }
      }
      setfilteredDemandes(filterd);
    } else {
      setfilteredDemandes(null);
    }
  }, [demandes, searchQuery, searchBy]);
  const handleDoublePress = (demande) => {
    navigation.navigate("DetailsScreen", {
      demande: demande,
      setdemandes: setfilteredDemandes,
      page: "Pending",
    });
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
        <ScrollView
          className="h-[30%] "
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {console.log("demandlength", demandes.length)}
          {console.log("fildemandslength", filteredDemandes.length)}
          {demandes !== null && filteredDemandes.length > 0 ? (
            filteredDemandes.map(
              (demande, index) =>
                demande.Status === "affected" && (
                  <View className="h-[90px] my-3">
                    <TouchableOpacity
                      key={index}
                      onLongPress={() => handleDoublePress(demande)}
                      onPress={() => {
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
            <Text className="text-3xl text-center  mt-[60%]">
              Loading Data...
            </Text>
          )}
        </ScrollView>
      </TouchableOpacity>
      {showCheckbox && (
        <ShowCheckedIdsButton
          checkedIds={checkedCards}
          marginbottom={"mb-2"}
          state={"collected"}
          onPress={() => {
            handleShowCheckedIds(checkedCards, dispatch, "collected");
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
function CollectedCount(demandes) {
  if (!demandes || !Array.isArray(demandes)) return 0;

  return demandes.reduce((count, demande) => {
    return demande.Status === "collected" ? count + 1 : count;
  }, 0);
}
function PendingCount(demandes) {
  if (!demandes || !Array.isArray(demandes)) return 0;

  return demandes.reduce((count, demande) => {
    return demande.Status === "affected" ? count + 1 : count;
  }, 0);
}
