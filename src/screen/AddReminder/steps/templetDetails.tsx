import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../../constant/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons} from '../../../assets';
import {templetDetails} from '../../../constant/global';

const TempletDetails = ({onPressBack, onPressSave}) => {
  return (
    <View style={{flex: 1}}>
      {/* Form Container */}
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.formCard}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.formTitle}>{'Selected templet'}</Text>
              <Image source={icons.icCloseThin} style={styles.closeIconStyle} />
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.cardSubContainer}>
                <Text>{templetDetails?.message}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>
              {templetDetails?.templateDisaplyName}
            </Text>
          </View>

          <View style={{paddingHorizontal: responsiveWidth(4)}}>
            {templetDetails?.variables?.map((i, index) => {
              return (
                <View key={index.toString()}>
                  <Text style={styles.inputTitle}>{i.displayName}</Text>
                  <TextInput style={styles.inputStyle} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => onPressBack()}>
          <Text style={styles.nextButtonText}>Cancel</Text>
        </TouchableOpacity>
        <View style={{flex: 0.1}} />
        <TouchableOpacity
          style={[styles.nextButton, {backgroundColor: color.primary}]}
          onPress={() => onPressSave()}>
          <Text style={[styles.nextButtonText, {color: color.white}]}>
            {'Save & Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TempletDetails;

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: responsiveWidth(4),
    padding: responsiveWidth(4),
    marginBottom: responsiveWidth(5),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  formTitle: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginBottom: responsiveWidth(0),
  },
  cardTitle: {
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    marginBottom: responsiveWidth(0),
    color: color.grayText,
  },

  bottomContainer: {
    padding: responsiveWidth(4),
    backgroundColor: color.primaryBackground,
    flexDirection: 'row',
  },
  nextButton: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: responsiveWidth(4),
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
    borderWidth: 1,
    borderColor: color.primary,
    flex: 1,
  },
  nextButtonText: {
    color: color.primary,
    fontSize: fontSize.regular,
    fontWeight: '600',
    fontFamily: fontFamily.regular,
  },

  cardContainer: {
    backgroundColor: '#e2ded7',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveWidth(4),
    paddingBottom: responsiveWidth(6),
    marginBottom: responsiveWidth(3),
  },
  cardSubContainer: {
    borderRadius: 8,
    backgroundColor: color.white,
    paddingHorizontal: responsiveWidth(2),
    paddingTop: responsiveWidth(3),
    paddingBottom: responsiveWidth(4),
  },

  closeIconStyle: {
    height: responsiveWidth(7),
    width: responsiveWidth(7),
    resizeMode: 'contain',
    tintColor: color.primary,
  },
  inputTitle: {
    fontSize: fontSize.xsmall,
    fontFamily: fontFamily.regular,
    color: color.grayText,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: color.border,
    marginBottom: responsiveWidth(3),
    marginTop: responsiveWidth(1.5),
    backgroundColor: color.white,
    borderRadius: 6,
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveWidth(2),
    fontSize: fontSize.regularx,
  },
});
