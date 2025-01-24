import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {color, fontSize, responsiveWidth} from '../../../constant/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {customerService} from '../../../services/customer/customer.service';
import {useFocusEffect} from '@react-navigation/native';

interface Customer {
  id: number;
  customer_name: string;
}

interface BasicInfoProps {
  onPressNext: (data: {reminder_name: string; customer_id: number}) => void;
  initialData?: {
    reminder_name: string;
    customer_id: number | null;
  };
}

const BasicInfo: React.FC<BasicInfoProps> = ({onPressNext, initialData}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [reminderName, setReminderName] = useState(
    initialData?.reminder_name || '',
  );
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    reminderName: '',
    customer: '',
  });

  const handleOpen = () => {
    Keyboard.dismiss(); // Dismiss keyboard when dropdown opens
    setOpen(true);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, []),
  );

  const fetchCustomers = async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data as unknown as Customer[]);

      // If we have an initial customer_id, find and set the customer
      if (initialData?.customer_id) {
        const customer = data.find(
          c => Number(c.id) === initialData.customer_id,
        );
        if (customer) {
          setSelectedCustomer(customer as unknown as Customer);
        }
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      Alert.alert('Error', 'Failed to load customers. Please try again.');
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      reminderName: '',
      customer: '',
    };

    if (!reminderName.trim()) {
      newErrors.reminderName = 'Reminder name is required';
      isValid = false;
    }

    if (!selectedCustomer) {
      newErrors.customer = 'Please select a customer';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validate()) {
      onPressNext({
        reminder_name: reminderName.trim(),
        customer_id: selectedCustomer!.id,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Form Container */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Personal Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Reminder Name</Text>
          <TextInput
            style={[
              styles.input,
              errors.reminderName ? styles.inputError : null,
            ]}
            placeholder="Customer Birthday"
            placeholderTextColor="#999999"
            value={reminderName}
            onChangeText={text => {
              setReminderName(text);
              if (errors.reminderName) {
                setErrors(prev => ({...prev, reminderName: ''}));
              }
            }}
          />
          {errors.reminderName ? (
            <Text style={styles.errorText}>{errors.reminderName}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Customer Name</Text>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              value={selectedCustomer?.id || null}
              items={customers.map(customer => ({
                label: customer.customer_name,
                value: customer.id,
              }))}
              setOpen={setOpen}
              onOpen={() => {
                Keyboard.dismiss();
              }}
              setValue={callback => {
                const value = callback(selectedCustomer?.id || null);
                const customer = customers.find(c => c.id === value);
                setSelectedCustomer(customer || null);
                if (errors.customer) {
                  setErrors(prev => ({...prev, customer: ''}));
                }
              }}
              style={[
                styles.dropdown,
                errors.customer ? styles.inputError : null,
              ]}
              dropDownContainerStyle={styles.dropdownList}
              placeholder="Select Customer"
              placeholderStyle={{color: color.gray}}
              listMode="SCROLLVIEW"
              zIndex={3000}
            />
          </View>
          {errors.customer ? (
            <Text style={styles.errorText}>{errors.customer}</Text>
          ) : null}
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            (!reminderName.trim() || !selectedCustomer) &&
              styles.nextButtonDisabled,
          ]}
          onPress={handleNext}>
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
  dropdownContainer: {
    zIndex: 3000,
    width: '100%',
  },
  dropdown: {
    borderColor: '#E5E5EA',
    borderRadius: 10,
    height: responsiveWidth(12),
    backgroundColor: '#FFFFFF',
  },
  dropdownList: {
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
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
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: fontSize.small,
    marginTop: 4,
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
});
