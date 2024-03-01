import { Text, View } from "react-native";
import ProfileSetting from "../components/Profile-Setting";
import AdressCard from "../components/adress-card";

export default function Profile({ navigation }) {
  return (
    <View>
      <View>
        <Text>t</Text>
      </View>

      <View>
        <ProfileSetting
          name="same"
          Phonenumber="2415"
          password="refzd"
          adress="456456"
          region="dzfklsdjf"
        />
      </View>
      <View>
        <AdressCard region="trr" adress="tees" />
      </View>
    </View>
  );
}
