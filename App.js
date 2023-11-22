import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, DrawerLayoutAndroid, Alert } from 'react-native';

import * as Location from 'expo-location';

// imports components
import Navbar from './components/navbar/Navbar';
import Drawer from './components/drawer/Drawer';
import Map from './components/map/Map';

// import auth
import Auth from './components/auth/Auth';

export default function App() {
  // auth
  const [auth, setAuth] = useState(false)

  // drawer
  const drawerRef = useRef(null);

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };

  // ubicación y seguimiento
  const [origin, setOrigin] = useState({
    latitude: -31.428086, longitude: -64.184786
  });
  const [init, setInit] = useState(false);

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
      !init && setInit(true);
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

  // controles
  const [markers, setMarkers] = useState([]);

  if (auth) {
    return (
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition={'left'}
        renderNavigationView={() => (
          <Drawer
            setMarkers={setMarkers} markers={markers} origin={origin} closeDrawer={closeDrawer}
          />
        )}
      >
        <View style={styles.container}>
          <StatusBar style="light" />
          <Navbar openDrawer={openDrawer}/>
          <Map markers={markers} setMarkers={setMarkers} origin={origin} init={init}/>
        </View>
      </DrawerLayoutAndroid>
    );
  }

  return <Auth setAuth={setAuth}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});