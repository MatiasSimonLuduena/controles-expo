import { useState, useEffect, useRef } from "react"
import { View, Alert } from 'react-native';

import * as Location from 'expo-location';

import styles from './styles';

import MapView, { Marker } from 'react-native-maps';

const delivery = require("../../assets/repartidor.png");
const transito = require("../../assets/transito.png");

export default function Map({ markers, setMarkers }) {
  const [origin, setOrigin] = useState({
    latitude: -31.428086, longitude: -64.184786
  });

  useEffect(() => {
    getLocationPermission();
  }, [])

  async function getPosition() {
    try {
      let location = await Location.getCurrentPositionAsync({});

      const current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      setOrigin(current);
    } catch (error) {
      console.log(error);
    }
  }

  setTimeout(() => { getPosition() }, 30000);

  async function getLocationPermission() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Denegado!!",
          "Denegaste el persimo para acceder a tu ubicación, la aplicación no podrá funcionar correctamente"
        );
        return;
      }
      getPosition();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    mapViewRef.current?.animateToRegion({
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    });
  }, [origin]);

  const mapViewRef = useRef(null);

  const handleMarkerDrag = (index, newCoordinate) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index] = newCoordinate;
    setMarkers(updatedMarkers);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={origin}
          image={delivery}
        />
        {markers.map((item, i) => (
          <Marker
            key={i}
            coordinate={item}
            image={transito}
            draggable onDragEnd={(e) => handleMarkerDrag(i, e.nativeEvent.coordinate)}
          />
        ))}
      </MapView>
    </View>
  );
}