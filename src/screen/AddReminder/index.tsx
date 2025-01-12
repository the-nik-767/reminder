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

const AddReminder = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Reminder</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.stepWrapper}>
          <View style={[styles.stepCircle, styles.activeStep]}>
            <Icon name="checkmark" size={20} color="#FFFFFF" />
          </View>
          <Text style={[styles.stepText, styles.activeStepText]}>Basic Info</Text>
        </View>

        <View style={styles.progressLine} />

        <View style={styles.stepWrapper}>
          <View style={styles.stepCircle}>
            <View style={styles.inactiveCircle} />
          </View>
          <Text style={styles.stepText}>Select Templet</Text>
        </View>

        <View style={styles.progressLine} />

        <View style={styles.stepWrapper}>
          <View style={styles.stepCircle}>
            <View style={styles.inactiveCircle} />
          </View>
          <Text style={styles.stepText}>Schedule</Text>
        </View>
      </View>

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
              <Icon name="chevron-down" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userIcon}>
              <Icon name="person-outline" size={24} color="#007AFF" />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
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
    fontSize: 16,
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
    backgroundColor: '#007AFF',
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
