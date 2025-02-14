// HomeScreen.tsx

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../../constant/theme';
import {useNavigation} from '@react-navigation/native';
import {MainContainer} from '../../components';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <MainContainer>
      <View style={styles.container}>
        <Text style={styles.text}>Hello World, my name is [Your Name]</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddNewCustomer')}>
          <Text style={styles.text}>Add New Customer</Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
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
