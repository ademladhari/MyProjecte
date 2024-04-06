import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useNavigation } from "@react-navigation/native";

const QRCodeScanner = () => {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "This app needs access to your camera.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission granted");
            setHasCameraPermission(true);
          } else {
            console.log("Camera permission denied");
            setHasCameraPermission(false);
          }
        } catch (error) {
          console.error("Error requesting camera permission:", error);
        }
      } else {
        console.log(
          "iOS platform does not require explicit permission for camera access."
        );
        setHasCameraPermission(true);
      }
    };

    requestPermission();
  }, []);

  const handleQRCodeRead = (event) => {
    const { data } = event;
    // Navigate to the QRCodeDetails screen with the scanned data
    navigation.navigate("QRCodeDetails", { data });
  };

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Camera permission denied. Please grant camera access.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleQRCodeRead}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default QRCodeScanner;
