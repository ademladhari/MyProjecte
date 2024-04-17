import React, { useState, useEffect } from "react";
import { Button, View, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 35.82364,
    longitude: 10.64142,
  });
  var requestOptions = {
    method: "GET",
  };
  useEffect(() => {
    const fetchDestinationCoordinates = async () => {
      const street = "Rue Ali Ben Ayed";
      const country = "tunisia akouda";
      const apiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        street
      )},${encodeURIComponent(
        country
      )}&apiKey=d7be5b465aef40c8845abda45ffd0583`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setDestination({
          latitude: data.features[0].geometry.coordinates[1],
          longitude: data.features[0].geometry.coordinates[0],
        });
      } catch (error) {
        console.error("Error fetching destination coordinates:", error);
      }
    };

    fetchDestinationCoordinates();
  }, []);
  const startPoint = "tunisia akouda";
  const endPoint = "tunisia akouda Rue Ali Ben Ayed";

  // Construct the URL with variables
  const apiUrl = `https://api.geoapify.com/v1/routing?waypoints=${encodeURIComponent(
    startPoint
  )}|${encodeURIComponent(
    endPoint
  )}&mode=drive&apiKey=d7be5b465aef40c8845abda45ffd0583`;

  // Fetch data using the constructed URL
  fetch(
    "https://api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&mode=drive&apiKey=d7be5b465aef40c8845abda45ffd0583",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location services to use this app."
        );
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      } else {
        Alert.alert(
          "Permission Denied",
          "Please enable location services to use this app."
        );
      }
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  };

  const simulateRoute = () => {
    if (currentLocation) {
      // Simulate a route by drawing a straight line between current location and destination
      return [
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        { latitude: destination.latitude, longitude: destination.longitude },
      ];
    } else {
      return [];
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Current Location" />
        )}
        <Marker coordinate={destination} title="Destination" />
        {currentLocation && (
          <Polyline coordinates={simulateRoute()} strokeWidth={4} />
        )}
      </MapView>
      <Button title="Get Current Location" onPress={getCurrentLocation} />
    </View>
  );
}
