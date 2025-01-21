import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const ScheduleInfo = ({onPressBack, onPressPreview}: any) => {
  const [reminderType, setReminderType] = useState('one_time');
  const [selectedOption, setSelectedOption] = useState('Monthly');
  const [selectedDay, setSelectedDay] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [arrayOfDays, setArrayOfDays] = useState([]);
  const [openYear, setOpenYear] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const renderCalendar = () => {
    return (
      <>
        <Text style={styles.inputLabel}>{'Repeat by day of the month'}</Text>
        <View style={styles.calendarContainer}>
          {arrayOfDays?.map((i, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  setSelectedDate(i.value);
                }}
                style={[
                  styles.dayContainer,
                  i.value == selectedDate && styles.selectedDateContainer,
                ]}>
                <Text
                  style={[
                    styles.dayTextContainer,
                    i.value == selectedDate && styles.selectedTextDateContainer,
                  ]}>
                  {i?.value}
                </Text>
              </TouchableOpacity>
            );
          })}
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
                onPress={() => setReminderType('one_time')}>
                <View style={styles.radioOuter}>
                  {reminderType === 'one_time' && (
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

            {/* Recurring */}
            {reminderType === 'recurring' ? (
              <>
                <Text style={styles.inputLabel}>{'Select Recurring Type'}</Text>
                <View style={styles.optionContainer}>
                  {recurringType?.map((i, index) => {
                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        style={[
                          styles.option,
                          selectedOption === i.title && styles.selectedOption,
                          {
                            marginHorizontal: responsiveWidth(
                              index != 0 || index != 3 ? 0.5 : 0,
                            ),
                          },
                        ]}
                        onPress={() => setSelectedOption(i.title)}>
                        <Text
                          style={[
                            styles.optionText,
                            selectedOption === i.title &&
                              styles.selectedOptionText,
                          ]}>
                          {i.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Day Reminder */}
                {selectedOption === 'Weekly' && (
                  <>
                    <Text style={styles.inputLabel}>
                      {'Select Day Reminder'}
                    </Text>
                    <View style={styles.optionContainer}>
                      {recurringDays?.map((i, index) => {
                        return (
                          <TouchableOpacity
                            key={index.toString()}
                            style={[
                              styles.option,
                              selectedDay === i.title &&
                                styles.selectedDayOption,
                              {
                                marginHorizontal: responsiveWidth(
                                  index != 0 || index != 7 ? 0.5 : 0,
                                ),
                              },
                            ]}
                            onPress={() => setSelectedDay(i.title)}>
                            <Text
                              style={[
                                styles.daysText,
                                selectedDay === i.title &&
                                  styles.selectedDaysText,
                              ]}>
                              {i.title?.slice(0, 3)}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </>
                )}

                {selectedOption === 'Monthly' && (
                  <>
                    <Text style={styles.inputLabel}>{'Repeat Every'}</Text>
                    <View style={styles.dropdownContainer}>
                      <DropDownPicker
                        open={open}
                        value={selectedMonth}
                        items={monthList}
                        setOpen={setOpen}
                        setValue={setSelectedMonth}
                        onSelectItem={data => {
                          const list = Array.from(
                            {length: data?.day},
                            (_, index) => ({
                              id: index + 1, // id will be 1-based
                              value: String(index + 1), // value will be the string of the index + 1
                            }),
                          );
                          setArrayOfDays(list);
                        }}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownList}
                        placeholder="Select Month"
                        placeholderStyle={{color: color.gray}}
                        listMode="SCROLLVIEW"
                        zIndex={3000}
                      />
                    </View>

                    {renderCalendar()}
                  </>
                )}

                {selectedOption === 'Yearly' && (
                  <>
                    <Text style={styles.inputLabel}>{'Repeat Every'}</Text>
                    <View style={styles.dropdownContainer}>
                      <DropDownPicker
                        open={openYear}
                        value={selectedYear}
                        items={yearList}
                        setOpen={setOpenYear}
                        setValue={setSelectedYear}
                        onSelectItem={data => {}}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownList}
                        placeholder="Select Year"
                        placeholderStyle={{color: color.gray}}
                        listMode="SCROLLVIEW"
                        zIndex={3000}
                      />
                    </View>

                    <Text style={styles.inputLabel}>
                      {'Repeat by Month of the Year'}
                    </Text>
                    <View style={styles.dropdownContainer}>
                      <DropDownPicker
                        open={open}
                        value={selectedMonth}
                        items={monthListWithShortName}
                        setOpen={setOpen}
                        setValue={setSelectedMonth}
                        onSelectItem={data => {
                          const list = Array.from(
                            {length: data?.day},
                            (_, index) => ({
                              id: index + 1, // id will be 1-based
                              value: String(index + 1), // value will be the string of the index + 1
                            }),
                          );
                          setArrayOfDays(list);
                        }}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownList}
                        placeholder="Select Month"
                        placeholderStyle={{color: color.gray}}
                        listMode="SCROLLVIEW"
                        zIndex={3000}
                      />
                    </View>

                    {renderCalendar()}
                  </>
                )}
              </>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                {'Select Time for Reminder'}
              </Text>
              <View style={styles.customerInputContainer}>
                <TextInput
                  style={styles.customerInput}
                  value="7:00 AM"
                  placeholder="Select Time"
                  placeholderTextColor="#000000"
                />
                <TouchableOpacity style={styles.userIcon}>
                  <Image source={icons.icTime} style={styles.iconStyle} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{'Stop Repeating Reminder'}</Text>
              <View style={styles.customerInputContainer}>
                <TextInput
                  style={styles.customerInput}
                  value="11 Jan 2025"
                  placeholder="Select Date"
                  placeholderTextColor="#000000"
                />
                <TouchableOpacity style={styles.userIcon}>
                  <Image source={icons.icOneTime} style={styles.iconStyle} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.nextButton, styles.backButton]}
          onPress={() => onPressBack()}>
          <Text style={[styles.nextButtonText, {color: color.primary}]}>
            Back
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.1}} />
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => onPressPreview()}>
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
    // flex: 1,
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
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: responsiveWidth(4),
    fontSize: fontSize.regularx,
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
  bottomContainer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
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
  iconStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
  //   Radio style
  section: {
    paddingBottom: responsiveWidth(4),
    // borderBottomWidth: 1,
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: fontSize.regularx,
    fontWeight: '500',
    marginBottom: responsiveWidth(3.2),
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
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
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
  },
  selectedOption: {
    // backgroundColor: '#e6f0ff',
    borderColor: '#0056d2',
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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveWidth(4),
  },
  dropdownContainer: {
    zIndex: 3000,
    width: '100%',
    marginBottom: responsiveWidth(4),
  },
  dropdown: {
    borderColor: color.lightgray,
    borderRadius: responsiveWidth(2),
    marginTop: responsiveWidth(1),
    height: responsiveWidth(12),
    backgroundColor: 'transparent',
    zIndex: 3000,
  },
  dropdownList: {
    borderColor: color.lightgray,
    backgroundColor: color.white,
    zIndex: 2000,
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
