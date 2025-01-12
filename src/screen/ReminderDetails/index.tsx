import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReminderDetails = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminder Details</Text>
        <TouchableOpacity>
          <Icon name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content Card */}
      <View style={styles.card}>
        {/* Reminder Name */}
        <View style={styles.reminderNameContainer}>
          <Icon name="calendar" size={24} color="#007AFF" />
          <Text style={styles.reminderName}>Reminder Name ABC</Text>
        </View>

        {/* Message Preview */}
        <View style={styles.messagePreview}>
          <Text style={styles.messageText}>
            Happy Birthday Janak Vaghela! 🎉🎂{'\n\n'}
            We at Vanani Clinic wish you a wonderful day filled with joy and good health.{'\n\n'}
            9876543210 call us to book your appointment and for more information!{'\n\n'}
            - Vanani Clinic
          </Text>
          <Text style={styles.messageTime}>1:01 PM</Text>
        </View>

        {/* Reminder Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Reminder Status</Text>
              <Text style={[styles.infoValue, styles.upcomingStatus]}>Upcoming</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Reminder Type</Text>
              <Text style={styles.infoValue}>Recurring</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Repeat Every</Text>
              <Text style={styles.infoValue}>Sunday</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Time</Text>
              <Text style={styles.infoValue}>7:00 AM</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Recurring Type</Text>
              <Text style={styles.infoValue}>Weekly</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Stop Repeating</Text>
              <Text style={styles.infoValue}>31 Dec 2025</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Added Customers Section */}
      <View style={styles.customersSection}>
        <Text style={styles.sectionTitle}>Added Customers</Text>
        <View style={styles.customersList}>
          <View style={styles.customerCard}>
            <View style={styles.customerInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>Maya Patel</Text>
                <Text style={styles.customerPhone}>98855 89566</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
              <Icon name="trash-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
    paddingHorizontal: '4%',
    paddingVertical: 16,
    backgroundColor: '#F2F2F7',
   
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: '4%',
    marginVertical: 12,
    padding: '4%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reminderNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%',
  },
  reminderName: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 8,
  },
  messagePreview: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: '4%',
    marginBottom: '4%',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  messageTime: {
    fontSize: 13,
    color: '#8E8E93',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  infoGrid: {
    gap: '4%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '3%',
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 17,
    fontWeight: '600',
  },
  upcomingStatus: {
    color: '#34C759',
  },
  customersSection: {
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    marginBottom: 40,
  },
  customersList: {
    width: '100%',
    marginBottom: 20,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  customerDetails: {
    flex: 1,
    marginRight: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
  },
  customerName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  customerPhone: {
    fontSize: 15,
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: '4%',
    color: '#000000',
  },
});

export default ReminderDetails;
