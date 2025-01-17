import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputBox } from '../../components/common/inputBox';


const { width, height } = Dimensions.get('window');

const ResetNewPassword = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    // Add your password reset logic here
    console.log('Password reset attempted');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <InputBox
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrentPassword}
          showEyeIcon={true}
          //   onRightIconPress={() => setShowCurrentPassword(!showCurrentPassword)}
          inputboxContainer={styles.inputContainer}
        />

        <InputBox
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
          showEyeIcon={true}
          //   onRightIconPress={() => setShowNewPassword(!showNewPassword)}
          inputboxContainer={styles.inputContainer}
        />

        <InputBox
          placeholder="New Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          showEyeIcon={true}
          //   onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          inputboxContainer={styles.inputContainer}
        />
      </View>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        {/* <CustomButton
          title="Save"
          onPress={handleSave}
          containerStyle={styles.saveButton}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: width * 0.04,
    color: '#000',
  },
  formContainer: {
    paddingHorizontal: width * 0.04,
    marginTop: height * 0.02,
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    width: '100%',
    paddingHorizontal: width * 0.04,
  },
  saveButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    height: height * 0.06,
  },
});

export default ResetNewPassword;
