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
import { fetchNotifications } from "../redux/actions/ActionNotification";

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
    if (!demandes || !Array.isArray(demandes)) return 0;

    return demandes.reduce((count, demande) => {
      return demande.Status === "livre" ? count + 1 : count;
    }, 0);
  }

  function countOtherStatus(demandes) {
    if (!demandes || !Array.isArray(demandes)) return 0;

    return demandes.reduce((count, demande) => {
      return demande.Status !== "livre" && demande.Status !== "en cours"
        ? count + 1
        : count;
    }, 0);
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
        <Image
          source={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOYSURBVO3BMY7jSAAEwcyG/v/lOhlrlEWAEDW7c6gI88bMH4eZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5ny4kMqPykJTaUloal8UxKuqPykJHziMFMOM+UwU148LAlPUvmbknBFpSXhShKepPKkw0w5zJTDTHnxZSp3JOGOJDSVK0loKi0JP0nljiR802GmHGbKYaa8+OVUWhKaypUkXFG5koT/k8NMOcyUw0x58csloal8UxKaSkvCb3aYKYeZcpgpL74sCX9TEprKHUloKk9Kwr/kMFMOM+UwU148TOUnqbQkNJWWhKbSktBUWhKayh0q/7LDTDnMlMNMMW/8YipXktBUWhLuULmShN/sMFMOM+UwU158SKUloalcSUJTuSMJTaWptCQ0lStJ+IRKS8IVlZaEpnIlCZ84zJTDTDnMFPPGB1RaEu5QuZKEpnJHEppKS0JTuSMJd6i0JDSVK0n4psNMOcyUw0x58TCVloSm0pLQVJrKlSQ0lStJuCMJT0pCU2lJ+JsOM+UwUw4zxbzxIJUrSfiESktCU2lJaCotCZ9QuZKEpvKkJDzpMFMOM+UwU8wbD1L5piQ8SaUloam0JFxRuZKEpvKkJHziMFMOM+UwU148LAlXVO5IwhWVn6TyCZU7ktBUvukwUw4z5TBTzBsPUmlJaCqfSMIVlTuS0FRaEj6h0pJwReWOJDzpMFMOM+UwU158SKUloam0JDSVK0loKnckoalcSUJTuSMJV1RaEloS7lBpSfjEYaYcZsphppg3/mEqLQlPUmlJaCotCU3lSUloKnck4ROHmXKYKYeZ8uIfl4QrKi0JTaUloSXhSUm4Q+VKEq6oPOkwUw4z5TBTXnxI5Scl4ZtUnqTSknBFpSWhqXzTYaYcZsphprx4WBKepHKHSktCU2lJuEPljiQ8KQlN5UmHmXKYKYeZ8uLLVO5Iwh1JaCpXkvCJJDSVpvKJJFxR+abDTDnMlMNMefHLqTwpCVdUWhKaypUkNJU7ktBUnnSYKYeZcpgpL/5nktBUWhLuUGlJaCp3qFxRaUloKi0JTzrMlMNMOcyUF1+WhG9KQlO5ovKkJDSVloSm0pLQVJpKS8I3HWbKYaYcZsqLh6n8JJUrSWgqLQnfpNKS0FTuULmShE8cZsphphxminlj5o/DTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNM+Q9KQZUffwDbdwAAAABJRU5ErkJggg==",
          }}
          style={{ width: 10, height: 10 }}
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
