// HomeScreen.tsx

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { color } from '../../constant/theme';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World, my name is [Your Name]</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddNewCustomer')}>
        <Text style={styles.text}>Add New Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
