import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../constant/theme';

const FilterModal = ({visible, onClose}) => {
  const [reminderType, setReminderType] = useState('one_time');
  const [dateFilter, setDateFilter] = useState('custom');

  return (
    <Modal visible={visible} transparent animationType="fade">
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
                onPress={() => setReminderType('one_time')}>
                <View style={styles.radioOuter}>
                  {reminderType === 'one_time' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioText}>One Time Reminder</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.radioRow, {marginTop: 8}]}
                onPress={() => setReminderType('recurring')}>
                <View style={styles.radioOuter}>
                  {reminderType === 'recurring' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioText}>Recurring Reminder</Text>
              </TouchableOpacity>
            </View>

            {/* Date Filter Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Date Filter</Text>
              <View style={styles.dateFilterGrid}>
                {[
                  'Last Week',
                  '15 Day',
                  '1 Month',
                  '6 Month',
                  '12 Month',
                  'Custom',
                ].map(filter => (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterChip,
                      dateFilter === filter.toLowerCase() &&
                        styles.filterChipActive,
                    ]}
                    onPress={() => setDateFilter(filter.toLowerCase())}>
                    <Text
                      style={[
                        styles.filterChipText,
                        dateFilter === filter.toLowerCase() &&
                          styles.filterChipTextActive,
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
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateValue}>18 Feb 2025</Text>
                  </View>
                </View>
                <Text style={styles.dateToText}>To</Text>
                <View style={styles.dateInput}>
                  <Text style={styles.dateLabel}>End Date</Text>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateValue}>26 Feb 2025</Text>
                  </View>
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
    marginHorizontal: responsiveWidth(5),
    borderRadius: 10,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsiveWidth(4),
  },
  headerTitle: {
    fontSize: fontSize.regular,
    fontWeight: '700',
    fontFamily: fontFamily.bold,
  },
  section: {
    padding: responsiveWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: color.lightgray,
  },
  sectionTitle: {
    fontSize: fontSize.regularx,
    fontWeight: '500',
    marginBottom: responsiveWidth(3.2),
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: responsiveWidth(5.3),
    height: responsiveWidth(5.3),
    borderRadius: responsiveWidth(3),
    borderWidth: 2,
    alignItems: 'center',
    borderColor: color.primary,
    justifyContent: 'center',
    marginRight: responsiveWidth(2),
  },
  radioInner: {
    width: responsiveWidth(3.5),
    height: responsiveWidth(3.5),
    borderRadius: responsiveWidth(3),
    backgroundColor: color.primary,
  },
  radioText: {
    fontSize: fontSize.mini,
    color: color.black,
    fontFamily: fontFamily.regular,
  },
  dateFilterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveWidth(2),
  },
  filterChip: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveWidth(2),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.transparentGray,
  },
  filterChipActive: {
    backgroundColor: '#ECF5FF',
    borderColor: color.primary,
  },
  filterChipText: {
    fontSize: fontSize.minixxx,
    color: color.lightGrayText,
    fontFamily: fontFamily.semiBold,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: color.primary,
  },
  dateRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveWidth(4),
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: fontSize.minixxx,
    color: color.grayText,
    marginBottom: responsiveWidth(1),
    fontFamily: fontFamily.regular,
  },
  dateValue: {
    fontSize: fontSize.regularx,
    color: color.black,
    fontFamily: fontFamily.regular,
  },
  dateToText: {
    fontSize: fontSize.regularx,
    color: color.grayText,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    flex: 0.3,
    top: 10,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: color.grayText,
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: color.primary,
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    paddingVertical: responsiveWidth(2.5),
  },
  applyButton: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: color.white,
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    paddingVertical: responsiveWidth(2.5),
  },
});

export default FilterModal;
