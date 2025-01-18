import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../../constant/theme';

const StepCounter = ({currentStep}: any) => {
  return (
    <View>
      <View style={styles.progressContainer}>
        <View style={styles.stepWrapper}>
          <View
            style={[styles.stepCircle, currentStep >= 1 && styles.activeStep]}>
            {currentStep >= 1 && (
              <Icon
                name="checkmark"
                size={responsiveWidth(5)}
                color={color.primaryGreen}
              />
            )}
          </View>
        </View>

        <View
          style={[
            styles.progressLine,
            {
              borderColor:
                currentStep >= 2 ? color.primaryGreen : color.grayText,
            },
          ]}
        />

        <View style={styles.stepWrapper}>
          <View
            style={[styles.stepCircle, currentStep >= 2 && styles.activeStep]}>
            {currentStep >= 2 && (
              <Icon
                name="checkmark"
                size={responsiveWidth(5)}
                color={color.primaryGreen}
              />
            )}
          </View>
        </View>

        <View
          style={[
            styles.progressLine,
            {
              borderColor:
                currentStep >= 3 ? color.primaryGreen : color.grayText,
            },
          ]}
        />

        <View style={styles.stepWrapper}>
          <View
            style={[styles.stepCircle, currentStep >= 3 && styles.activeStep]}>
            {currentStep >= 3 && (
              <Icon
                name="checkmark"
                size={responsiveWidth(5)}
                color={color.primaryGreen}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.subTextContainer}>
        <Text
          style={[styles.stepText, currentStep >= 1 && styles.activeStepText]}>
          {'Basic Info'}
        </Text>
        <Text
          style={[styles.stepText, currentStep >= 2 && styles.activeStepText]}>
          Select Templet
        </Text>
        <Text
          style={[styles.stepText, currentStep >= 3 && styles.activeStepText]}>
          Schedule
        </Text>
      </View>
    </View>
  );
};

export {StepCounter};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(6),
    marginTop: 8,
    marginHorizontal: responsiveWidth(6.5),
    // marginBottom: 24,
  },
  stepWrapper: {
    alignItems: 'center',
  },
  stepCircle: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    borderRadius: responsiveWidth(4),
    borderWidth: 1,
    borderColor: color.grayText,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeStep: {
    borderColor: color.primaryGreen,
  },
  inactiveCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5EA',
  },
  stepText: {
    fontSize: fontSize.minix,
    color: color.grayText,
    fontFamily: fontFamily.regular,
  },
  activeStepText: {
    color: color.black,
    fontWeight: '500',
    fontFamily: fontFamily.regular,
  },
  progressLine: {
    flex: 1,
    // height: 1,
    borderColor: color.grayText,
    marginHorizontal: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
    top: -5,
  },
  subTextContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(8.5),
    marginBottom: responsiveWidth(2.5),
  },
});
