import {
  FlatList,
  Platform,
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
import TempletDetails from './templetDetails';
import {SearchBar} from 'react-native-screens';
import Searchbox from '../../../components/common/searchbox';
import {templetDetails} from '../../../constant/global';

const SelectTemplet = ({onPressBack, onPressSave}) => {
  const [currentMode, setCurrentMode] = useState('select_mode');
  const templetList = [
    templetDetails,
    templetDetails,
    templetDetails,
    templetDetails,
    templetDetails,
    templetDetails,
    templetDetails,
    templetDetails,
    templetDetails,
    templetDetails,
    templetDetails,
  ];
  return (
    <View style={{flex: 1}}>
      {currentMode == 'select_mode' ? (
        <>
          <View style={{flex: 1}}>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>{'Selected Templet'}</Text>
              <Searchbox
                placeholder={'Search Templet by Category'}
                searchContainerStyle={{
                  marginHorizontal: 0,
                  marginBottom: responsiveWidth(4),
                }}
              />

              <FlatList
                data={templetList}
                keyExtractor={(item, index) => index?.toString()}
                numColumns={3}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={styles.itemContainer}
                      onPress={() => setCurrentMode('edit_mode')}>
                      <View style={styles.cardContainer}>
                        <View style={styles.messageContainer}>
                          <Text style={styles.messageTextStyle}>
                            {item?.sampleMessage}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.titleStyle}>
                        {item?.templateDisaplyName}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => onPressBack()}>
              <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TempletDetails
            onPressSave={() => {
              onPressSave();
            }}
            onPressBack={() => {
              setCurrentMode('select_mode');
            }}
          />
        </>
      )}
    </View>
  );
};

export default SelectTemplet;

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
    marginBottom: responsiveWidth(2),
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
    padding: responsiveWidth(4),
    backgroundColor: color.primaryBackground,
  },
  nextButton: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: responsiveWidth(4),
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
    borderWidth: 1,
    borderColor: color.primary,
  },
  nextButtonText: {
    color: color.primary,
    fontSize: fontSize.regular,
    fontWeight: '600',
    fontFamily: fontFamily.regular,
  },
  itemContainer: {
    width: responsiveWidth(26),
    height: responsiveWidth(26),
    marginRight: responsiveWidth(3),
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 8,
    marginBottom: responsiveWidth(3),
  },
  cardContainer: {
    backgroundColor: '#e2ded7',
    padding: '8%',
    paddingBottom: '12%',
    flex: 1,
  },
  messageContainer: {
    backgroundColor: color.white,
    borderRadius: 6,
    padding: '5%',
    flex: 1,
  },
  messageTextStyle: {
    fontSize: fontSize.xxxxsmall,
    fontFamily: fontFamily.regular,
    color: color.black,
  },
  titleStyle: {
    fontSize: fontSize.xxxxsmall,
    fontFamily: fontFamily.regular,
    color: color.grayText,
    padding: '4%',
  },
});
