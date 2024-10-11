import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import SearchInput from "../../components/SearchInput";

const MapScreen = () => {
  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        initialRegion={{
          latitude: 4.59738,
          longitude: -74.06973,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Marker
          coordinate={{ latitude: 4.59738, longitude: -74.06973 }}
          title="Chorro de Quevedo"
          description="Lugar histórico en Bogotá, Colombia"
        />
      </MapView>

      {/* Search Input sobre el mapa */}
      <View className="absolute top-16 left-4 right-4">
        <SearchInput />
      </View>
    </View>
  );
};

export default MapScreen;
