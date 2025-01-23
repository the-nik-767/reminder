import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../constant/theme';
import {Header} from '../../components';
import {customerService} from '../../services/customer/customer.service';

const {width} = Dimensions.get('window');

const AddNewCustomer = ({navigation}) => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      // Format date as DD/MM/YYYY for display
      const formattedDate = selectedDate.toLocaleDateString('en-GB');
      setDateOfBirth(formattedDate);
    }
  };

  const handleSubmit = async () => {
    if (!customerName || !email || !phone || !dateOfBirth) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      setLoading(true);
      // Convert date to YYYY-MM-DD format for API
      const apiDateFormat = date.toISOString().split('T')[0];
      
      const response = await customerService.addCustomer({
        customer_name: customerName,
        email: email,
        phone: phone,
        date_of_birth: apiDateFormat,
      });

      Alert.alert('Success', 'Customer added successfully');
      navigation.navigate('CustomerDetails', {
        customerData: response,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add customer. Please try again.';
      Alert.alert('Error', errorMessage);
      console.error('Error adding customer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header showBack title="Add New Customer" />
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              placeholderTextColor="#8C8C8C"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8C8C8C"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#8C8C8C"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}>
              <Text
                style={[
                  styles.dateText,
                  !dateOfBirth && styles.placeholderText,
                ]}>
                {dateOfBirth || 'Date of Birth'}
              </Text>
              <Icon name="calendar" size={20} color="#8C8C8C" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity
        style={[styles.bottomButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF5FF',
  },
  formContainer: {
    marginHorizontal: responsiveWidth(4),
    backgroundColor: color.white,
    borderRadius: 10,
    padding: responsiveWidth(4),
  },
  inputContainer: {
    marginVertical: responsiveWidth(2.5),
    borderWidth: 1,
    borderColor: '#D5D8D5',
    borderRadius: 10,
    height: responsiveWidth(14),
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
    color: '#171717',
    fontSize: fontSize.regularx,
    height: '100%',
  },
  bottomButton: {
    position: 'absolute',
    bottom: responsiveWidth(5),
    left: responsiveWidth(5),
    right: responsiveWidth(5),
    backgroundColor: color.primary,
    paddingVertical: responsiveWidth(4),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    fontWeight: '500',
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
    height: '100%',
  },
  dateText: {
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    color: '#171717',
  },
  placeholderText: {
    color: '#8C8C8C',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default AddNewCustomer;
