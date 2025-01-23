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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color, fontSize, responsiveWidth} from '../../constant/theme';
import {Header} from '../../components';
import {StepCounter} from './components/stepCounter';
import BasicInfo from './steps/basicInfo';
import ScheduleInfo from './steps/schedule';
import SelectTemplet from './steps/selectTemplet';
import PreviewReminder from './steps/previewReminder';
import http from '../../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReminderFormData {
  reminder_name: string;
  customer_id: number | null;
  template_id: number | null;
  variables: Array<{name: string; value: string}>;
  reminder_type: 'one_Time' | 'recurring';
  reminder_date?: string;
  reminder_time: string;
  recurring_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  stopping_date?: string;
  day_of_month?: number;
  month_of_year?: number;
}

interface ScheduleInfoProps {
  reminder_type: 'one_Time' | 'recurring';
  reminder_date?: string;
  reminder_time: string;
  stopping_date?: string;
  day_of_month?: number;
  month_of_year?: number;
  recurring_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const AddReminder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<ReminderFormData>({
    reminder_name: '',
    customer_id: null,
    template_id: null,
    variables: [],
    reminder_type: 'one_Time',
    reminder_time: '',
  });
  const [scheduleData, setScheduleData] = useState<any>(null);

  const handleBasicInfoSubmit = (data: { reminder_name: string; customer_id: number }) => {
    setFormData(prev => ({
      ...prev,
      reminder_name: data.reminder_name,
      customer_id: data.customer_id,
    }));
    setCurrentStep(2);
  };

  const handleTemplateSelect = (templateId: number, variables: Array<{name: string; value: string}>) => {
    setFormData(prev => ({
      ...prev,
      template_id: templateId,
      variables: variables,
    }));
    setCurrentStep(3);
  };

  const handleScheduleSubmit = (scheduleData: {
    reminder_type: 'one_Time' | 'recurring';
    reminder_date?: string;
    reminder_time: string;
    stopping_date?: string;
    day_of_month?: number;
    month_of_year?: number;
  }) => {
    setFormData(prev => ({
      ...prev,
      ...scheduleData
    }));
    setShowPreview(true);
  };

  const handleFinalSubmit = async () => {
    if (!formData.customer_id || !formData.template_id || !formData.reminder_time) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('USER_TOKEN');
      
      if (!token) {
        Alert.alert('Error', 'You are not logged in. Please login again.');
        return;
      }

      const response = await http.post('/reminder/add-reminder', {
        reminder_name: formData.reminder_name,
        customer_id: formData.customer_id,
        template_id: formData.template_id,
        variables: formData.variables,
        reminder_type: formData.reminder_type,
        reminder_date: formData.reminder_date,
        reminder_time: formData.reminder_time,
        ...(formData.reminder_type === 'recurring' && {
          recurring_type: formData.recurring_type,
          stopping_date: formData.stopping_date,
          day_of_month: formData.day_of_month,
          month_of_year: formData.month_of_year,
        }),
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      Alert.alert('Success', 'Reminder created successfully!');
      // Reset form and navigate back
      setFormData({
        reminder_name: '',
        customer_id: null,
        template_id: null,
        variables: [],
        reminder_type: 'one_Time',
        reminder_time: '',
      });
      setCurrentStep(1);
    } catch (error: any) {
      console.error('Error creating reminder:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        Alert.alert('Error', 'Your session has expired. Please login again.');
        return;
      }
      
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to create reminder. Please try again.'
      );
    }
    setShowPreview(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header 
        title="Add Reminder" 
        showBack={true} 
        rightIcon={null}
        rightIconContainerStyle={undefined}
        rightIconStyle={undefined}
        onPress={undefined}
      />

      {/* Progress Steps */}
      <StepCounter currentStep={currentStep} />

      {/* step 1 Container */}
      {currentStep == 1 && (
        <BasicInfo 
          onPressNext={handleBasicInfoSubmit}
          initialData={{
            reminder_name: formData.reminder_name,
            customer_id: formData.customer_id,
          }}
        />
      )}

      {/* Select Templet */}
      {currentStep == 2 && (
        <SelectTemplet
          onPressBack={() => setCurrentStep(1)}
          onPressSave={handleTemplateSelect}
          selectedTemplateId={formData.template_id}
        />
      )}

      {/* step 3 Container */}
      {currentStep == 3 && (
        <ScheduleInfo
          onPressBack={() => setCurrentStep(2)}
          onPressPreview={() => setShowPreview(true)}
          onSubmit={handleScheduleSubmit}
          initialData={{
            reminder_type: formData.reminder_type,
            reminder_date: formData.reminder_date,
            reminder_time: formData.reminder_time,
            stopping_date: formData.stopping_date,
            day_of_month: formData.day_of_month,
            month_of_year: formData.month_of_year,
            recurring_type: formData.recurring_type,
          } as ScheduleInfoProps}
        />
      )}
      <PreviewReminder
        data={{...formData, ...scheduleData}}
        onPressConfirm={handleFinalSubmit}
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
