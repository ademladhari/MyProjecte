import React, { useState, useEffect } from "react";
import { Button, View, Alert } from "react-native";
import MapView, { Marker as MapMarker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    async function fetchRoute() {
      if (currentLocation && destination) {
        const { latitude, longitude } = currentLocation;
        const apiKey =
          "pk.eyJ1Ijoic2FpZm1zayIsImEiOiJjbHVyZnUzbmkwODJrMnJwYWZyem0ybXNoIn0.aSQunMAR3GWfJpVBaJkaEg"; // Replace with your actual Mapbox API key
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${longitude},${latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=${apiKey}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          if (data.routes.length) {
            const coordinates = data.routes[0].geometry.coordinates.map(
              (coord) => ({
                latitude: coord[1],
                longitude: coord[0],
              })
            );
            setRouteCoordinates(coordinates);
          }
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      }
    }
    fetchRoute();
  }, [currentLocation, destination]);

  useEffect(() => {
    const fetchDestinationCoordinates = async () => {
      const placeName =
        "Institut Supérieur d'Informatique et des Technologies de Communication";
      const locality = "Hammam Sousse"; // More specific locality
      const country = "tunisia";
      const apiKey = "61c5418d7de145818eee5865cf68d51e"; // Use your actual OpenCage API key
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        placeName + ", " + locality + ", " + country
      )}&key=${apiKey}`;

      try {
        console.log("Requesting:", apiUrl); // Check the complete URL
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Response:", data); // Check the raw response
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setDestination({
            latitude: lat,
            longitude: lng,
          });
        } else {
          console.error("No results found or error in response:", data);
          Alert.alert(
            "Geocoding Error",
            "No results found. Please check the place name and try again."
          );
        }
      } catch (error) {
        console.error("Error fetching destination coordinates:", error);
        Alert.alert(
          "API Error",
          "Failed to fetch destination coordinates. Check console for more details."
        );
      }
    };
    fetchDestinationCoordinates();
  }, []);

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
        const options = {
          accuracy: Location.Accuracy.BestForNavigation,
          timeout: 5000,
          maximumAge: 0,
        };
        const location = await Location.getCurrentPositionAsync(options);
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        Alert.alert(
          "Permission Denied",
          "Please enable location services to use this app."
        );
      }
    } catch (error) {
      console.error("Error fetching current location:", error);
      Alert.alert(
        "Location Error",
        "Failed to fetch current location. Please ensure your location settings are enabled and try again."
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 34.0,
          longitude: 9.0,
          latitudeDelta: 5.0,
          longitudeDelta: 5.0,
        }}
      >
        {currentLocation && <MapMarker coordinate={currentLocation} />}
        {destination && (
          <MapMarker coordinate={destination} title="Destination" />
        )}
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={4}
          strokeColor="red"
        />
      </MapView>
      <Button title="Get Current Location" onPress={getCurrentLocation} />
    </View>
  );
}
