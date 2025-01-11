
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  { ToastConfig } from 'react-native-toast-message';

const toastConfig: ToastConfig = {
  error: ({ text1, text2 }) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastTitle}>{text1}</Text>
      <Text style={styles.toastMessage}>{text2}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    padding: 16,
    backgroundColor: 'red', // Red background color
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastTitle: {
    fontSize: 16,
    color: 'white', // White text color for title
    fontWeight: 'bold',
  },
  toastMessage: {
    fontSize: 14,
    color: 'white', // White text color for message
  },
});

export default toastConfig;
