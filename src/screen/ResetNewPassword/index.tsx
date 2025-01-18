import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {InputBox} from '../../components/common/inputBox';
import {Header} from '../../components';
import {color, responsiveWidth} from '../../constant/theme';

const {width, height} = Dimensions.get('window');

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
    <View style={styles.container}>
      {/* Header */}
      <Header title="Reset Password" showBack />

      {/* Form Container */}
      <View style={styles.formContainer}>
        <InputBox
          title="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrentPassword}
          showEyeIcon={true}
          inputboxContainer={styles.inputStyle}
        />

        <InputBox
          title="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
          showEyeIcon={true}
          inputboxContainer={styles.inputStyle}
        />
        <InputBox
          title="New Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          showEyeIcon={true}
          inputboxContainer={styles.inputStyle}
        />
      </View>

      <View style={{flex: 1}} />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBackground,
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
    marginHorizontal: width * 0.04,
    // marginTop: height * 0.02,
    backgroundColor: color.white,
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveWidth(4),
    borderRadius: responsiveWidth(3),
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
    backgroundColor: color.primary,
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inputStyle: {
    height: responsiveWidth('12%'),
    marginTop: responsiveWidth('4%'),
    borderRadius: responsiveWidth('2.5%'),
  },
});

export default ResetNewPassword;
