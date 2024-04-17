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
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
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
import { LineChart } from "react-native-chart-kit";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
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
  console.log("demandes,", demandes);
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
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    xAxisInterval: 1,
    // Set the interval between x-axis labels to 1

    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 3,
    propsForVerticalLabels: {
      // Vertical offset
      fontSize: 8, // Font size
      // Any other SVG properties are also applicable here
    },
    useShadowColorFromDataset: false, // optional
  };

  const data = {
    labels: ["1", "2", "3", "4"],

    datasets: [
      {
        data: [0, 12, -17, 8],
        // optional
      },
    ],
  };
  const datasetLength = 14; // Store the length of the dataset separately

  const data2 = {
    datasets: [
      {
        data: [12, -17, 8, -23, 18, -9, 4, 21, -16, -3, 14, -20, -7, 22],
        // optional
      },
    ],
    labels: Array.from({ length: Math.ceil(datasetLength) }, (_, i) =>
      (i + 1).toString()
    ),
  };

  const data3 = {
    labels: ["1", "2", "3", "4"],

    datasets: [
      {
        data: [0, 12, -17, 8],
        // optional
      },
    ],
  };

  const maxVisibleLabels = 8; // Set this to the maximum number of labels you want to display
  const xLabelsOffset = -(data.labels.length - maxVisibleLabels);
  console.table(demandes);
  return (
    <View style={{ flex: 1 }}>
      <View className="mb-2">
        <Text className="text-2xl ml-4">Hi,!</Text>
        <Text className="text-base ml-4">{formattedDate}</Text>
      </View>
      <KeyboardAvoidingView className="flex w-[full]   flex-row rounded-xl">
        <CardSomething
          img={require("../../assets/pendinggg.png")}
          deliveredOrPending={"collected"}
          number={countOtherStatus(demandes)}
          color="red"
          colorText="text-[red]"
          name={"truck-fast"}
          userID={userID}
          page="collected"
        />

        <CardSomething
          deliveredOrPending={"pending"}
          number={countDeliveredStatus(demandes)}
          color="green"
          colorText={"green-600"}
          name={"truck-check"}
          userID={userID}
          page="Pending"
        />
      </KeyboardAvoidingView>
      {/* <TouchableOpacity
        activeOpacity={1}
        className="h-[10%] "
        onPress={() => {
          resetCheckBoxs();
        }}
      >
        <KeyboardAvoidingView className="h-[30%]">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("QRCodeScanner", { userID: userID });
              navigation.setParams({
                setfilteredDemandes: setfilteredDemandes,
                status: "collecté",
              });
            }}
            style={styles.qrButton}
          >
            <Text style={styles.qrButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity> */}
      <ScrollView className="flex gap-3 mt-9 pb-16 ml-[-30] ">
        <Text className="text-lg text-center">Container 1</Text>
        <LineChart
          className=" overflow-scroll"
          data={data}
          width={400}
          height={165}
          verticalLabelRotation={1}
          chartConfig={chartConfig}
          xLabelsOffset={-3}
          bezier
        />
        <Text className="text-lg text-center">Container 1</Text>

        <LineChart
          data={data2}
          width={screenWidth}
          height={165}
          verticalLabelRotation={10}
          chartConfig={chartConfig}
          bezier
          xLabelsOffset={-3}
        />
        <Text className="text-lg text-center">Container 1</Text>

        <LineChart
          data={data3}
          width={screenWidth}
          height={165}
          verticalLabelRotation={10}
          chartConfig={chartConfig}
          bezier
        />
      </ScrollView>
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
