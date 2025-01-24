import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, MainContainer} from '../../components';
import {icons} from '../../assets';
import {
  color,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../constant/theme';
import Edit from '../../assets/svgs/edit.svg';
import Profile from '../../assets/svgs/profileIc.svg';
import Phone from '../../assets/svgs/phone.svg';
import Email from '../../assets/svgs/email.svg';
import Date from '../../assets/svgs/Date.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import Business from '../../assets/svgs/business.svg';
import Celender from '../../assets/svgs/celender.svg';
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = React.useState<any>(null);
  const [open, setOpen] = useState(false);
  const [businessCategories] = useState([
    {label: 'Select Business Category', value: ''},
    {label: 'Retail', value: 'retail'},
    {label: 'Restaurant', value: 'restaurant'},
    {label: 'Technology', value: 'technology'},
    {label: 'Healthcare', value: 'healthcare'},
    {label: 'Education', value: 'education'},
  ]);

  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('USER_DATA');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['USER_DATA', 'USER_TOKEN']);
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const DetailsSection = ({
    title,
    value,
    source,
    svgSource,
    containerStyle,
  }: any) => {
    return (
      <View style={[styles.profileSection2, containerStyle]}>
        {svgSource && svgSource}
        {source && <Image source={source} style={styles.iconStyle} />}
        <View>
          <Text style={styles.profileTextTitle}>{title}</Text>
          <Text style={styles.profileTextDetails}>{value}</Text>
        </View>
      </View>
    );
  };

  const SectionCard = ({
    source,
    title,
    value,
    iconStyle,
    showArrow,
    onPress,
  }: any) => {
    return (
      <TouchableOpacity
        style={styles.infoCard}
        onPress={onPress}
        disabled={!onPress}>
        <View style={styles.sectinCard}>
          <Image
            source={source}
            style={[
              styles.iconStyle,
              {marginRight: responsiveWidth(3)},
              iconStyle,
            ]}
          />
          <View style={{alignSelf: 'center', flex: 1}}>
            <Text style={styles.profileText}>{title}</Text>
            {value ? (
              <Text style={[styles.profileTextTitle, {marginLeft: 0}]}>
                {value}
              </Text>
            ) : null}
          </View>
          {showArrow ? (
            <View style={{alignSelf: 'center'}}>
              <Icon name="chevron-forward" size={20} color={color.grayText} />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainContainer>
      <Header
        title="My Profile"
        rightIcon={icons.icEdit}
        rightIconStyle={styles.editIconStyle}
        onPress={() => navigation.navigate('ProfileEdit')}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.infoCard}>
          {/* Profile Icon and Info */}
          <View style={styles.profileSection}>
            <Text style={styles.profileText}>{'Personal Details'}</Text>
          </View>

          <DetailsSection
            svgSource={
              <Profile width={responsiveWidth(6)} height={responsiveWidth(6)} />
            }
            title={'Name'}
            value={'Aadhya Patel'}
          />
          <DetailsSection
            svgSource={
              <Email width={responsiveWidth(6)} height={responsiveWidth(6)} />
            }
            title={'Email'}
            value={'aadhyapatel@gmail.com'}
          />
          <DetailsSection
            svgSource={
              <Phone width={responsiveWidth(6)} height={responsiveWidth(6)} />
            }
            title={'Phone Number'}
            value={'+91 98855 89566'}
          />
          <DetailsSection
            svgSource={
              <Date width={responsiveWidth(6)} height={responsiveWidth(6)} />
            }
            title={'Date of Birth'}
            value={'11 Oct 1996'}
            containerStyle={{marginBottom: 0}}
          />
        </View>

        {/* Business Details */}
        <View style={styles.infoCard}>
          {/* Profile Icon and Info */}
          <View style={styles.profileSection}>
            <Text style={styles.profileText}>{'business details'}</Text>
          </View>

          <DetailsSection
            source={icons.icBusiness}
            title={'Business Name'}
            value={'Hermiston and Sons'}
          />
          <DetailsSection
            svgSource={
              <Email width={responsiveWidth(6)} height={responsiveWidth(6)} />
            }
            title={'Email'}
            value={'kristina.kuphal@lebsack.info'}
          />
          <DetailsSection
            svgSource={
              <Phone width={responsiveWidth(6)} height={responsiveWidth(6)} />
            }
            title={'Phone Number'}
            value={'+91 98855 89566'}
          />
          <DetailsSection
            source={icons.icCategory}
            title={'Category'}
            value={'IT technology'}
          />
          <DetailsSection
            source={icons.icLocation}
            title={'Address'}
            value={
              '3766 Braxton Street Bourbonnais, near school road, IL 60914'
            }
            containerStyle={{marginBottom: 0}}
          />
        </View>

        <SectionCard
          source={icons.icWallet}
          title={'Wallet'}
          value={'Balance : $500.50'}
          showArrow
        />

        <View style={styles.infoCard}>
          <View style={styles.sectinCard}>
            <Image
              source={icons.icLanguage}
              style={[styles.iconStyle, {marginRight: responsiveWidth(3)}]}
            />
            <View style={{alignSelf: 'center', flex: 1}}>
              <Text style={styles.profileText}>{'Select language'}</Text>
            </View>
          </View>

          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              value={'English'}
              items={businessCategories}
              setOpen={setOpen}
              onOpen={() => {
                Keyboard.dismiss();
              }}
              setValue={callback => {}}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownList}
              placeholder="Select Language"
              placeholderStyle={{color: color.gray}}
              listMode="SCROLLVIEW"
              zIndex={3000}
            />
          </View>
        </View>

        <SectionCard source={icons.icLock} title={'Reset password'} showArrow />
        <SectionCard
          source={icons.icCall}
          title={'Customer support'}
          iconStyle={styles.callIconStyle}
        />
        <SectionCard
          source={icons.icPrivacyPolicy}
          title={'Privacy policy'}
          showArrow
        />
        <SectionCard
          source={icons.icLogout}
          title={'Logout'}
          onPress={handleLogout}
        />
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editIconStyle: {
    height: responsiveWidth(4.5),
    width: responsiveWidth(4.5),
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: color.white,
    margin: responsiveWidth(4),
    marginTop: 0,
    borderRadius: 10,
    padding: responsiveWidth(4),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
  },
  profileSection2: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
  },
  profileText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.regular,
    fontWeight: '600',
    textAlign: 'left',
    color: color.black,
  },
  profileTextTitle: {
    fontFamily: 'Inter',
    fontSize: fontSize.regularx,
    fontWeight: '500',
    lineHeight: 16.94,
    letterSpacing: -0.28,
    textAlign: 'left',
    marginLeft: responsiveWidth(3),
    color: color.gray,
  },
  profileTextTitle2: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.regularx,
    fontWeight: '500',
    textAlign: 'left',
    color: color.black,
    marginHorizontal: responsiveWidth(1),
  },
  profileTextDetails: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.36,
    letterSpacing: -0.32,
    textAlign: 'left',
    marginLeft: responsiveWidth(3),
    color: color.black,
  },
  iconStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
  callIconStyle: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    marginRight: responsiveWidth(3),
    marginLeft: responsiveWidth(1),
    tintColor: color.primary,
  },
  sectinCard: {
    flexDirection: 'row',
  },
  dropdownContainer: {
    zIndex: 3000,
    width: '100%',
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
});

export default ProfileScreen;
