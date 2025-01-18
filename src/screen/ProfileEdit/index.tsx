import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header} from '../../components';
import {color} from '../../constant/theme';

const ProfileEdit = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Edit Profile" showBack />

      <ScrollView style={styles.scrollView}>
        {/* Personal Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Customer Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              defaultValue="Aadhya Patel"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              defaultValue="aadhyapatel@gmail.com"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              editable={false}
              value="+91 98855 89566"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateText}>11 Oct 1996</Text>
              <Icon name="calendar-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Business Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter business name"
              defaultValue="Hermiston and Sons"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter business email"
              keyboardType="email-address"
              defaultValue="kristina.kuphal@lebsack.info"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              defaultValue="+91 98855 89566"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Business Category</Text>
            <TouchableOpacity style={styles.dropdownInput}>
              <Text style={styles.dropdownText}>IT technology</Text>
              <Icon name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.addressInput]}
              placeholder="Enter business address"
              multiline={true}
              numberOfLines={2}
              defaultValue="3766 Braxton Street Bourbonnais, IL 60914"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: color.primary,
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 15,
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
});

export default ProfileEdit;
