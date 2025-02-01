import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  color,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../constant/theme';
import {icons} from '../../../assets';
import moment from 'moment';

interface PreviewReminderProps {
  data: {
    reminder_name: string;
    customer_id: number | null;
    template_id: number | null;
    variables: Array<{name: string; value: string}>;
    reminder_type: 'one_Time' | 'recurring';
    reminder_date?: string;
    reminder_time: string;
    recurring_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    stopping_date?: string;
    day_of_week?: string;
    day_of_month?: number;
    month_of_year?: number;
  };
  onPressConfirm: () => void;
  onPressClose: () => void;
  visible: boolean;
}

const PreviewReminder: React.FC<PreviewReminderProps> = ({
  data,
  onPressConfirm,
  onPressClose,
  visible,
}) => {
  const DetailsContainer = ({title, value}: {title: string; value: string}) => {
    return (
      <View style={{marginBottom: responsiveWidth(3)}}>
        <Text style={styles.detailsTitleStyle}>{title}</Text>
        <Text style={styles.detailsValue}>{value}</Text>
      </View>
    );
  };

  const formatRecurringDetails = () => {
    if (data.reminder_type !== 'recurring' || !data.recurring_type) return '';

    let details = '';
    switch (data.recurring_type) {
      case 'daily':
        details = 'Daily';
        break;
      case 'weekly':
        details = `Weekly on ${data.day_of_week}`;
        break;
      case 'monthly':
        details = `Monthly on day ${data.day_of_month}`;
        break;
      case 'yearly':
        details = `Yearly on ${moment().month(data.month_of_year! - 1).format('MMMM')} ${data.day_of_month}`;
        break;
    }
    return details;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.headerContainer}>
              <Text style={styles.formTitle}>{'Reminder Preview'}</Text>
              <TouchableOpacity onPress={onPressClose}>
                <Image
                  source={icons.icCloseThin}
                  style={styles.closeIconStyle}
                />
              </TouchableOpacity>
            </View>

            <DetailsContainer
              title={'Reminder Name'}
              value={data.reminder_name}
            />

            {/* Message Preview */}
            <View style={styles.cardContainer}>
              <View style={styles.cardSubContainer}>
                <Text style={styles.messageText}>
                  {data.variables.map(v => `${v.name}: ${v.value}`).join('\n')}
                </Text>
              </View>
            </View>

            {/* Reminder Details */}
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <DetailsContainer 
                  title={'Reminder Type'} 
                  value={data.reminder_type === 'one_Time' ? 'One Time' : 'Recurring'} 
                />
              </View>
              {data.reminder_type === 'recurring' && (
                <View style={{flex: 1}}>
                  <DetailsContainer 
                    title={'Recurring Type'} 
                    value={data.recurring_type?.charAt(0).toUpperCase() + data.recurring_type?.slice(1) || ''} 
                  />
                </View>
              )}
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                {data.reminder_type === 'one_Time' ? (
                  <DetailsContainer 
                    title={'Date'} 
                    value={moment(data.reminder_date).format('DD MMM YYYY')} 
                  />
                ) : (
                  <DetailsContainer 
                    title={'Repeat Schedule'} 
                    value={formatRecurringDetails()} 
                  />
                )}
              </View>
              <View style={{flex: 1}}>
                <DetailsContainer 
                  title={'Time'} 
                  value={moment(data.reminder_time, 'HH:mm:ss').format('hh:mm A')} 
                />
              </View>
            </View>

            {data.reminder_type === 'recurring' && data.stopping_date && (
              <DetailsContainer 
                title={'Stop Repeating'} 
                value={moment(data.stopping_date).format('DD MMM YYYY')} 
              />
            )}
          </ScrollView>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={onPressConfirm}>
            <Text style={styles.nextButtonText}>{'Confirm Schedule'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PreviewReminder;

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
    padding: responsiveWidth(4),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveWidth(4),
  },
  formTitle: {
    fontSize: fontSize.regular,
    fontWeight: '600',
  },
  detailsValue: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    color: color.black,
  },
  detailsTitleStyle: {
    fontSize: fontSize.minix,
    fontFamily: fontFamily.regular,
    color: color.grayText,
  },
  closeIconStyle: {
    height: responsiveWidth(7),
    width: responsiveWidth(7),
    resizeMode: 'contain',
    tintColor: color.primary,
  },
  nextButton: {
    backgroundColor: color.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: responsiveWidth(4),
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  cardContainer: {
    backgroundColor: '#e2ded7',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveWidth(4),
    paddingBottom: responsiveWidth(6),
    marginBottom: responsiveWidth(3),
  },
  cardSubContainer: {
    borderRadius: 8,
    backgroundColor: color.white,
    paddingHorizontal: responsiveWidth(2),
    paddingTop: responsiveWidth(3),
    paddingBottom: responsiveWidth(4),
    minHeight: responsiveHeight(20),
  },
  messageText: {
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    color: color.black,
    lineHeight: fontSize.regularx * 1.5,
  },
});
