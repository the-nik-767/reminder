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
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../constant/theme';
import {Header} from '../../components';

const {width} = Dimensions.get('window');

const AddNewCustomer = ({navigation}) => {
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
    <View style={styles.container}>
      <Header showBack title="Add New Customer" />
      <ScrollView>
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
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('CustomerDetails')}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )} */}
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
    marginVertical: responsiveWidth(2),
    borderWidth: 1,
    borderColor: '#D5D8D5',
    borderRadius: 10,
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    color: '#171717',
    fontSize: fontSize.regularx,
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
  },
  dateText: {
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    color: '#171717',
  },
  placeholderText: {
    color: '#8C8C8C',
  },
});

export default AddNewCustomer;
