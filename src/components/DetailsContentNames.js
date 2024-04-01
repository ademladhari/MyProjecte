import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const DetailsContentNames = (props) => {
  const { name } = props;
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {/* TouchableOpacity 1 */}
      <TouchableOpacity
        style={{
          width: 105,
          height: 40,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#7289F1",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // Ensure gradient doesn't overflow
        }}
        onPress={() => setSelectedItem("eaf")}
      >
        <LinearGradient
          colors={["#7289F1", "#9EB3FF"]}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: selectedItem === "eaf" ? "#000" : "#7289F1",
            }}
          >
            eaf
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* TouchableOpacity 2 */}
      <TouchableOpacity
        style={{
          width: 105,
          height: 40,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#7289F1",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // Ensure gradient doesn't overflow
        }}
        onPress={() => setSelectedItem("arzd")}
      >
        <LinearGradient
          colors={["#7289F1", "#9EB3FF"]}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: selectedItem === "arzd" ? "#000" : "#7289F1",
            }}
          >
            arzd
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* TouchableOpacity 3 */}
      <TouchableOpacity
        style={{
          width: 105,
          height: 40,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#7289F1",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // Ensure gradient doesn't overflow
        }}
        onPress={() => setSelectedItem("azd")}
      >
        <LinearGradient
          colors={["#7289F1", "#9EB3FF"]}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: selectedItem === "azd" ? "#000" : "#7289F1",
            }}
          >
            azd
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsContentNames;
