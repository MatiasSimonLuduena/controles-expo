import React, { useRef, useState, useEffect } from 'react';

// RN
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, DrawerLayoutAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';

// imports components
import Navbar from './components/navbar/Navbar';
import Drawer from './components/drawer/Drawer';
import Map from './components/map/Map';
import Warn from './components/warn/Warn';
import Desc from './components/desc/Desc';

// import auth
import Auth from './components/auth/Auth';

// firebase
import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"

export default function App() {
  // auth
  const [auth, setAuth] = useState(false);

  async function storage() {
    const valor = await AsyncStorage.getItem('auth');
    valor && setAuth(valor);
  }

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
    storage();
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
  const [myMarkers, setMyMarkers] = useState([]);
  const [idMarker, setIdMarker] = useState(null);

  async function getMarkers() {
    try {
      await getDocs(collection(db, "controls")).then((querySnapshot)=>{               
        const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id: doc.id }));

        setMarkers(newData);
    });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMarkers();
  }, [myMarkers, idMarker]);

  if (auth) {
    return (
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition={'left'}
        renderNavigationView={() => (
          <Drawer
            setMyMarkers={setMyMarkers} myMarkers={myMarkers}
            origin={origin} closeDrawer={closeDrawer} auth={auth}
          />
        )}
      >
        <View style={styles.container}>
          <StatusBar style="light" />
          <Navbar openDrawer={openDrawer}/>
          <Map markers={markers} setMarkers={setMarkers}
            origin={origin} init={init}
            myMarkers={myMarkers} setMyMarkers={setMyMarkers}
            setIdMarker={setIdMarker}
          />
          <Warn myMarkers={myMarkers} setMyMarkers={setMyMarkers}/>
          <Desc idMarker={idMarker} setIdMarker={setIdMarker}/>
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