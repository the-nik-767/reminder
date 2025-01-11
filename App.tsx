import React, {useEffect} from 'react';
import {View, LogBox} from 'react-native';
import {color} from './src/constant/theme';
import MainNavigator from './src/routes/navigation';
import {enableScreens} from 'react-native-screens';
import {useRecoilState} from 'recoil';
import globalState from './src/state/globalState';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

// Enable optimized screens
enableScreens();

// Ignore specific logs
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  // UseEffect to handle side effects
  const {i18n} = useTranslation(); // t is the function to get translations

  const [keyState] = useRecoilState(globalState.keyState);

  useEffect(() => {
    const checkUserData = async () => {
      const jsonValue = await AsyncStorage.getItem('USER_DATA');
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;

      console.log('====================================');
      console.log('data====>88', data.user);
      console.log('====================================');
      i18n.changeLanguage(data?.user?.languageDetails?.languageCode);
    };

    checkUserData();
  }, []);

  return (
    <View key={keyState} style={{flex: 1, backgroundColor: color.white}}>
      <MainNavigator />
      <Toast />
    </View>
  );
};

export default App;
