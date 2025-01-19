import {
  Platform,
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

const SelectTemplet = ({onPressBack}) => {
  return (
    <View style={{flex: 1}}>
      {/* Form Container */}
      <View style={{flex: 1}}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{'Selected templet'}</Text>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => onPressBack()}>
          <Text style={styles.nextButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectTemplet;

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: responsiveWidth(4),
    padding: responsiveWidth(4),
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
    marginBottom: responsiveWidth(4),
  },
  inputGroup: {
    marginBottom: responsiveWidth(5),
  },
  inputLabel: {
    fontSize: fontSize.regularx,
    color: color.grayText,
    marginBottom: responsiveWidth(2),
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: responsiveWidth(4),
    fontSize: fontSize.regularx,
  },
  customerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    paddingRight: 8,
  },
  customerInput: {
    flex: 1,
    padding: responsiveWidth(4),
    fontSize: fontSize.regularx,
  },
  userIcon: {
    marginLeft: 8,
    padding: 4,
  },
  bottomContainer: {
    padding: responsiveWidth(4),
    backgroundColor: color.primaryBackground,
  },
  nextButton: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: responsiveWidth(4),
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
    borderWidth: 1,
    borderColor: color.primary,
  },
  nextButtonText: {
    color: color.primary,
    fontSize: fontSize.regular,
    fontWeight: '600',
    fontFamily: fontFamily.regular,
  },
});
