import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";

// Replace '<YOUR_MAPBOX_ACCESS_TOKEN>' with your actual Mapbox access token
MapboxGL.setAccessToken(
  "pk.eyJ1Ijoic2FpZm1zayIsImEiOiJjbHVyZnUzbmkwODJrMnJwYWZyem0ybXNoIn0.aSQunMAR3GWfJpVBaJkaEg"
);
const MapScreen = () => {
  return (
    <MapboxGL.MapView>
      <MapboxGL.Camera />
    </MapboxGL.MapView>
  );
};

export default MapScreen;
