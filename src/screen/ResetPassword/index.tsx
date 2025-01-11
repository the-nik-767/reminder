// HomeScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color, fontSize, responsiveWidth } from '../../constant/theme';
import { useNavigation } from '@react-navigation/native';

import Bigball from '../../assets/svgs/bigball.svg';
import IcBall from '../../assets/svgs/icBall.svg';
import Bg from '../../assets/svgs/bg.svg';
import { InputBox } from '../../components/common/inputBox';

const ResetPassword = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (password === confirmPassword) {
      // Add reset password logic here
      console.log('Password reset successful');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ballContainer}>
        <Bigball />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <IcBall width={30} height={30} />
          </View>
          <Text style={styles.text}>Reminder</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Reset Password</Text>

          <InputBox
            title="Enter new password"
            value={password}
            onChangeText={setPassword}
            showEyeIcon={true}
            secureTextEntry={true}
            inputboxContainer={styles.inputStyle}
          />

          <InputBox
            title="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            showEyeIcon={true}
            secureTextEntry={true}
            inputboxContainer={styles.inputStyle}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              password && confirmPassword
                ? styles.submitButtonActive
                : styles.submitButtonInactive,
            ]}>
            <Text style={styles.submitButtonText}>Reset Password</Text>
          </TouchableOpacity>
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Back to </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
              <Text style={styles.resendLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Bg />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  ballContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  mainContainer: {
    margin: responsiveWidth('5%'),
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: responsiveWidth('2%'),
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
  },
  formContainer: {
    marginTop: responsiveWidth('10%'),
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: responsiveWidth('5%'),
  },
  inputStyle: {
    height: responsiveWidth('12%'),
    marginTop: responsiveWidth('4%'),
    borderRadius: responsiveWidth('2.5%'),
  },
  submitButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveWidth('8%'),
  },
  submitButtonActive: {
    backgroundColor: color.primary,
  },
  submitButtonInactive: {
    backgroundColor: color.primary,
  },
  submitButtonText: {
    color: color.white,
    fontSize: fontSize.medium,
    fontWeight: '600',
  },
  bottomContainer: {
    marginTop: 'auto',
    justifyContent: 'flex-end',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: responsiveWidth('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: fontSize.small,
    color: color.gray,
  },
  resendLink: {
    fontSize: fontSize.small,
    color: color.primary,
    fontWeight: '600',
  },
});

export default ResetPassword;
