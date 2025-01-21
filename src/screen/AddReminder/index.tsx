import React, {useState} from 'react';
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
import BasicInfo from './steps/basicInfo';
import ScheduleInfo from './steps/schedule';
import SelectTemplet from './steps/selectTemplet';
import PreviewReminder from './steps/previewReminder';

const AddReminder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Add Reminder" showBack />

      {/* Progress Steps */}
      <StepCounter currentStep={currentStep} />

      {/* step 1 Container */}
      {currentStep == 1 && <BasicInfo onPressNext={() => setCurrentStep(2)} />}

      {/* Select Templet */}
      {currentStep == 2 && (
        <SelectTemplet
          onPressBack={() => setCurrentStep(1)}
          onPressSave={() => setCurrentStep(3)}
        />
      )}

      {/* step 3 Container */}
      {currentStep == 3 && (
        <ScheduleInfo
          onPressBack={() => {
            setCurrentStep(2);
          }}
          onPressPreview={() => {
            setShowPreview(true);
          }}
        />
      )}
      <PreviewReminder
        onPressConfirm={() => {
          setShowPreview(false);
        }}
        onPressClose={() => {
          setShowPreview(false);
        }}
        visible={showPreview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBackground,
  },
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

export default AddReminder;
