// HomeScreen.tsx

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MainContainer} from '../../components';
import {icons} from '../../assets';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../constant/theme';
import Svg, {Line, Rect} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [upcomingReminder, setUpcomingreminder] = useState([
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
  ]);

  const OptionContainer = ({title, value, onPress, source}: any) => {
    return (
      <TouchableOpacity style={styles.statsCard} onPress={onPress}>
        <Image source={source} style={styles.optionIconStyle} />
        <Text style={styles.statsNumber}>{value}</Text>
        <Text style={styles.statsLabel}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <MainContainer>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={icons.icReminderLogo} style={styles.logoStyle} />
            <Text style={styles.headerTitle}>Reminder</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Image source={icons.icNotification} style={styles.logoStyle} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} bounces={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <OptionContainer
              title={'Total Customer'}
              value={'3000+'}
              source={icons.icCustomers}
              onPress={() => {}}
            />
            <OptionContainer
              title={'Pending Reminder'}
              value={'150'}
              source={icons.icReminder}
              onPress={() => {}}
            />
          </View>

          <View style={[styles.statsRow, {marginBottom: 0}]}>
            <OptionContainer
              title={'Delivered Reminders'}
              value={'300'}
              source={icons.icDeliverReminder}
              onPress={() => {}}
            />
            <OptionContainer
              title={'Failed Reminders'}
              value={'150'}
              source={icons.icFailedReminder}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Account Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>Account Balance</Text>
            <Text style={styles.balanceAmount}>$5000.30</Text>
          </View>
          <TouchableOpacity style={styles.addMoneyButton}>
            <Image source={icons.icPlus} style={styles.addIconStyle} />
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Reminders */}
        <View style={styles.remindersSection}>
          <View style={styles.reminderHeader}>
            <Text style={styles.reminderTitle}>Upcoming Reminders</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Reminder List */}
          <View style={styles.reminderList}>
            {upcomingReminder?.map((i, index) => {
              return (
                <View key={index.toString()} style={styles.mainContainer}>
                  <TouchableOpacity
                    style={{paddingVertical: responsiveWidth(4)}}>
                    <View style={styles.reminderItem}>
                      <View style={styles.reminderInfo}>
                        <Image
                          source={icons.icCalendarReminder}
                          style={styles.calendarIconStyle}
                        />
                        <View style={styles.reminderDetails}>
                          <Text style={styles.reminderName}>
                            Reminder Name ABC
                          </Text>
                        </View>
                      </View>
                      <Icon
                        name="chevron-forward"
                        size={20}
                        color={color.grayText}
                      />
                    </View>
                    <Text style={styles.reminderMeta}>
                      10 Members • Send On
                      <Text style={{color: color.black}}>
                        {` 10 Dec 2024 - 9:00 AM`}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  {index != upcomingReminder?.length - 1 && (
                    <View style={styles.borderContainer} />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    backgroundColor: '#007AFF20',
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: fontSize.large,
    fontWeight: '600',
    fontFamily: fontFamily.bold,
    marginHorizontal: responsiveWidth(2),
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    padding: responsiveWidth(4),
    paddingTop: 0,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveWidth(4),
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statsNumber: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.extraBold,
    fontWeight: 'bold',
    color: color.primary,
    marginTop: responsiveWidth(1.5),
  },
  statsLabel: {
    fontSize: fontSize.mini,
    fontFamily: fontFamily.regular,
    color: '#8E8E93',
    textAlign: 'center',
  },
  balanceCard: {
    backgroundColor: color.primaryGreen,
    marginHorizontal: responsiveWidth(4),
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    color: '#FFFFFF',
    fontSize: fontSize.xsmall,
    fontFamily: fontFamily.regular,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: fontSize.regular,
    fontFamily: fontFamily.bold,
    fontWeight: 'bold',
    marginTop: 4,
  },
  addMoneyButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addMoneyText: {
    color: color.primary,
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: fontSize.xsmall,
    fontFamily: fontFamily.bold,
  },
  remindersSection: {
    margin: responsiveWidth(4),
    backgroundColor: color.white,
    borderRadius: responsiveWidth(4),
    overflow: 'hidden',
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
  },
  reminderTitle: {
    fontSize: fontSize.small,
    fontWeight: 'bold',
    fontFamily: fontFamily.bold,
  },
  viewAllText: {
    color: color.primary,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
  },
  reminderList: {
    // gap: 12,
  },
  mainContainer: {
    overflow: 'hidden',
    paddingHorizontal: responsiveWidth(4),
    marginBottom: 5,
  },
  borderContainer: {
    borderWidth: 0.8,
    borderColor: color.border,
    borderStyle: 'dashed',
  },
  calendarIconStyle: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
  reminderItem: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reminderDetails: {
    marginLeft: responsiveWidth(1),
    flex: 1,
  },
  reminderName: {
    fontSize: fontSize.regular,
    fontWeight: '500',
    fontFamily: fontFamily.semiBold,
    color: color.black,
  },
  reminderMeta: {
    fontSize: fontSize.minix,
    color: color.grayText,
    marginTop: responsiveWidth(1),
  },
  logoStyle: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    resizeMode: 'contain',
  },
  optionIconStyle: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    resizeMode: 'contain',
  },
  addIconStyle: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
});

export default HomeScreen;
