import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {color, fontSize, responsiveWidth} from '../../../constant/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const BasicInfo = ({onPressNext}) => {
  return (
    <View style={{flex: 1}}>
      {/* Form Container */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Personal Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Reminder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Customer Birthday"
            placeholderTextColor="#000000"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Customer Name</Text>
          <View style={styles.customerInputContainer}>
            <TextInput
              style={styles.customerInput}
              placeholder="Mahi Patel"
              placeholderTextColor="#000000"
            />
            <TouchableOpacity>
              <Icon
                name="chevron-down"
                size={responsiveWidth(5)}
                color={color.grayText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userIcon}>
              <Icon
                name="person-outline"
                size={responsiveWidth(6)}
                color={color.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => onPressNext()}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BasicInfo;

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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: responsiveWidth(4),
    backgroundColor: color.primaryBackground,
  },
  nextButton: {
    backgroundColor: color.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
