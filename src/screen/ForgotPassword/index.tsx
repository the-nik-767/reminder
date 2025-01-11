// HomeScreen.tsx

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  KeyboardEvent,
  ScrollView,
} from 'react-native';
import {color, fontSize, responsiveWidth} from '../../constant/theme';
import { useNavigation } from '@react-navigation/native';
import serviceFactory from '../../services/serviceFactory';
import UserService from '../../services/user/user.service';

import Bigball from '../../assets/svgs/bigball.svg';
import IcBall from '../../assets/svgs/icBall.svg';
import Bg from '../../assets/svgs/bg.svg';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [error, setError] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const userService = serviceFactory.get<UserService>('UserService');
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e: KeyboardEvent) => {
        Animated.timing(keyboardHeight, {
          toValue: e.endCoordinates.height - 200,
          duration: 250,
          useNativeDriver: false
        }).start();
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false
        }).start();
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      if (!isValidPhone) return;
      
      Keyboard.dismiss();
      const response = await userService.forgotPassword(phoneNumber);
      
      if (response.status) {
        Alert.alert('Success', 'Password reset OTP has been sent to your phone number');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.error_message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', 'Failed to process your request');
    }
  };

  const validatePhone = (text: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    const isValid = phoneRegex.test(text);
    setIsValidPhone(isValid);
    
    if (!isValid) {
      setError('Please enter a valid 10-digit phone number');
    } else {
      setError('');
    }
    setPhoneNumber(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
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
            <View>
              <Text style={styles.title}>Forgot Password</Text>
            </View>

            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="Phone Number"
              placeholderTextColor={color.gray}
              value={phoneNumber}
              onChangeText={validatePhone}
              keyboardType="numeric"
              maxLength={10}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                isValidPhone
                  ? styles.submitButtonActive
                  : styles.submitButtonInactive,
              ]}>
              <Text style={styles.submitButtonText}>Send</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Back to </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login' as never)}>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {!keyboardVisible && (
        <View style={styles.bottomContainer}>
          <Bg style={styles.bgImage} />
        </View>
      )}
    </KeyboardAvoidingView>
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
    flex: 1,
    paddingHorizontal: responsiveWidth('5%'),
    paddingTop: responsiveWidth('15%'),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: color.primaryLight,
    padding: responsiveWidth('2%'),
    borderRadius: responsiveWidth('5%'),
    marginRight: responsiveWidth('2%'),
  },
  text: {
    fontSize: fontSize.large,
    fontWeight: '600',
    color: color.black,
  },
  formContainer: {
    marginTop: responsiveWidth('8%'),
  },
  title: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth(6.5),
    fontWeight: '700',
    lineHeight: responsiveWidth(7.8),
    letterSpacing: -0.02,
    textAlign: 'left',
    color: color.black,
    marginBottom: responsiveWidth(4),
  },
  description: {
    fontSize: fontSize.small,
    color: color.gray,
    textAlign: 'center',
    marginBottom: responsiveWidth('8%'),
  },
  input: {
    height: responsiveWidth(12),
    borderColor: color.lightgray,
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveWidth(3.5),
    color: color.black,
    marginVertical: responsiveWidth(2),
    backgroundColor: color.white,
  },
  submitButton: {
    width: '100%',
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(2),
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveWidth(5),
  },
  submitButtonActive: {
    opacity: 1,
  },
  submitButtonInactive: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth(4),
    fontWeight: '600',
    lineHeight: responsiveWidth(5.2),
    letterSpacing: -0.02 * responsiveWidth(4),
    textAlign: 'center',
    color: color.white,
  },
  footer: {
    flexDirection: 'row',
    marginTop: responsiveWidth('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth(4),
    fontWeight: '400',
    lineHeight: responsiveWidth(4.8),
    letterSpacing: -0.02,
    textAlign: 'center',
    color: color.gray,
  },
  footerLink: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth(4),
    fontWeight: '500',
    lineHeight: responsiveWidth(4.8),
    letterSpacing: -0.02,
    textAlign: 'center',
    color: color.primary,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  bgImage: {
    width: '100%',
    height: responsiveWidth('30%'),
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveWidth(3),
    marginTop: responsiveWidth(1),
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default ForgotPassword;
