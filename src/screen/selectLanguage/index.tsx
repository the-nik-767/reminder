// HomeScreen.tsx

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { color, fontSize, responsiveWidth } from '../../constant/theme';
import { useNavigation } from '@react-navigation/native';

import Bigball from '../../assets/svgs/bigball.svg';
import IcBall from '../../assets/svgs/icBall.svg';
import Bg from '../../assets/svgs/bg.svg';
import Eng from '../../assets/svgs/eng.svg';
import hi from '../../assets/svgs/hi.svg';
import guj from '../../assets/svgs/guj.svg';



const SelectLanguage = () => {
  const navigation = useNavigation();

  const languages = [
    {name: 'English', icon: Eng},
    {name: 'हिन्दी', icon: hi},
    {name: 'ગુજરાતી', icon: guj},
  ];

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
        <View style={styles.languageContainerMain}>
          <Text style={styles.languageTitle}>Select Language</Text>
          <View style={styles.languageContainerinder}>
            {languages.map(({name, icon: Icon}) => (
              <View style={styles.languageContainer} key={name}>
                <View style={styles.languageTextContainer}>
                  <View style={styles.languageIconContainer}>
                    <Icon width={30} height={30} />
                  </View>
                  <Text style={styles.languageText}>{name}</Text>
                  <Text>{' '}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.languageContainerinder}>  
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={styles.languageButton}>
              <Text  style={styles.languageButtonText}>Next</Text>
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
  textContainer: {
    flexDirection: 'row',
  },
  mainContainer: {
    margin: responsiveWidth('5%'),
    flex: 1,
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
    padding: responsiveWidth('3%'),
    borderRadius: responsiveWidth('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveWidth('7%'),
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: color.white,
  },
  languageContainerMain: {
    marginTop: responsiveWidth('10%'),
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
    fontSize: 26,
    fontWeight: '700',
    margin: responsiveWidth('1%'),
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
});

export default SelectLanguage;
