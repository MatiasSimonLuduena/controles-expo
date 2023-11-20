import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default function Navbar({ openDrawer }) {
  return (
    <View style={styles.container}>
      <View style={{ height: 24 }}></View>
      <View style={styles.view}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="bars" size={25} color="#fff"/>
        </TouchableOpacity>
        <Text style={styles.text}>Controles</Text>
      </View>
    </View>
  );
}