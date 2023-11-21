import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, DrawerLayoutAndroid } from 'react-native';

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

  // warn
  const [markers, setMarkers] = useState([]);

  if (auth) {
    return (
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition={'left'}
        renderNavigationView={() => <Drawer setMarkers={setMarkers} markers={markers}/>}
      >
        <View style={styles.container}>
          <StatusBar style="light" />
          <Navbar openDrawer={openDrawer}/>
          <Map markers={markers} setMarkers={setMarkers}/>
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