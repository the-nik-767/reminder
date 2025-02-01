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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

interface ScheduleInfoProps {
  onPressBack: () => void;
  onSubmit: (data: any) => void;
  initialData?: {
    reminder_type: 'one_Time' | 'recurring';
    reminder_date?: string;
    reminder_time: string;
    recurring_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    stopping_date?: string;
    day_of_month?: number;
    month_of_year?: number;
  };
}

const ScheduleInfo: React.FC<ScheduleInfoProps> = ({
  onPressBack,
  onSubmit,
  initialData,
}) => {
  const [reminderType, setReminderType] = useState<'one_Time' | 'recurring'>(initialData?.reminder_type || 'one_Time');
  const [selectedOption, setSelectedOption] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>(initialData?.recurring_type || 'daily');
  const [selectedDay, setSelectedDay] = useState<string>(initialData?.day_of_week || '');
  const [selectedDate, setSelectedDate] = useState<string>(initialData?.reminder_date || '');
  const [selectedTime, setSelectedTime] = useState<string>(initialData?.reminder_time || '');
  const [stoppingDate, setStoppingDate] = useState<string>(initialData?.stopping_date || '');
  const [selectedDayOfMonth, setSelectedDayOfMonth] = useState<number | null>(initialData?.day_of_month || null);
  const [selectedMonthOfYear, setSelectedMonthOfYear] = useState<number | null>(initialData?.month_of_year || null);
  
  // Date picker states
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isStopDatePickerVisible, setStopDatePickerVisible] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<'date' | 'time'>('date');

  const yearList = [{label: '1 Year', value: 'year'}];

  const recurringType = [
    {id: 1, title: 'Daily'},
    {id: 2, title: 'Weekly'},
    {id: 3, title: 'Monthly'},
    {id: 4, title: 'Yearly'},
  ];

  const recurringDays = [
    {id: 1, title: 'Monday'},
    {id: 2, title: 'Tuesday'},
    {id: 3, title: 'Wednesday'},
    {id: 4, title: 'Thursday'},
    {id: 5, title: 'Friday'},
    {id: 6, title: 'Saturday'},
    {id: 7, title: 'Sunday'},
  ];

  const handleDateConfirm = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = (date: Date) => {
    const formattedTime = moment(date).format('HH:mm:ss');
    setSelectedTime(formattedTime);
    setTimePickerVisible(false);
  };

  const handleStopDateConfirm = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setStoppingDate(formattedDate);
    setStopDatePickerVisible(false);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!selectedTime) {
      Alert.alert('Error', 'Please select reminder time');
      return;
    }

    if (reminderType === 'one_Time' && !selectedDate) {
      Alert.alert('Error', 'Please select reminder date');
      return;
    }

    if (reminderType === 'recurring') {
      if (!selectedOption) {
        Alert.alert('Error', 'Please select recurring type');
        return;
      }

      if (!stoppingDate) {
        Alert.alert('Error', 'Please select stopping date');
        return;
      }

      if (selectedOption === 'weekly' && !selectedDay) {
        Alert.alert('Error', 'Please select day of week');
        return;
      }

      if (selectedOption === 'monthly' && !selectedDayOfMonth) {
        Alert.alert('Error', 'Please select day of month');
        return;
      }

      if (selectedOption === 'yearly' && (!selectedMonthOfYear || !selectedDayOfMonth)) {
        Alert.alert('Error', 'Please select month and day');
        return;
      }
    }

    const scheduleData = {
      reminder_type: reminderType,
      reminder_time: selectedTime,
      ...(reminderType === 'one_Time' && {
        reminder_date: selectedDate,
      }),
      ...(reminderType === 'recurring' && {
        recurring_type: selectedOption.toLowerCase(),
        stopping_date: stoppingDate,
        ...(selectedOption === 'weekly' && {
          day_of_week: selectedDay.toLowerCase(),
        }),
        ...(selectedOption === 'monthly' && {
          day_of_month: selectedDayOfMonth,
        }),
        ...(selectedOption === 'yearly' && {
          day_of_month: selectedDayOfMonth,
          month_of_year: selectedMonthOfYear,
        }),
      }),
    };

    onSubmit(scheduleData);
  };

  const renderCalendar = () => {
    const days = Array.from({length: 31}, (_, i) => ({
      id: i + 1,
      value: String(i + 1),
    }));

    return (
      <>
        <Text style={styles.inputLabel}>{'Select day of the month'}</Text>
        <View style={styles.calendarContainer}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => setSelectedDayOfMonth(Number(day.value))}
              style={[
                styles.dayContainer,
                selectedDayOfMonth === Number(day.value) && styles.selectedDateContainer,
              ]}>
              <Text
                style={[
                  styles.dayTextContainer,
                  selectedDayOfMonth === Number(day.value) && styles.selectedTextDateContainer,
                ]}>
                {day.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Form Container */}
      <View style={{flex: 1}}>
        <View style={styles.formCard}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <Text style={styles.formTitle}>{'Schedule'}</Text>

            {/* Radio Button */}
            <Text style={styles.inputLabel}>{'Select Reminder Type'}</Text>
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.radioRow}
                onPress={() => setReminderType('one_Time')}>
                <View style={styles.radioOuter}>
                  {reminderType === 'one_Time' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioText}>One Time</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.radioRow, {marginTop: 8}]}
                onPress={() => setReminderType('recurring')}>
                <View style={styles.radioOuter}>
                  {reminderType === 'recurring' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioText}>Recurring</Text>
              </TouchableOpacity>
            </View>

            {/* One Time Reminder Date */}
            {reminderType === 'one_Time' && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{'Select Date'}</Text>
                <TouchableOpacity
                  style={styles.customerInputContainer}
                  onPress={() => setDatePickerVisible(true)}>
                  <TextInput
                    style={styles.customerInput}
                    value={selectedDate ? moment(selectedDate).format('DD MMM YYYY') : ''}
                    placeholder="Select Date"
                    editable={false}
                  />
                  <View style={styles.userIcon}>
                    <Image source={icons.icOneTime} style={styles.iconStyle} />
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/* Recurring Options */}
            {reminderType === 'recurring' && (
              <>
                <Text style={styles.inputLabel}>{'Select Recurring Type'}</Text>
                <View style={styles.optionContainer}>
                  {recurringType.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.option,
                        selectedOption === type.title.toLowerCase() && styles.selectedOption,
                      ]}
                      onPress={() => setSelectedOption(type.title.toLowerCase() as any)}>
                      <Text
                        style={[
                          styles.optionText,
                          selectedOption === type.title.toLowerCase() && styles.selectedOptionText,
                        ]}>
                        {type.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Weekly Selection */}
                {selectedOption === 'weekly' && (
                  <>
                    <Text style={styles.inputLabel}>{'Select Day'}</Text>
                    <View style={styles.optionContainer}>
                      {recurringDays.map((day) => (
                        <TouchableOpacity
                          key={day.id}
                          style={[
                            styles.option,
                            selectedDay === day.title && styles.selectedDayOption,
                          ]}
                          onPress={() => setSelectedDay(day.title)}>
                          <Text
                            style={[
                              styles.daysText,
                              selectedDay === day.title && styles.selectedDaysText,
                            ]}>
                            {day.title.slice(0, 3)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}

                {/* Monthly Selection */}
                {selectedOption === 'monthly' && renderCalendar()}

                {/* Yearly Selection */}
                {selectedOption === 'yearly' && (
                  <>
                    <Text style={styles.inputLabel}>{'Select Month'}</Text>
                    <View style={styles.optionContainer}>
                      {Array.from({length: 12}, (_, i) => ({
                        id: i + 1,
                        title: moment().month(i).format('MMM'),
                      })).map((month) => (
                        <TouchableOpacity
                          key={month.id}
                          style={[
                            styles.option,
                            selectedMonthOfYear === month.id && styles.selectedDayOption,
                          ]}
                          onPress={() => setSelectedMonthOfYear(month.id)}>
                          <Text
                            style={[
                              styles.daysText,
                              selectedMonthOfYear === month.id && styles.selectedDaysText,
                            ]}>
                            {month.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    {renderCalendar()}
                  </>
                )}

                {/* Stopping Date */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>{'Stop Repeating'}</Text>
                  <TouchableOpacity
                    style={styles.customerInputContainer}
                    onPress={() => setStopDatePickerVisible(true)}>
                    <TextInput
                      style={styles.customerInput}
                      value={stoppingDate ? moment(stoppingDate).format('DD MMM YYYY') : ''}
                      placeholder="Select Date"
                      editable={false}
                    />
                    <View style={styles.userIcon}>
                      <Image source={icons.icOneTime} style={styles.iconStyle} />
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Time Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{'Select Time'}</Text>
              <TouchableOpacity
                style={styles.customerInputContainer}
                onPress={() => setTimePickerVisible(true)}>
                <TextInput
                  style={styles.customerInput}
                  value={selectedTime ? moment(selectedTime, 'HH:mm:ss').format('hh:mm A') : ''}
                  placeholder="Select Time"
                  editable={false}
                />
                <View style={styles.userIcon}>
                  <Image source={icons.icTime} style={styles.iconStyle} />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Date/Time Pickers */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isStopDatePickerVisible}
        mode="date"
        onConfirm={handleStopDateConfirm}
        onCancel={() => setStopDatePickerVisible(false)}
        minimumDate={new Date()}
      />

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.nextButton, styles.backButton]}
          onPress={onPressBack}>
          <Text style={[styles.nextButtonText, {color: color.primary}]}>
            Back
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.1}} />
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>View Preview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleInfo;

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: responsiveWidth(4),
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
  inputGroup: {
    marginBottom: responsiveWidth(5),
  },
  inputLabel: {
    fontSize: fontSize.regularx,
    color: color.grayText,
    marginBottom: responsiveWidth(1),
  },
  customerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    paddingRight: 8,
  },
  customerInput: {
    flex: 1,
    padding: responsiveWidth(4),
    fontSize: fontSize.regularx,
  },
  userIcon: {
    marginLeft: 8,
    padding: 4,
  },
  iconStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
  section: {
    paddingBottom: responsiveWidth(4),
    flexDirection: 'row',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: responsiveWidth(4),
  },
  option: {
    flex: 1,
    paddingVertical: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.grayText,
    marginHorizontal: responsiveWidth(1),
    marginVertical: responsiveWidth(1),
  },
  selectedOption: {
    borderColor: color.primary,
    borderWidth: 1,
  },
  selectedDayOption: {
    backgroundColor: color.primary,
    borderColor: color.primary,
    borderWidth: 1,
  },
  optionText: {
    color: color.grayText,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
  },
  daysText: {
    color: color.grayText,
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
  },
  selectedDaysText: {
    color: color.white,
  },
  selectedOptionText: {
    color: color.primary,
  },
  bottomContainer: {
    padding: responsiveWidth(4),
    backgroundColor: color.primaryBackground,
    flexDirection: 'row',
  },
  nextButton: {
    backgroundColor: color.primary,
    borderRadius: 12,
    padding: responsiveWidth(4),
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
    flex: 1,
    borderWidth: 1,
    borderColor: color.primary,
  },
  backButton: {
    backgroundColor: color.white,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: color.border,
    padding: responsiveWidth(2),
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: responsiveWidth(4),
    marginTop: responsiveWidth(1),
  },
  dayContainer: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(0.2),
    borderRadius: 8,
  },
  selectedDateContainer: {
    backgroundColor: color.primary,
  },
  dayTextContainer: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    color: color.black,
  },
  selectedTextDateContainer: {
    color: color.white,
  },
});
