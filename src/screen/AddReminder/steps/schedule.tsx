import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../../constant/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons} from '../../../assets';
import DropDownPicker from 'react-native-dropdown-picker';
import {monthList, monthListWithShortName} from '../../../constant/global';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface ScheduleInfoProps {
  onPressBack: () => void;
  onPressPreview: () => void;
  onSubmit: (data: {
    reminder_type: 'one_Time' | 'recurring';
    reminder_date?: string;
    reminder_time: string;
    stopping_date?: string;
    day_of_month?: number;
    month_of_year?: number;
    recurring_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  }) => void;
  initialData?: {
    reminder_type: 'one_Time' | 'recurring';
    reminder_date?: string;
    reminder_time: string;
    stopping_date?: string;
    day_of_month?: number;
    month_of_year?: number;
    recurring_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
}

const ScheduleInfo: React.FC<ScheduleInfoProps> = ({
  onPressBack,
  onPressPreview,
  onSubmit,
  initialData,
}) => {
  const [reminderType, setReminderType] = useState<'one_Time' | 'recurring'>(
    initialData?.reminder_type || 'one_Time',
  );
  const [recurringType, setRecurringType] = useState<
    'daily' | 'weekly' | 'monthly' | 'yearly'
  >(initialData?.recurring_type || 'daily');
  const [selectedDay, setSelectedDay] = useState<number>(
    initialData?.day_of_month || 1,
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    initialData?.month_of_year || 1,
  );
  const [reminderTime, setReminderTime] = useState(
    initialData?.reminder_time
      ? new Date(`2000-01-01T${initialData.reminder_time}`)
      : new Date(),
  );
  const [stoppingDate, setStoppingDate] = useState(
    initialData?.stopping_date
      ? new Date(initialData.stopping_date)
      : new Date(moment().add(1, 'year').format()),
  );
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({
    reminderTime: '',
    stoppingDate: '',
    day: '',
    month: '',
    reminderDate: '',
  });
  const [reminderDate, setReminderDate] = useState(
    initialData?.reminder_date
      ? new Date(initialData.reminder_date)
      : new Date()
  );

  const days = Array.from({length: 31}, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  const months = Array.from({length: 12}, (_, i) => ({
    label: moment()
      .month(i)
      .format('MMMM'),
    value: i + 1,
  }));

  const validate = () => {
    const newErrors = {
      reminderTime: '',
      stoppingDate: '',
      day: '',
      month: '',
      reminderDate: '',
    };
    let isValid = true;

    if (!reminderTime || !moment(reminderTime).isValid()) {
      newErrors.reminderTime = 'Please select a valid reminder time';
      isValid = false;
    }

    if (reminderType === 'one_Time') {
      if (!reminderDate || !moment(reminderDate).isValid()) {
        newErrors.reminderDate = 'Please select a valid reminder date';
        isValid = false;
      }
    }

    if (reminderType === 'recurring' && !stoppingDate) {
      newErrors.stoppingDate = 'Please select stopping date';
      isValid = false;
    }

    if (
      reminderType === 'recurring' &&
      (recurringType === 'monthly' || recurringType === 'yearly') &&
      !selectedDay
    ) {
      newErrors.day = 'Please select day';
      isValid = false;
    }

    if (reminderType === 'recurring' && recurringType === 'yearly' && !selectedMonth) {
      newErrors.month = 'Please select month';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const formattedData = {
      reminder_type: reminderType,
      reminder_time: moment(reminderTime).format('HH:mm:ss'),
      ...(reminderType === 'one_Time' && {
        reminder_date: moment(reminderDate).format('YYYY-MM-DD'),
      }),
      ...(reminderType === 'recurring' && {
        recurring_type: recurringType,
        stopping_date: moment(stoppingDate).format('YYYY-MM-DD'),
        ...(recurringType === 'monthly' || recurringType === 'yearly' ? { day_of_month: selectedDay } : {}),
        ...(recurringType === 'yearly' ? { month_of_year: selectedMonth } : {})
      })
    };

    console.log('Submitting Schedule Data:', formattedData);
    onSubmit(formattedData);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Schedule</Text>

          {/* Reminder Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reminder Type</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setReminderType('one_Time')}>
                <View
                  style={[
                    styles.radio,
                    reminderType === 'one_Time' && styles.radioSelected,
                  ]}>
                  {reminderType === 'one_Time' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>One Time</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setReminderType('recurring')}>
                <View
                  style={[
                    styles.radio,
                    reminderType === 'recurring' && styles.radioSelected,
                  ]}>
                  {reminderType === 'recurring' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>Recurring</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Reminder Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reminder Time</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowTimePicker(true)}>
              <Text style={styles.timeText}>
                {moment(reminderTime).format('hh:mm A')}
              </Text>
            </TouchableOpacity>
            {errors.reminderTime ? (
              <Text style={styles.errorText}>{errors.reminderTime}</Text>
            ) : null}
          </View>

          {/* Recurring Options */}
          {reminderType === 'recurring' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recurring Type</Text>
                <View style={styles.recurringOptions}>
                  {['daily', 'weekly', 'monthly', 'yearly'].map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.recurringOption,
                        recurringType === type && styles.recurringOptionSelected,
                      ]}
                      onPress={() => setRecurringType(type as any)}>
                      <Text
                        style={[
                          styles.recurringOptionText,
                          recurringType === type &&
                            styles.recurringOptionTextSelected,
                        ]}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Monthly/Yearly Day Selection */}
              {(recurringType === 'monthly' || recurringType === 'yearly') && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Day of Month</Text>
                  <View style={styles.daysGrid}>
                    {days.map(day => (
                      <TouchableOpacity
                        key={day.value}
                        style={[
                          styles.dayButton,
                          selectedDay === day.value && styles.dayButtonSelected,
                        ]}
                        onPress={() => setSelectedDay(day.value)}>
                        <Text
                          style={[
                            styles.dayButtonText,
                            selectedDay === day.value &&
                              styles.dayButtonTextSelected,
                          ]}>
                          {day.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.day ? (
                    <Text style={styles.errorText}>{errors.day}</Text>
                  ) : null}
                </View>
              )}

              {/* Yearly Month Selection */}
              {recurringType === 'yearly' && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Month of Year</Text>
                  <View style={styles.monthsGrid}>
                    {months.map(month => (
                      <TouchableOpacity
                        key={month.value}
                        style={[
                          styles.monthButton,
                          selectedMonth === month.value &&
                            styles.monthButtonSelected,
                        ]}
                        onPress={() => setSelectedMonth(month.value)}>
                        <Text
                          style={[
                            styles.monthButtonText,
                            selectedMonth === month.value &&
                              styles.monthButtonTextSelected,
                          ]}>
                          {month.label.slice(0, 3)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.month ? (
                    <Text style={styles.errorText}>{errors.month}</Text>
                  ) : null}
                </View>
              )}

              {/* Stopping Date */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Stopping Date</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateText}>
                    {moment(stoppingDate).format('MMM DD, YYYY')}
                  </Text>
                </TouchableOpacity>
                {errors.stoppingDate ? (
                  <Text style={styles.errorText}>{errors.stoppingDate}</Text>
                ) : null}
              </View>
            </>
          )}

          {/* Add Date Picker for one-time reminder */}
          {reminderType === 'one_Time' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reminder Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateText}>
                  {moment(reminderDate).format('MMM DD, YYYY')}
                </Text>
              </TouchableOpacity>
              {errors.reminderDate ? (
                <Text style={styles.errorText}>{errors.reminderDate}</Text>
              ) : null}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={{width: 12}} />
        <TouchableOpacity
          style={styles.previewButton}
          onPress={() => {
            if (validate()) {
              onPressPreview();
            }
          }}>
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
        <View style={{width: 12}} />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          is24Hour={false}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setReminderTime(selectedTime);
            }
          }}
        />
      )}

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={reminderType === 'one_Time' ? reminderDate : stoppingDate}
          mode="date"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              if (reminderType === 'one_Time') {
                setReminderDate(selectedDate);
              } else {
                setStoppingDate(selectedDate);
              }
            }
          }}
        />
      )}
    </View>
  );
};

export default ScheduleInfo;

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: responsiveWidth(4),
    padding: responsiveWidth(4),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  formTitle: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginBottom: responsiveWidth(4),
  },
  section: {
    marginBottom: responsiveWidth(4),
  },
  sectionTitle: {
    fontSize: fontSize.regularx,
    color: color.grayText,
    marginBottom: responsiveWidth(2),
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: responsiveWidth(2),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveWidth(6),
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: color.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color.primary,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: fontSize.regularx,
    color: color.black,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 8,
    padding: responsiveWidth(4),
    backgroundColor: color.white,
  },
  timeText: {
    fontSize: fontSize.regularx,
    color: color.black,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 8,
    padding: responsiveWidth(4),
    backgroundColor: color.white,
  },
  dateText: {
    fontSize: fontSize.regularx,
    color: color.black,
  },
  recurringOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: responsiveWidth(2),
  },
  recurringOption: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 8,
    paddingVertical: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(4),
    marginRight: responsiveWidth(2),
    marginBottom: responsiveWidth(2),
  },
  recurringOptionSelected: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  recurringOptionText: {
    fontSize: fontSize.regularx,
    color: color.black,
  },
  recurringOptionTextSelected: {
    color: color.white,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: responsiveWidth(2),
  },
  dayButton: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(2),
    marginBottom: responsiveWidth(2),
  },
  dayButtonSelected: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  dayButtonText: {
    fontSize: fontSize.regularx,
    color: color.black,
  },
  dayButtonTextSelected: {
    color: color.white,
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: responsiveWidth(2),
  },
  monthButton: {
    paddingVertical: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(4),
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 8,
    marginRight: responsiveWidth(2),
    marginBottom: responsiveWidth(2),
  },
  monthButtonSelected: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  monthButtonText: {
    fontSize: fontSize.regularx,
    color: color.black,
  },
  monthButtonTextSelected: {
    color: color.white,
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: responsiveWidth(4),
    backgroundColor: color.white,
    borderTopWidth: 1,
    borderTopColor: color.border,
  },
  backButton: {
    flex: 1,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 8,
    padding: responsiveWidth(4),
    alignItems: 'center',
  },
  backButtonText: {
    color: color.primary,
    fontSize: fontSize.regularx,
    fontWeight: '600',
  },
  previewButton: {
    flex: 1,
    backgroundColor: color.white,
    borderRadius: 8,
    padding: responsiveWidth(4),
    alignItems: 'center',
  },
  previewButtonText: {
    color: color.primary,
    fontSize: fontSize.regularx,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: color.primary,
    borderRadius: 8,
    padding: responsiveWidth(4),
    alignItems: 'center',
  },
  submitButtonText: {
    color: color.white,
    fontSize: fontSize.regularx,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: fontSize.small,
    marginTop: 4,
  },
});
