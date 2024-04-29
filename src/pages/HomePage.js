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
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LineChart } from "react-native-chart-kit";
import { fetchUserData } from "../redux/actions/actionUserData";
import { userdatacount } from "../services/ServiceData";
import { FontAwesome5 } from "@expo/vector-icons";
export default function HomePage({ navigation }) {
  const currentDate = new Date();
  const [count, setCount] = useState(0);
  // Format date as desired (e.g., "February 28, 2024")
  const formattedDate = currentDate.toLocaleDateString("en-EUROPE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dispatch = useDispatch();
  const [userID, setUserID] = useState(null);
  const demandes = useSelector((state) => state.userData.UserData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchUserData());
        // Make sure you are getting the data from the action
        console.log("Action dispatched successfully");
      } catch (error) {
        console.error("Error dispatching fetchMedications:", error);
      }
    };
    fetchData();
  }, [dispatch]);
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
        const idk = await userdatacount(userID);
        setCount(idk);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userID]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       dispatch(fetchNotifications()); // This line should dispatch the action
  //       // Make sure you are getting the data from the action
  //       console.log("Action dispatched successfully");
  //     } catch (error) {
  //       console.error("Error dispatching fetchMedications:", error);
  //     }
  //   };
  //   fetchData();
  // }, [dispatch]);
  // const Notifications = useSelector((state) => state.notification);

  // Function to handle checkbox press

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
    labels: ["1", "2", "3", "4", "5"],

    datasets: [
      {
        data: [0, 12, -17, 8, 5],
        // optional
      },
    ],
  };

  const maxVisibleLabels = 8; // Set this to the maximum number of labels you want to display
  const xLabelsOffset = -(data.labels.length - maxVisibleLabels);
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
            name="qrcode"
            size={25}
            className="px-10"
            color="white"
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top: "-6%",
            right: 15,
            zIndex: 50,
            flex: 1,
            width: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("QRCodeScanner", { userID })}
            style={{
              backgroundColor: "#3498db",
              padding: 5,
              borderRadius: 10,
              width: "90px",
            }}
          >
            <FontAwesome5
              name="qrcode"
              size={25}
              className="px-10"
              color="white"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <View className="mb-2">
          <Text className="text-2xl ml-4">Hi,!</Text>
          <Text className="text-base ml-4">{formattedDate}</Text>
        </View>
        <KeyboardAvoidingView className="flex w-[full]   flex-row rounded-xl">
          <CardSomething
            img={require("../../assets/pendinggg.png")}
            deliveredOrPending={"collected"}
            color="red"
            colorText="text-[red]"
            name={"truck-fast"}
            userID={userID}
            page="collected"
            demandes={demandes}
            number={count.collectedCount}
          />
          {console.log(count)}
          <CardSomething
            deliveredOrPending={"pending"}
            color="green"
            colorText={"green-600"}
            name={"truck-check"}
            userID={userID}
            page="Pending"
            demandes={demandes}
            number={count.affectedCount}
          />
        </KeyboardAvoidingView>

        <View className="flex gap-3 mt-1 pb-16 ml-[-30] ">
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
        </View>
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
