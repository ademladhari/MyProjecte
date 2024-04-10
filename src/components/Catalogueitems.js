import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, Text, View } from "react-native";
const Catalogueitems = (props) => {
  const { name, image } = props;
  return (
    <ScrollView
      className="  mt-5 flex flex-row"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {[...Array(8)].map(() => (
        <>
          <View className="w-[105px] ml-6 ">
            <View className="w-[95px] h-[95px] rounded-full bg-[#9EB3FF]">
              <Image source={{ uri: image }} />
            </View>
            <Text className="ml-4 mt-2">Vitamins</Text>
          </View>
        </>
      ))}
    </ScrollView>
  );
};

export default Catalogueitems;
