// HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Alert, Keyboard} from 'react-native';
import { color, fontSize, responsiveWidth } from '../../constant/theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import serviceFactory from '../../services/serviceFactory';
import UserService from '../../services/user/user.service';
import { InputBox } from '../../components/common/inputBox';
import { Loader } from '../../components/common/loader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Halfbg from '../../assets/svgs/halfbg.svg';
import IcBall from '../../assets/svgs/icBall.svg';
import Bg from '../../assets/svgs/bg.svg';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';

type RootStackParamList = {
  OTPVerification: {
    userData: any;
  };
  Login: undefined;
};

// Update navigation type
type NavigationType = NavigationProp<RootStackParamList> & {
  replace(name: keyof RootStackParamList, params?: any): void;
};

// Validation schema for formik

const Register = () => {
    const navigation = useNavigation<NavigationType>();
    const [showPassword, setShowPassword] = useState(false);
    const userService = serviceFactory.get<UserService>('UserService');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [businessCategories] = useState([
        { label: 'Select Business Category', value: '' },
        { label: 'Retail', value: 'retail' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Technology', value: 'technology' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Education', value: 'education' },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = React.useRef<ScrollView>(null);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

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
                scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date: Date) => {
        formik.setFieldValue('dob', date.toISOString().split('T')[0]);
        hideDatePicker();
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            dob: '',
            gender: '',
            businessCategory: '',
            business_category_id: 1
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Full name is required'),
            email: Yup.string()
                .required('Email address is required')
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    'Please enter a valid email address'
                )
                .max(255, 'Email is too long')
                .test('domain-check', 'Please use a valid email domain', (value) => {
                    if (!value) return false;
                    const domain = value.split('@')[1];
                    // Add common domains you want to block
                    const blockedDomains = ['tempmail.com', 'throwaway.com'];
                    return !blockedDomains.includes(domain);
                }),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
            dob: Yup.string().required('Date of birth is required'),
            businessCategory: Yup.string().required('Business category is required'),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
                .required('Phone number is required'),
            confirmPassword: Yup.string()
                .required('Please confirm your password')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            try {
                console.log('Register values:', values);
                setIsLoading(true);

                const registerData = {
                    name: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    date_of_birth: values.dob,
                    business_category_id: values.business_category_id,
                    password: values.password,
                    language: "en",
                    profile_image: ""
                };

                const response = await userService.register(registerData);
                
                console.log('response---2', response);
                
                if (response.id) {
                    navigation.replace('OTPVerification', {
                      userData: response,
                    });
                } else {
                    Alert.alert('Error', 'Registration failed. Please check your internet connection and try again.');
                }
            } catch (error: any) {
                console.error('Registration error:', error);
                let errorMessage = 'Registration failed. Please try again.';
                
                if (error.code === 'ECONNABORTED') {
                    errorMessage = 'Request timed out. Please check your internet connection and try again.';
                } else if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                }
                
                Alert.alert('Error', errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollViewContent,
            keyboardVisible && { paddingBottom: responsiveWidth(50) }
          ]}
          keyboardShouldPersistTaps="handled">
          <View style={styles.ballContainer}>
            <Halfbg />
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.textContainer}>
              <View style={styles.iconContainer}>
                <IcBall width={30} height={30} />
              </View>
              <Text style={styles.text}>Reminder</Text>
            </View>

            <View style={styles.languageContainerMain}>
              <Text style={styles.languageTitle}>Register</Text>

              {/* Full Name Input */}
              <InputBox
                title="Full Name"
                inputboxContainer={styles.input}
                value={formik.values.fullName}
                onChangeText={formik.handleChange('fullName')}
                onBlur={formik.handleBlur('fullName')}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <Text style={styles.error}>{formik.errors.fullName}</Text>
              ) : null}

              {/* Email Input */}
              <InputBox
                title="Email"
                inputboxContainer={styles.input}
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <Text style={styles.error}>{formik.errors.email}</Text>
              ) : null}

              {/* Phone Input */}
              <InputBox
                title="Phone Number"
                inputboxContainer={styles.input}
                keyboardType="phone-pad"
                value={formik.values.phone}
                onChangeText={formik.handleChange('phone')}
                onBlur={formik.handleBlur('phone')}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Text style={styles.error}>{formik.errors.phone}</Text>
              ) : null}

              {/* DOB Input */}
              <TouchableOpacity onPress={showDatePicker} activeOpacity={0.7}>
                  <View style={styles.dateInputContainer}>
                      <InputBox
                          title="Date of Birth"
                          inputboxContainer={[styles.input, styles.dateInput]}
                          value={formik.values.dob}
                          editable={false}
                          placeholder="DD-MM-YYYY"
                      />
                      <MaterialIcons 
                          name="calendar-today" 
                          size={20} 
                          color={color.gray}
                          style={styles.calendarIcon}
                      />
                  </View>
              </TouchableOpacity>
              {formik.touched.dob && formik.errors.dob ? (
                  <Text style={styles.error}>{formik.errors.dob}</Text>
              ) : null}

              {/* Business Category Dropdown */}
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={open}
                  value={formik.values.businessCategory}
                  items={businessCategories}
                  setOpen={setOpen}
                  setValue={callback => {
                    const value = callback(formik.values.businessCategory);
                    formik.setFieldValue('businessCategory', value);
                  }}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownList}
                  placeholder="Select Business Category"
                  placeholderStyle={{color: color.gray}}
                  listMode="SCROLLVIEW"
                  zIndex={3000}
                />
              </View>
              {formik.touched.businessCategory &&
              formik.errors.businessCategory ? (
                <Text style={styles.error}>
                  {formik.errors.businessCategory}
                </Text>
              ) : null}

              {/* Password Input */}
              <InputBox
                title="Password"
                inputboxContainer={styles.input}
                secureTextEntry={!showPassword}
                showEyeIcon
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <Text style={styles.error}>{formik.errors.password}</Text>
              ) : null}

              {/* Confirm Password Input */}
              <InputBox
                title="Confirm Password"
                inputboxContainer={styles.input}
                secureTextEntry={!showPassword}
                showEyeIcon
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
                onBlur={formik.handleBlur('confirmPassword')}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <Text style={styles.error}>
                  {formik.errors.confirmPassword}
                </Text>
              ) : null}

              <View style={styles.languageContainerinder}>
                <TouchableOpacity
                  onPress={formik.handleSubmit}
                  disabled={formik.isSubmitting || formik.isLoading}
                  style={[
                    styles.languageButton,
                    formik.isSubmitting || (formik.isLoading && {opacity: 0.7}),
                  ]}>
                  <Text style={styles.languageButtonText}>
                    {formik.isSubmitting || formik.isLoading
                      ? 'Registering...'
                      : 'Register'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.registerContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[
          styles.bottomFixedContainer,
          keyboardVisible && { marginBottom: responsiveWidth(10) }
        ]}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: responsiveWidth(35),
    },
    ballContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: responsiveWidth(10),
    },
    mainContainer: {
        paddingHorizontal: responsiveWidth(5),
        flex: 1,
        width: '100%',
    },
    iconContainer: {
        marginRight: responsiveWidth('1%'),
    },
    bottomContainer: {
        marginTop: responsiveWidth('10%'),
        justifyContent: 'flex-end',
    },
    languageButton: {
        backgroundColor: color.primary,
        padding: responsiveWidth(3),
        borderRadius: responsiveWidth(2),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: responsiveWidth(2),
    },
    languageButtonText: {
        fontSize: responsiveWidth(4),
        fontWeight: '600',
        color: color.white,
    },
    languageContainerMain: {
        marginTop: responsiveWidth('5%'),
        gap: responsiveWidth(4),
    },
    languageContainer: {
        marginTop: responsiveWidth('5%'),
    },
    languageContainerinder: {
        marginTop: responsiveWidth('1%'),
    },
    languageText: {
        fontSize: fontSize.smallx,
        fontWeight: '500',
        margin: responsiveWidth('1%'),
    },
    languageTitle: {
        fontFamily: 'Inter',
        fontSize: responsiveWidth(6.5),
        fontWeight: '700',
        lineHeight: responsiveWidth(7.8),
        letterSpacing: -0.02,
        textAlign: 'left',
        margin: responsiveWidth('2%'),
    },
    text: {
        fontSize: 24,
        fontWeight: '500',
        marginLeft: responsiveWidth('1%'),
    },
    languageIconContainer: {
        margin: responsiveWidth('1%'),
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
        minHeight: responsiveWidth(12),
        borderColor: color.lightgray,
        borderWidth: 1,
        borderRadius: responsiveWidth(2),
        paddingHorizontal: responsiveWidth(2),
        marginTop: responsiveWidth(0),
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? responsiveWidth(2) : 0,
    },
    loginText: {
        fontFamily: 'Inter',
        fontSize: responsiveWidth(4),
        fontWeight: '400',
        lineHeight: responsiveWidth(4.8),
        letterSpacing: -0.02,
        textAlign: 'center',
        color: color.gray,
    },
    linkText: {
        fontFamily: 'Inter',
        fontSize: responsiveWidth(4),
        fontWeight: '500',
        lineHeight: responsiveWidth(4.8),
        letterSpacing: -0.02,
        textAlign: 'center',
        color: color.primary,
        marginLeft: responsiveWidth('1%'),
    },
    fPassword: {
        color: color.primary,
        fontWeight: '700',
        alignSelf: 'flex-end',
        marginBottom: responsiveWidth('4%'),
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: -responsiveWidth(3),
        marginBottom: -responsiveWidth(1),
        marginLeft: responsiveWidth(2),
        zIndex: 1000,
    },
    pickerContainer: {
        marginBottom: responsiveWidth('3%'),
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: color.lightgray,
        borderRadius: responsiveWidth('2%'),
        marginTop: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: 'transparent',
    },
    inputTitle: {
        fontSize: 14,
        color: color.black,
        marginBottom: 5,
    },
    dropdownContainer: {
       
        zIndex: 3000,
        width: '100%',
  
    },
    dropdown: {
        borderColor: color.lightgray,
        borderRadius: responsiveWidth(2),
        marginTop: responsiveWidth(1),
        height: responsiveWidth(12),
        backgroundColor: 'transparent',
        zIndex: 3000,
    },
    dropdownList: {
        borderColor: color.lightgray,
        backgroundColor: color.white,
        zIndex: 2000,
    },
    bottomFixedContainer: {
        // backgroundColor: color.white,
        // paddingHorizontal: responsiveWidth(5),
        // paddingVertical: responsiveWidth(3),
        // borderTopWidth: 1,
        // borderTopColor: color.lightgray,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
        // elevation: 5,
    },
    dateInputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateInput: {
        flex: 1,
        paddingRight: responsiveWidth(10), // Space for icon
    },
    calendarIcon: {
        position: 'absolute',
        right: responsiveWidth(3),
        top: '50%',
        transform: [{ translateY: -10 }],
    }
});

export default Register;
