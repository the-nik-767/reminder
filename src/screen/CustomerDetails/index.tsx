import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  color,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../constant/theme';
import Edit from '../../assets/svgs/edit.svg';
import Profile from '../../assets/svgs/profileIc.svg';
import Phone from '../../assets/svgs/phone.svg';
import Email from '../../assets/svgs/email.svg';
import Date from '../../assets/svgs/Date.svg';
import Business from '../../assets/svgs/business.svg';
import Celender from '../../assets/svgs/celender.svg';
import {Header} from '../../components';

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

const CustomerDetails = ({navigation}) => {
  const [selectedType, setSelectedType] = useState('upcoming');

  const TabButton = ({isSelected, title, onPress}: any) => {
    return (
      <TouchableOpacity
        style={[styles.tabButton, !isSelected && styles.middleTab]}
        onPress={onPress}>
        <Text
          style={[
            styles.tabButtonText,
            {
              color: isSelected ? color.black : color.grayText,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Customer Details" showBack />

      <ScrollView style={styles.scrollView}>
        <View style={styles.infoCard}>
          {/* Profile Icon and Info */}
          <View style={styles.profileSection}>
            {/* <Icon name="user" size={24} color={colors.grey} /> */}
            <Text style={styles.profileText}>{'Personal Details'}</Text>
            <Edit />
          </View>

          <View style={styles.profileSection2}>
            <Profile width={24} height={24} />
            <View>
              <Text style={styles.profileTextTitle}>Customer Name</Text>
              <Text style={styles.profileTextDetails}>Aadhya Patel</Text>
            </View>
          </View>
          <View style={styles.profileSection2}>
            <Email width={24} height={24} />
            <View>
              <Text style={styles.profileTextTitle}>Email</Text>
              <Text style={styles.profileTextDetails}>
                aadhyapatel@gmail.com
              </Text>
            </View>
          </View>
          <View style={styles.profileSection2}>
            <Phone width={24} height={24} />
            <View>
              <Text style={styles.profileTextTitle}>Phone Number</Text>
              <Text style={styles.profileTextDetails}>+91 98855 89566</Text>
            </View>
          </View>
          <View style={styles.profileSection2}>
            <Date width={24} height={24} />
            <View>
              <Text style={styles.profileTextTitle}>Date of Birth</Text>
              <Text style={styles.profileTextDetails}>11 Oct 1996</Text>
            </View>
          </View>
          <View style={styles.profileSection2}>
            <Business width={24} height={24} />
            <View>
              <Text style={styles.profileTextTitle}>
                which business customer?
              </Text>
              <Text style={styles.profileTextDetails}>Home Loan</Text>
            </View>
          </View>

          {/* Customer Details */}
          <View style={styles.detailsContainer}>
            {/* Add your customer details here */}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomSection}>
            <Text style={styles.bottomText}>Reminders</Text>

            <TouchableOpacity style={styles.addButton}>
              <View style={styles.plusIconContainer}>
                <Icon name="plus" size={15} color={color.white} />
              </View>
              <Text style={styles.bottomTextBtn}>Reminder</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSectionMainContainer}>
            <View style={styles.bottomSection2}>
              <TabButton
                isSelected={selectedType == 'upcoming'}
                title={'Upcoming'}
                onPress={() => {
                  setSelectedType('upcoming');
                }}
              />
              <View style={{width: 1, backgroundColor: color.border}} />
              <TabButton
                isSelected={selectedType == 'sent'}
                title={'Recently sent'}
                onPress={() => {
                  setSelectedType('sent');
                }}
              />
              <View style={{width: 1, backgroundColor: color.border}} />
              <TabButton
                isSelected={selectedType == 'fail'}
                title={'Failed'}
                onPress={() => {
                  setSelectedType('fail');
                }}
              />
            </View>

            <View style={styles.bottomSection3}>
              {reminderData.map(reminder => (
                <View key={reminder.id} style={styles.bottomSectionMain}>
                  <View style={styles.profileSection3}>
                    <View style={styles.profileSection4}>
                      <Celender
                        width={responsiveWidth(5)}
                        height={responsiveWidth(5)}
                      />
                      <Text style={styles.profileTextTitle2}>
                        {reminder.title}
                      </Text>
                    </View>
                    <View style={styles.profileSection5}>
                      <Text
                        style={[
                          styles.profileTextDetails2,
                          {color: color.gray},
                        ]}>
                        Send on{' '}
                      </Text>
                      <Text style={styles.profileTextDetails2}>
                        {reminder.datetime}
                      </Text>
                    </View>
                  </View>
                  <Edit />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    fontFamily: fontFamily.regular,
    fontSize: fontSize.regularx,
    fontWeight: '500',
    textAlign: 'left',
    color: color.black,
    marginHorizontal: responsiveWidth(1),
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
    fontFamily: fontFamily.regular,
    fontSize: fontSize.regular,
    fontWeight: '600',
    textAlign: 'left',
    marginLeft: responsiveWidth(3),
    color: color.black,
  },
  detailsContainer: {
    // marginTop: responsiveHeight(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: responsiveWidth(5),
    backgroundColor: color.white,
  },
  addButton: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: color.primary,
    padding: responsiveHeight(1),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(30),
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
    marginTop: 0,
    borderRadius: 10,
    padding: responsiveWidth(4),
  },
  bottomText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.regular,
    fontWeight: '600',
    textAlign: 'left',
    marginLeft: responsiveWidth(3),
    color: color.black,
  },
  bottomTextBtn: {
    color: color.white,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.regular,
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
    borderBottomWidth: 1,
    borderBottomColor: color.border,
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
    borderColor: color.border,
    borderRadius: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: '#ECF5FF',
    alignItems: 'center',
  },
  middleTab: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: color.border,
    backgroundColor: '#fff',
  },
  tabButtonText: {
    fontSize: fontSize.minix,
    fontFamily: fontFamily.regular,
    color: color.grayText,
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
    borderColor: color.border,
    borderRadius: 5,
    // padding: responsiveWidth(2),
  },
  profileSection5: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomerDetails;
