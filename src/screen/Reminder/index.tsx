import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer } from '../../components';

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
  }
];

const ReminderScreen = () => {
  const [activeTab, setActiveTab] = useState<ReminderStatus>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter reminders based on active tab and search query
  const getFilteredReminders = useCallback(() => {
    let filtered = reminderData.filter(reminder => reminder.status === activeTab);

    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(reminder => 
        reminder.customerName.toLowerCase().includes(searchTerm) ||
        reminder.title.toLowerCase().includes(searchTerm) ||
        reminder.date.toLowerCase().includes(searchTerm)
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

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reminders</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-horizontal" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'sent', label: 'Recently Sent' },
            { id: 'failed', label: 'Failed' }
          ].map((tab) => (
            <TouchableOpacity 
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id as ReminderStatus)}
            >
              <Text style={[
                styles.tabText, 
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Customers"
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Icon name="close-circle" size={18} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>

        {/* Show "No results found" when search has no matches */}
        {getFilteredReminders().length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No reminders found for "{searchQuery}"
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              {activeTab === 'upcoming' ? 'Upcoming Reminders' : 
               activeTab === 'sent' ? 'Recently Sent Reminders' : 
               'Failed Reminders'}
            </Text>

            <FlatList
              data={getFilteredReminders()}
              renderItem={({ item }) => (
                <View style={styles.reminderItem}>
                  <View style={styles.reminderTitleRow}>
                    <View style={styles.titleContainer}>
                      <Icon name="document-text-outline" size={18} color="#007AFF" />
                      <Text style={styles.reminderTitle}>{item.title}</Text>
                    </View>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity>
                        <Icon name="trash-outline" size={18} color="#FF3B30" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Icon name="create-outline" size={18} color="#007AFF" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.customerRow}>
                    <Icon name="person-outline" size={14} color="#8E8E93" />
                    <Text style={styles.customerName}>{item.customerName}</Text>
                  </View>

                  <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>Send On</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <View style={styles.typeContainer}>
                      <Icon 
                        name={item.type === 'Recurring' ? 'repeat' : 'time-outline'} 
                        size={14} 
                        color="#8E8E93" 
                      />
                      <Text style={styles.typeText}>{item.type}</Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.reminderList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            />
          </>
        )}

        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    marginRight: 24,
    paddingVertical: 8,
    paddingBottom: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    marginBottom: -1,
  },
  tabText: {
    fontSize: 15,
    color: '#8E8E93',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 36,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
    marginRight: 8,
    height: '100%',
    padding: 0,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 8,
    color: '#000000',
  },
  reminderList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 80, // for floating button
  },
  reminderItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    gap: 8,
  },
  reminderTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  customerName: {
    fontSize: 13,
    color: '#8E8E93',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginRight: 4,
  },
  dateText: {
    fontSize: 13,
    color: '#000000',
    flex: 1,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    backgroundColor: '#007AFF',
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
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

export default ReminderScreen;
