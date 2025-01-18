import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color, fontSize, responsiveWidth} from '../../constant/theme';
import {Header} from '../../components';
import {StepCounter} from './components/stepCounter';

const AddReminder = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Add Reminder" showBack />

      {/* Progress Steps */}
      <StepCounter currentStep={1} />

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
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 8,
  },
  headerRight: {
    width: 32,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
  },
  stepWrapper: {
    alignItems: 'center',
    width: 80,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  inactiveCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5EA',
  },
  stepText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  activeStepText: {
    color: '#000000',
    fontWeight: '500',
  },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 4,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
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
    padding: 16,
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
    padding: 16,
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
    padding: 16,
    backgroundColor: '#F2F2F7',
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

export default AddReminder;
