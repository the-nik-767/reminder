import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../constant/theme';
import {Header} from '../../components';
import {icons} from '../../assets';

const ReminderDetails = () => {
  const DetailsConainer = ({title, value, detailsValue}: any) => {
    return (
      <View style={{marginBottom: responsiveWidth(0)}}>
        <Text style={styles.detailsTitleStyle}>{title}</Text>
        <Text style={[styles.detailsValue, detailsValue]}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Reminder Details"
        showBack
        rightIcon={icons.icEdit}
        rightIconStyle={styles.editIconStyle}
      />

      <ScrollView style={{flex: 1}}>
        {/* Main Content Card */}
        <View style={styles.card}>
          {/* Reminder Name */}
          <View style={styles.reminderNameContainer}>
            {/* <Icon name="calendar" size={24} color="#007AFF" /> */}
            <Image source={icons.icCalendarReminder} style={styles.iconStyle} />
            <Text style={styles.reminderName}>Reminder Name ABC</Text>
          </View>

          {/* Message Preview */}
          <View style={styles.messagePreviewContainer}>
            <View style={styles.messagePreview}>
              <Text style={styles.messageText}>
                Happy Birthday Janak Vaghela! 🎉🎂{'\n\n'}
                We at Vanani Clinic wish you a wonderful day filled with joy and
                good health.{'\n\n'}
                9876543210 call us to book your appointment and for more
                information!{'\n\n'}- Vanani Clinic
              </Text>
              <Text style={styles.messageTime}>1:01 PM</Text>
            </View>
          </View>

          {/* Reminder Info Grid */}

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <DetailsConainer
                title={'Reminder Status'}
                detailsValue={{color: color.primaryGreen}}
                value={'Upcoming'}
              />
            </View>
            <View style={styles.infoColumn}>
              <DetailsConainer title={'Reminder Type'} value={'Recurring'} />
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <DetailsConainer title={'Repeat Every'} value={'Sunday'} />
            </View>
            <View style={styles.infoColumn}>
              <DetailsConainer title={'Time'} value={'7:00 AM'} />
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <DetailsConainer title={'Recurring Type'} value={'Weekly'} />
            </View>
            <View style={styles.infoColumn}>
              <DetailsConainer title={'Stop Repeating'} value={'31 Dec 2025'} />
            </View>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Added Customers</Text>

          <View style={styles.customerCard}>
            <View style={styles.customerInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>Maya Patel</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={icons.icCall} style={styles.callIconStyle} />
                  <Text style={styles.customerPhone}>98855 89566</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
              <Image source={icons.icTrash} style={styles.deleteIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBackground,
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
    marginHorizontal: responsiveWidth(4),
    marginVertical: responsiveWidth(4),
    marginTop: responsiveWidth(0),
    padding: responsiveWidth(4),
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
    marginBottom: responsiveWidth(3),
  },
  reminderName: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginLeft: responsiveWidth(1),
    color: color.black,
    fontFamily: fontFamily.regular,
  },
  messagePreviewContainer: {
    backgroundColor: '#e2ded7',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveWidth(4),
    paddingBottom: responsiveWidth(6),
    marginBottom: responsiveWidth(3),
  },
  messagePreview: {
    backgroundColor: color.white,
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
    // gap: '4%',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: responsiveWidth(4),
  },
  infoColumn: {
    flex: 1,
  },

  customersSection: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(3.5),
    marginBottom: responsiveWidth(4),
  },
  customerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    fontWeight: '600',
    color: color.black,
  },
  customerName: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    marginBottom: 4,
    color: color.black,
  },
  customerPhone: {
    fontSize: fontSize.minix,
    color: color.grayText,
    fontFamily: fontFamily.regular,
  },
  deleteButton: {
    padding: 8,
  },
  editIconStyle: {
    height: responsiveWidth(4.5),
    width: responsiveWidth(4.5),
    resizeMode: 'contain',
  },
  iconStyle: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
  detailsValue: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    marginBottom: responsiveWidth(0),
    color: color.black,
    fontWeight: '500',
  },
  detailsTitleStyle: {
    fontSize: fontSize.minix,
    fontFamily: fontFamily.regular,
    marginBottom: responsiveWidth(1),
    color: color.grayText,
  },
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
    marginBottom: responsiveWidth(8),
  },
  formTitle: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginBottom: responsiveWidth(4),
  },
  deleteIconStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
  callIconStyle: {
    height: responsiveWidth(3),
    width: responsiveWidth(3),
    resizeMode: 'contain',
    marginRight: responsiveWidth(1),
  },
});

export default ReminderDetails;
