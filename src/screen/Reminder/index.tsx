import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {color, responsiveHeight, responsiveWidth} from '../../constant/theme';
import Edit from '../../assets/svgs/edit.svg';
import Profile from '../../assets/svgs/profileIc.svg';
import Phone from '../../assets/svgs/phone.svg';
import Email from '../../assets/svgs/email.svg';
import Date from '../../assets/svgs/Date.svg';
import Business from '../../assets/svgs/business.svg';
import Celender from '../../assets/svgs/celender.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const reminderData = [
  {
    id: '1',
    title: 'Reminder Name ABC',
    datetime: '10 Dec 2024 - 9:00 AM',
  },
  {
    id: '2',
    title: 'Reminder Name XYZ',
    datetime: '15 Dec 2024 - 2:30 PM',
  },
  {
    id: '3',
    title: 'Reminder Name PQR',
    datetime: '20 Dec 2024 - 11:00 AM',
  },
];

const ReminderScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Remindersr</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('AddReminder')}>
          <MaterialIcons name="tune" size={24} color={color.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={styles.tabButton}
            onPress={() => setActiveTab('Upcoming')}
          >
            <Text style={[
              styles.tabText, 
              activeTab === 'Upcoming' && styles.activeTabText
            ]}>Upcoming</Text>
            <View style={[
              styles.tabIndicator,
              activeTab === 'Upcoming' && styles.activeIndicator
            ]} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, styles.middleTab]}
            onPress={() => setActiveTab('Today')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'Today' && styles.activeTabText
            ]}>Today</Text>
            <View style={[
              styles.tabIndicator,
              activeTab === 'Today' && styles.activeIndicator
            ]} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.tabButton}
            onPress={() => setActiveTab('Past')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'Past' && styles.activeTabText
            ]}>Past</Text>
            <View style={[
              styles.tabIndicator,
              activeTab === 'Past' && styles.activeIndicator
            ]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.black,

    marginLeft: responsiveWidth(5),
  },
  filterButton: {
    marginRight: responsiveWidth(5),
    backgroundColor: color.white,
    padding: responsiveWidth(1),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  backButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: color.white,
    marginLeft: responsiveWidth(5),
    // justifyContent: 'center',
  },
  profileTextTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.94,
    letterSpacing: -0.28,
    textAlign: 'left',
    marginLeft: responsiveWidth(3),
    color: color.gray,
  },
  profileTextTitle2: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.94,
    letterSpacing: -0.02 * 14,
    textAlign: 'left',

    color: color.black,
  },
  profileTextDetails: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.36,
    letterSpacing: -0.32,
    textAlign: 'left',
    marginLeft: responsiveWidth(3),
    color: color.black,
  },
  profileTextDetails2: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14.52,
    letterSpacing: -0.02 * 12,
    textAlign: 'left',
    marginTop: responsiveWidth(1),
    marginBottom: responsiveWidth(1),
    color: color.black,
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: color.white,
    margin: responsiveWidth(5),
    borderRadius: 10,
    padding: responsiveWidth(4),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
  },
  profileSection2: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
  },
  profileSection4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileSection3: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  bottomSectionMain: {
    flexDirection: 'row',
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  profileText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.36,
    letterSpacing: -0.32,
    textAlign: 'left',
    marginLeft: responsiveWidth(3),
    color: color.black,
  },
  detailsContainer: {
    marginTop: responsiveHeight(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: responsiveWidth(5),
    backgroundColor: color.white,
  },

  editButton: {
    backgroundColor: color.white,
    padding: responsiveHeight(1.5),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(12),
    borderWidth: 1,
    borderColor: color.primary,
  },
  buttonText: {
    color: color.white,
    marginLeft: responsiveWidth(2),
    fontSize: 16,
    fontWeight: '500',
  },
  bottomContainer: {
    backgroundColor: color.white,
    margin: responsiveWidth(5),
    borderRadius: 10,
    padding: responsiveWidth(4),
  },
  bottomText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.36,
    letterSpacing: -0.32,
    textAlign: 'left',
    marginLeft: responsiveWidth(3),
    color: color.black,
  },
  bottomTextBtn: {
    color: color.white,
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSection2: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomSection3: {
    flex: 1,
    // flexDirection: 'row',
    marginTop: responsiveHeight(2),
    padding: responsiveWidth(2),
    // borderWidth: 1,
    // borderColor: '#D5D8D5'
    // borderRadius: 5,
  },
  bottomSection4: {
    flex: 1,
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
    borderWidth: 1,
    borderColor: '#D5D8D5',
    borderRadius: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: '#ECF5FF',
    alignItems: 'center',
  },
  middleTab: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D5D8D5',
    backgroundColor: '#fff',
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#8C8C8C',
    fontWeight: '500',
  },
  plusIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 20,
    // backgroundColor: color.primary,
    borderWidth: 1.3,
    borderColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(2),
  },
  bottomSectionMainContainer: {
    flex: 1,
    // flexDirection: 'row',
    marginTop: responsiveHeight(2),
    borderWidth: 1,
    borderColor: '#D5D8D5',
    borderRadius: 5,
    // padding: responsiveWidth(2),
  },
  profileSection5: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D5D8D5',
    borderRadius: 5,
    margin: responsiveWidth(5),
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#8C8C8C',
    fontWeight: '500',
  },
  activeTabText: {
    color: color.primary,
    fontWeight: '600',
  },
  tabIndicator: {
    height: 2,
    backgroundColor: '#D5D8D5',
    marginTop: 5,
    width: '40%'
  },
  activeIndicator: {
    backgroundColor: color.primary,
  }
});

export default ReminderScreen;
