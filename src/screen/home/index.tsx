// HomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer } from '../../components';

const HomeScreen = () => {
  return (
    <MainContainer>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="notifications" size={24} color="#007AFF" style={styles.bellIcon} />
          <Text style={styles.headerTitle}>Reminder</Text>
        </View>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statsCard}>
              <Icon name="people" size={32} color="#007AFF" />
              <Text style={styles.statsNumber}>3900+</Text>
              <Text style={styles.statsLabel}>Total Customer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statsCard}>
              <Icon name="time" size={32} color="#007AFF" />
              <Text style={styles.statsNumber}>150</Text>
              <Text style={styles.statsLabel}>Pending Reminder</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statsCard}>
              <Icon name="notifications" size={32} color="#4CAF50" />
              <Text style={styles.statsNumber}>300</Text>
              <Text style={styles.statsLabel}>Delivered Reminders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statsCard}>
              <Icon name="alert-circle" size={32} color="#FF3B30" />
              <Text style={styles.statsNumber}>150</Text>
              <Text style={styles.statsLabel}>Failed Reminders</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>Account Balance</Text>
            <Text style={styles.balanceAmount}>$5000.30</Text>
          </View>
          <TouchableOpacity style={styles.addMoneyButton}>
            <Icon name="add" size={20} color="#007AFF" />
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
            <TouchableOpacity style={styles.reminderItem}>
              <View style={styles.reminderInfo}>
                <Icon name="calendar-outline" size={20} color="#007AFF" />
                <View style={styles.reminderDetails}>
                  <Text style={styles.reminderName}>Reminder Name ABC</Text>
                  <Text style={styles.reminderMeta}>10 Members • Send On 10 Dec 2024 - 9:00 AM</Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.reminderItem}>
              <View style={styles.reminderInfo}>
                <Icon name="calendar-outline" size={20} color="#007AFF" />
                <View style={styles.reminderDetails}>
                  <Text style={styles.reminderName}>ABC Reminder Name</Text>
                  <Text style={styles.reminderMeta}>5 Members • Send On 12 Dec 2024 - 12:00 PM</Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.reminderItem}>
              <View style={styles.reminderInfo}>
                <Icon name="calendar-outline" size={20} color="#007AFF" />
                <View style={styles.reminderDetails}>
                  <Text style={styles.reminderName}>Reminder Name XYZ</Text>
                  <Text style={styles.reminderMeta}>3 Members • Send On 15 Dec 2024 - 9:00 AM</Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  balanceCard: {
    backgroundColor: '#4CAF50',
    margin: 16,
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
    fontSize: 14,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
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
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  remindersSection: {
    padding: 16,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
  },
  reminderList: {
    gap: 12,
  },
  reminderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reminderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reminderDetails: {
    marginLeft: 12,
    flex: 1,
  },
  reminderName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  reminderMeta: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default HomeScreen;
