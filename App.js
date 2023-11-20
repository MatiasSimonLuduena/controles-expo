import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, DrawerLayoutAndroid, TouchableOpacity, Text } from 'react-native';

// imports components
import Navbar from './components/navbar/Navbar';
import Drawer from './components/drawer/Drawer';
import Map from './components/map/Map';

export default function App() {
  const drawerRef = useRef(null);

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={() => <Drawer closeDrawer={closeDrawer}/>}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <Navbar openDrawer={openDrawer}/>
        <Map/>
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});