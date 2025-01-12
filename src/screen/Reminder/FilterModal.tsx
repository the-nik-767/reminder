import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';

const FilterModal = ({ visible, onClose }) => {
  const [reminderType, setReminderType] = useState('one_time');
  const [dateFilter, setDateFilter] = useState('custom');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView bounces={false}>
            {/* Reminder Type Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reminder Type</Text>
              <TouchableOpacity 
                style={styles.radioRow}
                onPress={() => setReminderType('one_time')}
              >
                <View style={styles.radioOuter}>
                  {reminderType === 'one_time' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>One Time Reminder</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioRow, { marginTop: 8 }]}
                onPress={() => setReminderType('recurring')}
              >
                <View style={styles.radioOuter}>
                  {reminderType === 'recurring' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>Recurring Reminder</Text>
              </TouchableOpacity>
            </View>

            {/* Date Filter Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Date Filter</Text>
              <View style={styles.dateFilterGrid}>
                {['Last Week', '15 Day', '1 Month', '6 Month', '12 Month', 'Custom'].map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterChip,
                      dateFilter === filter.toLowerCase() && styles.filterChipActive
                    ]}
                    onPress={() => setDateFilter(filter.toLowerCase())}
                  >
                    <Text style={[
                      styles.filterChipText,
                      dateFilter === filter.toLowerCase() && styles.filterChipTextActive
                    ]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date Range Section */}
            <View style={styles.section}>
              <View style={styles.dateRangeRow}>
                <View style={styles.dateInput}>
                  <Text style={styles.dateLabel}>Start Date</Text>
                  <Text style={styles.dateValue}>18 Feb 2025</Text>
                </View>
                <Text style={styles.dateToText}>To</Text>
                <View style={styles.dateInput}>
                  <Text style={styles.dateLabel}>End Date</Text>
                  <Text style={styles.dateValue}>26 Feb 2025</Text>
                </View>
              </View>

              <Calendar
                style={styles.calendar}
                theme={{
                  selectedDayBackgroundColor: '#007AFF',
                  todayTextColor: '#007AFF',
                  textDayFontSize: 14,
                  textMonthFontSize: 14,
                  textDayHeaderFontSize: 14,
                }}
              />
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 12,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioText: {
    fontSize: 15,
  },
  dateFilterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 13,
    color: '#000',
  },
  filterChipTextActive: {
    color: 'white',
  },
  dateRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 15,
    color: '#000',
  },
  dateToText: {
    marginHorizontal: 12,
    color: '#8E8E93',
  },
  calendar: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  clearButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default FilterModal; 