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
import {templetDetails} from '../../../constant/global';

const PreviewReminder = ({onPressConfirm, onPressClose, visible}: any) => {
  const DetailsConainer = ({title, value}: any) => {
    return (
      <View style={{marginBottom: responsiveWidth(3)}}>
        <Text style={styles.detailsTitleStyle}>{title}</Text>
        <Text style={styles.detailsValue}>{value}</Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.formTitle}>{'Reminder Preview'}</Text>
              <TouchableOpacity onPress={onPressClose}>
                <Image
                  source={icons.icCloseThin}
                  style={styles.closeIconStyle}
                />
              </TouchableOpacity>
            </View>

            <DetailsConainer
              title={'Reminder Name'}
              value={'Customer Birthday'}
            />
            <DetailsConainer
              title={'Customer Name'}
              value={'Mahi Patel, Tanvi Patel'}
            />

            {/* Message */}
            <View style={styles.cardContainer}>
              <View style={styles.cardSubContainer}>
                <Text>{templetDetails?.message}</Text>
              </View>
            </View>

            {/* extra detail */}
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <DetailsConainer title={'Reminder Type'} value={'Recurring'} />
              </View>
              <View style={{flex: 1}}>
                <DetailsConainer title={'Recurring Type'} value={'Weekly'} />
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <DetailsConainer title={'Repeat Every'} value={'Sunday'} />
              </View>
              <View style={{flex: 1}}>
                <DetailsConainer title={'Time'} value={'7:00 AM'} />
              </View>
            </View>

            <DetailsConainer title={'Stop Repeating'} value={'31 Dec 2025'} />
          </ScrollView>
          {/* Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => onPressConfirm()}>
            <Text style={styles.nextButtonText}>{'confirmed schedule'}</Text>
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
  formTitle: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginBottom: responsiveWidth(0),
  },
  detailsValue: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    marginBottom: responsiveWidth(0),
    color: color.black,
  },
  detailsTitleStyle: {
    fontSize: fontSize.minix,
    fontFamily: fontFamily.regular,
    marginBottom: responsiveWidth(0),
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
    minHeight: responsiveHeight(30),
  },
});
