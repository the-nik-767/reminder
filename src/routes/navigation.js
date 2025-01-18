import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/home';
import SplashScreen from '../screen/splashscreen';
import SelectLanguage from '../screen/selectLanguage';
import Login from '../screen/login';
import Register from '../screen/register';
import OTPVerification from '../screen/OTPVerification';
import ForgotPassword from '../screen/ForgotPassword';
import ResetPassword from '../screen/ResetPassword';
import AddNewCustomer from '../screen/AddNewCustomer';
import {
  color,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from '../constant/theme';
import {Image, StyleSheet, Text, View} from 'react-native';
import ProfileScreen from '../screen/Profile';
import {icons} from '../assets';
import CustomerScreen from '../screen/Customer';
import ReminderScreen from '../screen/Reminder';
import Home from '../assets/svgs/home.svg';
import Practice from '../assets/svgs/people.svg';
import Reminder from '../assets/svgs/notification.svg';
import Profile from '../assets/svgs/profile.svg';
import CustomerDetails from '../screen/CustomerDetails';
import ReminderDetails from '../screen/ReminderDetails';
import AddReminder from '../screen/AddReminder';
import ProfileEdit from '../screen/ProfileEdit';
import NotificationScreen from '../screen/Notifications';
import ResetNewPassword from '../screen/ResetNewPassword';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* Existing screens */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={MyTabs} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="AddNewCustomer" component={AddNewCustomer} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CustomerScreen" component={CustomerScreen} />
        <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
        <Stack.Screen name="ReminderDetails" component={ReminderDetails} />
        <Stack.Screen name="AddReminder" component={AddReminder} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="ResetNewPassword" component={ResetNewPassword} />
        {/* Add more screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTabs() {
  const bottom = useSafeAreaInsets().bottom;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: color.primary,
          height: responsiveWidth('12%') + bottom,
          paddingBottom: 0,
          // ...styles.shadow,
          borderColor: color.primary,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItemContainer}>
              <Image
                source={focused ? icons.icHomeActive : icons.icHome}
                style={[styles.iconStyle]}
              />
              <Text style={styles.tabLabel}>Home</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CustomerScreen"
        component={CustomerScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItemContainer}>
              <Practice
                width={responsiveWidth(6)}
                height={responsiveWidth(6)}
                fill={focused ? color.white : 'none'}
                stroke={focused ? color.white : color.gray}
              />
              <Text style={styles.tabLabel}>Customer</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ReminderScreen"
        component={ReminderScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItemContainer}>
              <Reminder
                width={responsiveWidth(6)}
                height={responsiveWidth(6)}
                fill={focused ? color.white : 'none'}
                stroke={focused ? color.white : color.gray}
              />
              <Text style={styles.tabLabel}>Reminder</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItemContainer}>
              <Image
                source={focused ? icons.icUserActive : icons.icUser}
                style={[styles.iconStyle]}
              />
              <Text style={styles.tabLabel}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: fontSize.xsmall,
    marginTop: 4,
    textAlign: 'center',
    width: responsiveWidth('20%'),
    color: color.white,
  },
  iconStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
});

export default MainNavigator;
