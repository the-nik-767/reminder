import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MainContainer} from '../../components';
import FilterModal from './FilterModal';
import {Header} from '../../components/common/header';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../constant/theme';
import Searchbox from '../../components/common/searchbox';
import {icons} from '../../assets';
import {useNavigation} from '@react-navigation/native';

// Define reminder types
type ReminderStatus = 'upcoming' | 'sent' | 'failed';

interface Reminder {
  id: string;
  title: string;
  customerName: string;
  date: string;
  type: 'Recurring' | 'One Time';
  status: ReminderStatus;
}

// Sample data with status
const reminderData: Reminder[] = [
  {
    id: '1',
    title: 'Reminder Name ABC',
    customerName: 'Aadhya Patel',
    date: '10 Dec 2024 - 11:00 AM',
    type: 'Recurring',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Birthday Reminder',
    customerName: 'Raj Kumar',
    date: '12 Dec 2024 - 09:00 AM',
    type: 'One Time',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Payment Due',
    customerName: 'Priya Shah',
    date: '15 Dec 2024 - 02:00 PM',
    type: 'Recurring',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Meeting Schedule',
    customerName: 'Amit Verma',
    date: '18 Dec 2024 - 10:30 AM',
    type: 'One Time',
    status: 'upcoming',
  },
  {
    id: '5',
    title: 'Follow Up Call',
    customerName: 'Neha Singh',
    date: '20 Dec 2024 - 03:00 PM',
    type: 'Recurring',
    status: 'upcoming',
  },
  // Recently Sent Reminders
  {
    id: '6',
    title: 'Payment Received',
    customerName: 'Vikram Mehta',
    date: '05 Dec 2024 - 11:00 AM',
    type: 'One Time',
    status: 'sent',
  },
  {
    id: '7',
    title: 'Appointment Confirmed',
    customerName: 'Sneha Patel',
    date: '06 Dec 2024 - 02:30 PM',
    type: 'Recurring',
    status: 'sent',
  },
  {
    id: '8',
    title: 'Document Request',
    customerName: 'Rahul Shah',
    date: '07 Dec 2024 - 09:15 AM',
    type: 'One Time',
    status: 'sent',
  },
  {
    id: '9',
    title: 'Meeting Minutes',
    customerName: 'Kavita Sharma',
    date: '08 Dec 2024 - 04:00 PM',
    type: 'Recurring',
    status: 'sent',
  },
  {
    id: '10',
    title: 'Project Update',
    customerName: 'Arjun Kumar',
    date: '09 Dec 2024 - 01:00 PM',
    type: 'One Time',
    status: 'sent',
  },
  // Failed Reminders
  {
    id: '11',
    title: 'Invoice Reminder',
    customerName: 'Deepak Verma',
    date: '01 Dec 2024 - 10:00 AM',
    type: 'Recurring',
    status: 'failed',
  },
  {
    id: '12',
    title: 'Schedule Update',
    customerName: 'Meera Patel',
    date: '02 Dec 2024 - 03:30 PM',
    type: 'One Time',
    status: 'failed',
  },
  {
    id: '13',
    title: 'Delivery Notice',
    customerName: 'Suresh Kumar',
    date: '03 Dec 2024 - 11:45 AM',
    type: 'Recurring',
    status: 'failed',
  },
  {
    id: '14',
    title: 'Account Statement',
    customerName: 'Anjali Shah',
    date: '04 Dec 2024 - 02:00 PM',
    type: 'One Time',
    status: 'failed',
  },
  // More Upcoming Reminders
  {
    id: '15',
    title: 'Service Reminder',
    customerName: 'Rajesh Khanna',
    date: '22 Dec 2024 - 10:00 AM',
    type: 'Recurring',
    status: 'upcoming',
  },
  {
    id: '16',
    title: 'Warranty Expiry',
    customerName: 'Pooja Singh',
    date: '23 Dec 2024 - 11:30 AM',
    type: 'One Time',
    status: 'upcoming',
  },
  {
    id: '17',
    title: 'Maintenance Alert',
    customerName: 'Kiran Shah',
    date: '24 Dec 2024 - 09:00 AM',
    type: 'Recurring',
    status: 'upcoming',
  },
  // More Sent Reminders
  {
    id: '18',
    title: 'Thank You Note',
    customerName: 'Vivek Patel',
    date: '04 Dec 2024 - 05:00 PM',
    type: 'One Time',
    status: 'sent',
  },
  {
    id: '19',
    title: 'Feedback Request',
    customerName: 'Nisha Kumar',
    date: '03 Dec 2024 - 03:15 PM',
    type: 'Recurring',
    status: 'sent',
  },
  // More Failed Reminders
  {
    id: '20',
    title: 'Payment Overdue',
    customerName: 'Sanjay Mehta',
    date: '01 Dec 2024 - 04:30 PM',
    type: 'Recurring',
    status: 'failed',
  },
  {
    id: '21',
    title: 'Appointment Reminder',
    customerName: 'Riya Sharma',
    date: '02 Dec 2024 - 01:45 PM',
    type: 'One Time',
    status: 'failed',
  },
  {
    id: '22',
    title: 'Stock Update',
    customerName: 'Arun Patel',
    date: '25 Dec 2024 - 02:30 PM',
    type: 'Recurring',
    status: 'upcoming',
  },
  {
    id: '23',
    title: 'Holiday Notice',
    customerName: 'Maya Singh',
    date: '26 Dec 2024 - 10:00 AM',
    type: 'One Time',
    status: 'upcoming',
  },
  {
    id: '24',
    title: 'Year End Review',
    customerName: 'Rohit Kumar',
    date: '27 Dec 2024 - 03:00 PM',
    type: 'Recurring',
    status: 'upcoming',
  },
  {
    id: '25',
    title: 'New Year Greetings',
    customerName: 'Anita Shah',
    date: '28 Dec 2024 - 09:00 AM',
    type: 'One Time',
    status: 'upcoming',
  },
];

const ReminderScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<ReminderStatus>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Filter reminders based on active tab and search query
  const getFilteredReminders = useCallback(() => {
    let filtered = reminderData.filter(
      reminder => reminder.status === activeTab,
    );

    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        reminder =>
          reminder.customerName.toLowerCase().includes(searchTerm) ||
          reminder.title.toLowerCase().includes(searchTerm) ||
          reminder.date.toLowerCase().includes(searchTerm),
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  // Handle search input change
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleFilter = (filters: FilterState) => {
    console.log('Applied filters:', filters);
    // Apply your filter logic here
  };

  const getReminderIconByType = () => {
    return activeTab === 'upcoming'
      ? icons.icCalendarReminder
      : activeTab === 'sent'
      ? icons.icReminderSuccess
      : icons.icReminderFail;
  };
  const getReminderListTitleByType = () => {
    return activeTab === 'upcoming'
      ? 'Upcoming Reminders'
      : activeTab === 'sent'
      ? 'Recently Sent Reminders'
      : 'Failed Reminders';
  };

  return (
    <MainContainer>
      <Header
        title="Reminders"
        rightIcon={icons.icFilter}
        onPress={() => setIsFilterVisible(true)}
      />

      <View style={styles.tabContainer}>
        {[
          {id: 'upcoming', label: 'Upcoming'},
          {id: 'sent', label: 'Recently Sent'},
          {id: 'failed', label: 'Failed'},
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id as ReminderStatus)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Searchbox
        searchContainerStyle={{marginTop: responsiveWidth(3)}}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Show "No results found" when search has no matches */}
      {getFilteredReminders().length == 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No reminders found for "{searchQuery}"
          </Text>
        </View>
      ) : (
        <View style={styles.reminderListContainer}>
          <Text style={styles.sectionTitle}>
            {getReminderListTitleByType()}
          </Text>

          <FlatList
            data={getFilteredReminders()}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.reminderItem}
                onPress={() => navigation.navigate('ReminderDetails')}>
                <View style={styles.reminderTitleRow}>
                  <View style={styles.titleContainer}>
                    <Image
                      source={getReminderIconByType()}
                      style={styles.actionIconStyle}
                    />
                    <Text style={styles.reminderTitle}>{item.title}</Text>
                  </View>
                  {activeTab != 'sent' && (
                    <View style={styles.actionButtons}>
                      <TouchableOpacity>
                        <Image
                          source={icons.icTrash}
                          style={styles.actionIconStyle}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={icons.icEdit}
                          style={styles.actionIconStyle}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View style={styles.customerRow}>
                  <Image
                    source={icons.icProfile}
                    style={styles.smallIconStyle}
                  />
                  <Text style={styles.customerName}>{item.customerName}</Text>
                </View>

                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>
                    {`Send On `}
                    <Text style={styles.dateText}>{`${item.date}`}</Text>
                    {` - `}
                  </Text>
                  <View style={styles.typeContainer}>
                    <Image
                      source={
                        item.type === 'Recurring'
                          ? icons.icRecurring
                          : icons.icOneTime
                      }
                      style={styles.actionTypeIconStyle}
                    />
                    <Text style={styles.typeText}>{` ${item.type}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.reminderList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddReminder')}>
        <Icon name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApplyFilter={handleFilter}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: color.lightgray,
  },
  tab: {
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveWidth(2),
    paddingBottom: responsiveWidth(4),
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: color.primary,
    marginBottom: -1,
  },
  tabText: {
    fontSize: fontSize.regularx,
    color: color.grayText,
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
  },
  activeTabText: {
    color: color.primary,
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
  },
  sectionTitle: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginBottom: responsiveWidth(1),
    color: color.black,
  },
  reminderListContainer: {
    backgroundColor: color.white,
    marginHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(4),
    overflow: 'hidden',
    padding: responsiveWidth(4),
  },
  reminderList: {},
  reminderItem: {
    paddingVertical: responsiveWidth(3.5),
  },
  reminderTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: fontSize.regularx,
    fontWeight: '400',
    color: color.black,
    fontFamily: fontFamily.semiBold,
    marginHorizontal: responsiveWidth(1),
  },
  actionButtons: {
    flexDirection: 'row',
    gap: responsiveWidth(3),
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  customerName: {
    fontSize: fontSize.minix,
    color: color.grayText,
    fontFamily: fontFamily.regular,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: fontSize.minix,
    color: color.grayText,
    // marginRight: 4,
  },
  dateText: {
    fontSize: fontSize.minix,
    color: color.black,
    // flex: 1,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 4,
  },
  typeText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: fontSize.regular,
    color: color.grayText,
    textAlign: 'center',
  },
  filterButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconStyle: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
  smallIconStyle: {
    height: responsiveWidth(4.5),
    width: responsiveWidth(4.5),
    resizeMode: 'contain',
  },
  actionTypeIconStyle: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
  },
});

export default ReminderScreen;
