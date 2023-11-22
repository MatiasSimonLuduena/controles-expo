import { useEffect, useRef } from "react"
import { View } from 'react-native';

import styles from './styles';

import MapView, { Marker } from 'react-native-maps';

const delivery = require("../../assets/repartidor.png");
const transito = require("../../assets/transito.png");

export default function Map({ markers, origin, init, myMarkers, setMyMarkers, setIdMarker }) {
  useEffect(() => {
    mapViewRef.current?.animateToRegion({
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    });
  }, [init]);

  const mapViewRef = useRef(null);

  const handleMarkerDrag = (index, newCoordinate) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index] = newCoordinate;
    setMyMarkers(updatedMarkers);
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={() => setIdMarker(null)}
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
            onPress={() => setIdMarker(item.id)}
          />
        ))}
        {myMarkers.map((item, i) => (
          <Marker
            key={i}
            coordinate={item}
            draggable onDragEnd={(e) => handleMarkerDrag(i, e.nativeEvent.coordinate)}
            onPress={() => console.log("ok")}
          />
        ))}
      </MapView>
    </View>
  );
}