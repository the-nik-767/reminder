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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color, responsiveWidth } from '../../constant/theme';

const { width } = Dimensions.get('window');

const AddNewCustomer = ({ navigation }) => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState('');

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      // Format date as DD/MM/YYYY
      const formattedDate = selectedDate.toLocaleDateString('en-GB');
      setDateOfBirth(formattedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="chevron-left" size={24} color="#0047AF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add New Customer</Text>
        </View>

        {/* Main Form Container */}
        <View style={styles.formContainer}>
          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              placeholderTextColor="#8C8C8C"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8C8C8C"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#8C8C8C"
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
      <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('CustomerDetails')}>
        <Text style={styles.buttonText}>Save</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF5FF',
  },
  header: {
    height: 50,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.black,

    marginLeft: responsiveWidth(5),
  },
  backButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: color.white,
    marginLeft: responsiveWidth(5),
    // justifyContent: 'center',
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  inputContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#D5D8D5',
    borderRadius: 10,
    height: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    color: '#171717',
    fontSize: 16,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#0047AF',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#171717',
  },
  placeholderText: {
    color: '#8C8C8C',
  },
});

export default AddNewCustomer;


