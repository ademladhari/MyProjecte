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
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
} from "react-native";
import Carddelivery from "../components/Carddelivery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { data } from "../services/ServiceData";
import { fetchMedications } from "../redux/actions/actiondata";
import { getStatusAddress, getStatusLabName } from "../utils/api/functions";
import {
  handleCheckBoxPress,
  handleShowCheckedIds,
} from "../utils/api/CardDeliveryFunctions";
import { ShowCheckedIdsButton } from "../components/checkedbutton";
import SearchBar from "../components/search-bar";
import { FontAwesome5 } from "@expo/vector-icons";

export default function DeliveryPage({ navigation }) {
  const currentDate = new Date();
  const [checkedCards, setCheckedCards] = useState([]);
  const [showCheckbox, setshowCheckbox] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredDemandes, setfilteredDemandes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchBy, setSearchBy] = useState("requestName");
  // Format date as desired (e.g., "February 28, 2024")

  const updateStatusForChecked = () => {
    // Update filteredDemandes after modifying them
    const updatedFilteredDemandes = filteredDemandes.map((demande) => {
      if (checkedCards.includes(demande.DemandID)) {
        return { ...demande, Status: "affected" };
      }
      return demande;
    });
    setfilteredDemandes(updatedFilteredDemandes);
  };
  const [page, setPage] = useState(1);
  const [demandes, setDemandes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    resetCheckBoxs();
    // Simulate refreshing the page
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const dispatch = useDispatch();

  const newdm = useSelector((state) => state.demandes.demandes);
  useEffect(() => {
    // Log the type and content of newdm for debugging

    // Ensure newdm is an array before proceeding
    if (!Array.isArray(newdm) || newdm.length === 0) {
      console.log("newdm is either not an array or it's empty");
      return; // Skip the effect if newdm is not an array or if it's empty
    }

    setDemandes((prevDemandes) => {
      const existingIDs = new Set(prevDemandes.map((item) => item.DemandID));
      const newItems = newdm.filter((item) => !existingIDs.has(item.DemandID));

      if (newItems.length === 0) {
        console.log("No new items to add, all items are duplicates.");
        return prevDemandes; // Return the existing demandes if no new items are found
      }

      return [...prevDemandes, ...newItems]; // Append only new items
    });
  }, [newdm]);

  useEffect(() => {
    if (filteredDemandes && demandes.length) {
      setfilteredDemandes((prevDemandes) => {
        const existingIDs = new Set(prevDemandes.map((item) => item.DemandID));
        const newItems = demandes.filter(
          (item) => !existingIDs.has(item.DemandID)
        );

        return [...prevDemandes, ...newItems]; // Only add new items that aren't already in the state
      });
    }
  }, [page, demandes, refreshing]);
  const resetCheckBoxs = () => {
    setshowCheckbox(false);
    setCheckedCards([]);
  };
  const fetchData = async (pageNum) => {
    try {
      setLoading(true);
      await dispatch(fetchMedications(pageNum));
      setLoading(false);
      console.log("Data fetched successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page, refreshing]);

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
          console.log(searchQuery);
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
      page: "Delivery",
    });
  };

  // Update filtered demandes when demandes change

  const handleScrollToEnd = () => {
    // Load next page if not already loading and there is more data
    if (!loading && searchQuery === "") {
      setPage(page + 1);
    }
  };

  // Optional: Define renderFooter function to render a loading indicator at the bottom

  return (
    <>
      <KeyboardAvoidingView
        style={{
          position: "absolute",
          top: "-6%",
          right: 15,
          zIndex: 60,
          flex: 1,
          width: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Notification")}
          style={{
            backgroundColor: "#3498db",
            padding: 5,
            borderRadius: 10,
            width: "90px",
          }}
        >
          <FontAwesome5
            name="bell"
            size={25}
            color="white"
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={filteredDemandes} // Pass the data array to FlatList
          keyExtractor={(item) => item.DemandID.toString()} // Provide a unique key extractor
          renderItem={(
            { item } // Render each item using renderItem prop
          ) => (
            <View className="h-[90px] my-3">
              <TouchableOpacity
                onLongPress={() => handleDoublePress(item)}
                onPress={() => {
                  handleCheckBoxPress(
                    item.DemandID,
                    checkedCards,
                    setCheckedCards
                  );
                  setshowCheckbox(true);
                }}
                style={styles.cardContainer}
              >
                <Carddelivery
                  showCheckbox={showCheckbox}
                  demande={item}
                  setCheckedCards={setCheckedCards}
                  checkedCards={checkedCards}
                  handleCheckBoxPress={handleCheckBoxPress}
                  matrecule={item.ArrivalLabName}
                  name={getStatusLabName(item)}
                  price={item.price}
                  place={getStatusAddress(item)}
                  Governorate={item.Governorate}
                  DepartureGovernorate={item.DepartureGovernorate}
                  color={"p"}
                />
              </TouchableOpacity>
            </View>
          )}
          onEndReachedThreshold={0.1} // Specify the threshold for triggering onEndReached
          onEndReached={handleScrollToEnd} // Call handleScrollToEnd function when end is reached
        />
      </TouchableOpacity>
      {console.log(showCheckbox)}
      {showCheckbox && (
        <ShowCheckedIdsButton
          checkedIds={checkedCards}
          onPress={() => {
            handleShowCheckedIds(checkedCards, dispatch, "affected");
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
