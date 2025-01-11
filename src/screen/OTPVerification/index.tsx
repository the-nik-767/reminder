// HomeScreen.tsx

import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  TextInput,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { color, fontSize, responsiveWidth } from '../../constant/theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import Bigball from '../../assets/svgs/bigball.svg';
import IcBall from '../../assets/svgs/icBall.svg';
import Bg from '../../assets/svgs/bg.svg';
import { RouteProp, useNavigation, NavigationProp, StackActions } from '@react-navigation/native';
import serviceFactory from '../../services/serviceFactory';
import UserService from '../../services/user/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useKeyboardVisible } from '@react-native-community/hooks';
import SuccessModal from '../../components/SuccessModal';


type UserResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  business_category_id: number;
  is_verified: boolean;
  language: string;
  createdAt: string;
  updatedAt: string;
};

type RootStackParamList = {
  OTPVerification: {
    userData: UserResponse;
  };
  HomeScreen: undefined;
};

const OTPVerification = ({ route }: { route: RouteProp<RootStackParamList, 'OTPVerification'> }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userData } = route.params;
  const userService = serviceFactory.get<UserService>('UserService');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [showModal, setShowModal] = useState(false);

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
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const otpCode = code.join('');
      console.log('OTP:', otpCode, userData.id);

      const response = await userService.verifyOTP(userData.id, otpCode);
      console.log('OTP Verification Response:', response);

      if (response.status) { 
        // Show success modal first
        setShowModal(true);
        
        // Store user data
        await AsyncStorage.setItem('USER_DATA', JSON.stringify(userData));
        
        // Store token separately
        if (response.response?.token) {
          await AsyncStorage.setItem(
            'USER_TOKEN',
            response.response.token
          );
        }

        // navigation.dispatch(StackActions.replace('HomeScreen'));
        Keyboard.dismiss();
      } else {
        Alert.alert('Verification Failed', response.error_message || 'OTP Verification Failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Error', 'Something went wrong during verification');
    }
  };

  return (
    <>
      <SuccessModal
        visible={showModal}
        onClose={() => {
            setShowModal(false);
            navigation.dispatch(StackActions.replace('HomeScreen'));
        }}
        message="OTP Verification Successful!"
      />
      
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            style={styles.keyboardAvoidingView}>
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

              <View style={styles.otpTitleContainer}>
                <Text style={styles.otpTitle}>OTP Verification</Text>
                <Text style={styles.otpDescription}>
                  Enter The Otp Sent To +91 {userData.phone}
                </Text>
              </View>

              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              </View>

              <View style={styles.otpContainer}>
                <View style={styles.otpInputContainer}>
                  {[0, 1, 2, 3].map(index => (
                    <TextInput
                      key={index}
                      ref={inputRefs.current[index]}
                      style={[
                        styles.otpInput,
                        code[index] && styles.otpInputFilled,
                      ]}
                      maxLength={1}
                      keyboardType="number-pad"
                      onChangeText={value => handleOtpChange(value, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      value={code[index]}
                    />
                  ))}
                </View>

                <View style={styles.resendContainer}>
                  <TouchableOpacity>
                    <Text style={styles.resendLink}>Resend OTP</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={handleVerify}
                  style={[
                    styles.verifyButton,
                    code.join('').length === 4 && styles.verifyButtonActive,
                  ]}>
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>

                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>Back to </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.resendLink}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        {!keyboardVisible && (
          <View style={styles.bottomContainer}>
            <Bg style={styles.bgImage} />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  keyboardAvoidingView: {
    flex: 1,
    minHeight: '100%',
  },
  ballContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth('5%'),
    paddingTop: responsiveWidth('5%'),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveWidth('5%'),
  },
  iconContainer: {
    padding: responsiveWidth('2%'),
    borderRadius: responsiveWidth('5%'),
    marginRight: responsiveWidth('2%'),
  },
  text: {
    fontSize: responsiveWidth('4%'),
    fontWeight: '600',
    color: color.black,
  },
  otpContainer: {
    alignItems: 'center',
    marginTop: responsiveWidth('5%'),
  },
  otpTitle: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth('7%'),
    fontWeight: '700',
    lineHeight: responsiveWidth('8.4%'),
    letterSpacing: -0.02 * responsiveWidth('7%'),
    textAlign: 'left',
    color: color.black,
    marginBottom: responsiveWidth('3%'),
  },
  otpDescription: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth('4%'),
    fontWeight: '400',
    lineHeight: responsiveWidth('5.2%'),
    letterSpacing: -0.02 * responsiveWidth('4%'),
    textAlign: 'left',
    color: color.gray,
    marginBottom: responsiveWidth('5%'),
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth('85%'),
    gap: responsiveWidth('3%'),
  },
  otpInput: {
    width: responsiveWidth('12%'),
    height: responsiveWidth('12%'),
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: responsiveWidth('2%'),
    fontSize: responsiveWidth('5%'),
    textAlign: 'center',
    backgroundColor: color.white,
    color: color.black,
  },
  otpInputFilled: {
    backgroundColor: color.white,
    borderColor: color.primary,
  },
  verifyButton: {
    width: responsiveWidth('84%'),
    height: responsiveWidth('13%'),
    paddingVertical: responsiveWidth('4%'),
    paddingBottom: responsiveWidth('3.8%'),
    gap: 0,
    borderRadius: responsiveWidth('2.5%'),
    backgroundColor: color.primary,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveWidth('5%'),
  },
  verifyButtonActive: {
    opacity: 1,
  },
  verifyButtonText: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth('4%'),
    fontWeight: '600',
    lineHeight: responsiveWidth('5.2%'),
    letterSpacing: -0.02 * responsiveWidth('4%'),
    textAlign: 'center',
    color: color.white,
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: responsiveWidth('3%'),
    marginBottom: responsiveWidth('2%'),
  },
  resendText: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth('4%'),
    fontWeight: '400',
    lineHeight: responsiveWidth('5.2%'),
    letterSpacing: -0.02 * responsiveWidth('4%'),
    textAlign: 'center',
    color: color.gray,
  },
  resendLink: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth('4%'),
    fontWeight: '500',
    lineHeight: responsiveWidth('5.2%'),
    letterSpacing: -0.02 * responsiveWidth('4%'),
    textAlign: 'center',
    color: color.primary,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bgImage: {
    width: '100%',
    height: responsiveWidth('30%'),
  },
  scrollContainer: {
    flexGrow: 1,
    height: Platform.OS === 'ios' ? '110%' : '100%',
  },
  otpTitleContainer: {
    marginLeft: responsiveWidth('3%'),
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: responsiveWidth('1%'),
  },
  timerText: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth('4%'),
    fontWeight: '600',
    lineHeight: responsiveWidth('5.2%'),
    letterSpacing: -0.02 * responsiveWidth('4%'),
    textAlign: 'center',
    color: color.black,
  },
});

export default OTPVerification;
