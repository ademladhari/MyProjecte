import { LinearGradient } from "expo-linear-gradient";
import { Button, Text, TouchableOpacity, View } from "react-native";
const Buttom = (props) => {
  const { route, width, height, name } = props;
  return (
    <View>
      <TouchableOpacity
        title="Start"
        className={` w-[${width}] h-[${height}]  mx-auto  mt-7  rounded-xl`}
        onPress={route}
      >
        <LinearGradient
          className="rounded-xl"
          colors={["#7289F1", "#AEBFF4"]} // Define your gradient colors
        >
          <Text className="pb-2 text-center pt-2  text-2xl">{name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Buttom;
