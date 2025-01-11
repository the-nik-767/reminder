import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import { NavigationProp, StackActions } from '@react-navigation/native';

import {color, fontSize, responsiveWidth} from '../../constant/theme';
import {icons} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from '../../assets/svgs/icBall.svg';
// import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  Login: undefined;
  HomeScreen: undefined;
};

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // const { i18n } = useTranslation();  // t is the function to get translations

  // const currentLanguage = i18n.language;

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('USER_TOKEN');
        
        if (token) {
          navigation.dispatch(StackActions.replace('HomeScreen'));
        } else {
          navigation.dispatch(StackActions.replace('Login'));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        navigation.dispatch(StackActions.replace('Login'));
      }
    };

    checkUserData();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon width={100} height={100} />
      <Text style={{fontSize: fontSize.xxbigger, color: color.white, fontWeight: "500"}}>Reminder</Text>
    </View>
  );
};

const style = StyleSheet.create({
  SplashScreenPicContainer: {
    height: responsiveWidth('25%'),
    width: responsiveWidth('25%'),
    resizeMode: 'contain',
    // transform: [{ rotate: "340deg" }],
  },
});

export default SplashScreen;
