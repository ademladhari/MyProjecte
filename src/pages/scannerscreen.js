import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { patchData } from "../redux/actions/ActionUpdate";
import { useDispatch } from "react-redux";

export default function QRCodeScanner({ route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const dispatch = useDispatch();
  const [scannedData, setScannedData] = useState([]); // State to store scanned QR codes
  const cameraRef = useRef(null);
  const [status, setStatus] = useState("en cours");
  const { userID } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const changeDemand = () => {
    setStatus(status === "en cours" ? "collected" : "en cours");
    console.log(status);
  };
  const handleBarCodeScanned = ({ data }) => {
    if (!scannedData.includes(data)) {
      setScannedData([...scannedData, data]); // Add the scanned QR code to the list
      const demandId = JSON.parse(data).insertId;
      dispatch(
        patchData(demandId, {
          Status: status,
          agentUserID: userID,
        })
      );
      // Add a short delay before fetching the data again
      alert(`QR code with data ${data} has been scanned!`);
    }
  };

  const onCameraReady = () => {
    // You can do something when the camera is ready
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={handleBarCodeScanned}
        onCameraReady={onCameraReady}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.torchButton}
            onPress={() => changeDemand()}
          >
            <Text style={styles.torchText}>{status}</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  torchButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 10,
    borderRadius: 5,
  },
  torchText: {
    fontSize: 20,
    color: "white",
  },
});
