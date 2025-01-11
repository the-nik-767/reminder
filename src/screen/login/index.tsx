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
  ScrollView,
  KeyboardEvent,
  Animated,
} from 'react-native';
import {color, fontSize, responsiveHeight, responsiveWidth} from '../../constant/theme';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import serviceFactory from '../../services/serviceFactory';
import UserService from '../../services/user/user.service';
import {InputBox} from '../../components/common/inputBox';
import Toast from 'react-native-toast-message';

import Bigball from '../../assets/svgs/bigball.svg';
import IcBall from '../../assets/svgs/icBall.svg';
import Bg from '../../assets/svgs/bg.svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined; // Login screen
  Register: undefined; // Register screen
  ForgotPassword: undefined;
  HomeScreen: undefined;
  // Add other screens as needed
};

// Define your navigation prop type
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

// Validation schema for formik
const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
    .required('Please enter your phone number'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Please enter your password'),
});

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const userService = serviceFactory.get<UserService>('UserService');
  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      console.log('Login values:', values);
      // navigation.replace('HomeScreen');
      try {
        const data = await userService.login(values.phone, values.password);
        console.log('Login data:', data);
        if (data.success && data.token) {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back! You have successfully logged in.',
            position: 'top',
            topOffset: 60,
            visibilityTime: 3000,
          });
          navigation.replace('HomeScreen');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: data.error_message || 'Invalid credentials. Please try again.',
            position: 'top',
            topOffset: 60,
            visibilityTime: 3000,
          });
          formik.setErrors({ 
            general: data.error_message || 'Invalid credentials'
          });
        }
      } catch (error: any) {
        console.log('Login error:', error);
        const errorMessage = error?.response?.data?.error_message || 
                            'Something went wrong. Please try again.';
        
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
          position: 'top',
          topOffset: 60,
          visibilityTime: 3000,
        });
        formik.setErrors({ general: errorMessage });
      }
    },
  });

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.ballContainer}>
          <Bigball style={styles.ball} />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <View style={styles.iconContainer}>
              <IcBall width={30} height={30} />
            </View>
            <Text style={styles.text}>Reminder</Text>
          </View>
          <View style={styles.languageContainerMain}>
            <Text style={styles.languageTitle}>Login</Text>

            <InputBox
              title="Phone Number"
              inputboxContainer={styles.input}
              value={formik.values.phone}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <Text style={styles.error}>{formik.errors.phone}</Text>
            ) : null}

            <InputBox
              title="Password"
              inputboxContainer={styles.input}
              secureTextEntry
              showEyeIcon
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <Text style={styles.error}>{formik.errors.password}</Text>
            ) : null}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.fPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <Animated.View style={[
              styles.languageContainerinder, 
              { marginBottom: keyboardHeight }
            ]}>
              <TouchableOpacity
                onPress={() => {
                  formik.handleSubmit();
                }}
                style={styles.languageButton}>
                <Text style={styles.languageButtonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
            <View style={styles.registerContainer}>
              <Text style={styles.loginText}>Don&apos;t have an account?</Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.linkText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {!keyboardVisible && (
        <View style={styles.bottomContainer}>
          <Bg />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
 
  keyboardAvoidingView: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
  },
  ball: {
    alignSelf: 'flex-end',
    // marginTop: responsiveHeight(5),
  },
  mainContainer: {
    margin: responsiveWidth('5%'),
    // flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: responsiveWidth('1%'),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  languageButton: {
    backgroundColor: color.primary,
    padding: responsiveWidth('3%'),
    borderRadius: responsiveWidth('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveWidth('2%'),
  },
  languageButtonText: {
    fontSize: responsiveWidth('4%'),
    fontWeight: '600',
    color: color.white,
  },
  languageContainerMain: {
    marginTop: responsiveWidth('1%'),
    paddingHorizontal: responsiveWidth('1%'),
  },
  languageContainer: {
    marginTop: responsiveWidth('2%'),
  },
  languageContainerinder: {
    marginTop: responsiveWidth('2%'),
  },
  languageText: {
    fontSize: fontSize.smallx,
    fontWeight: '500',
    margin: responsiveWidth('2%'),
  },
  languageTitle: {
    fontFamily: 'Inter',
    fontSize: responsiveWidth('6.5%'),
    fontWeight: '700',
    lineHeight: responsiveWidth('7.8%'),
    letterSpacing: -0.02,
    textAlign: 'left',
    margin: responsiveWidth('2%'),
  },
  text: {
    fontSize: responsiveWidth('6%'),
    fontWeight: '500',
    marginLeft: responsiveWidth('1%'),
  },
  languageIconContainer: {
    margin: responsiveWidth('2%'),
  },
  languageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveWidth('1%'),
    marginBottom: responsiveWidth('1%'),
    borderWidth: 1,
    borderColor: color.lightgray,
    borderRadius: responsiveWidth('2%'),
    padding: responsiveWidth('1%'),
  },
  input: {
    height: responsiveWidth('12%'),
    borderColor: color.lightgray,
    borderWidth: 1,
    borderRadius: responsiveWidth('2%'),
    paddingHorizontal: responsiveWidth('2%'),
    marginBottom: responsiveWidth('0.5%'),
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: responsiveWidth('2%'),
  },
  loginText: {
    textAlign: 'center',
    color: color.gray,
    fontFamily: 'Inter',
    fontSize: responsiveWidth('4%'),
    fontWeight: '400',
    lineHeight: responsiveWidth('4.8%'),
    letterSpacing: -0.02,
  },
  linkText: {
    color: color.primary,
    fontFamily: 'Inter',
    fontSize: responsiveWidth('4%'),
    fontWeight: '500',
    lineHeight: responsiveWidth('4.8%'),
    letterSpacing: -0.02,
    textAlign: 'center',
    marginLeft: responsiveWidth('1%'),
  },
  fPassword: {
    color: color.primary,
    fontFamily: 'Inter',
    fontSize: responsiveWidth('4%'),
    fontWeight: '600',
    lineHeight: responsiveWidth('4.8%'),
    letterSpacing: -0.02,
    textAlign: 'right',
    alignSelf: 'flex-end',
    marginBottom: responsiveWidth('2%'),
    marginTop: responsiveWidth('1%'),
  },
  error: {
    color: 'red',
    fontSize: responsiveWidth('3%'),
    marginBottom: responsiveWidth('2.5%'),
  },
  scrollViewContent: {
    // flex: 1,
    // flexGrow: 1, // Ensures content is stretched and centered
    // padding: responsiveWidth('3%'),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Login;
