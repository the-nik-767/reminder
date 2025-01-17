import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
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
import Business from '../../assets/svgs/business.svg';
import Celender from '../../assets/svgs/celender.svg';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = React.useState<any>(null);

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
        <View>
          <Text style={styles.profileTextTitle}>{title}</Text>
          <Text style={styles.profileTextDetails}>{value}</Text>
        </View>
      </View>
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
            svgSource={<Profile width={24} height={24} />}
            title={'Name'}
            value={'Aadhya Patel'}
          />
          <DetailsSection
            svgSource={<Email width={24} height={24} />}
            title={'Email'}
            value={'aadhyapatel@gmail.com'}
          />
          <DetailsSection
            svgSource={<Phone width={24} height={24} />}
            title={'Phone Number'}
            value={'+91 98855 89566'}
          />
          <DetailsSection
            svgSource={<Date width={24} height={24} />}
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
            svgSource={<Profile width={24} height={24} />}
            title={'Business Name'}
            value={'Hermiston and Sons'}
          />
          <DetailsSection
            svgSource={<Email width={24} height={24} />}
            title={'Email'}
            value={'kristina.kuphal@lebsack.info'}
          />
          <DetailsSection
            svgSource={<Phone width={24} height={24} />}
            title={'Phone Number'}
            value={'+91 98855 89566'}
          />
          <DetailsSection
            svgSource={<Phone width={24} height={24} />}
            title={'Category'}
            value={'IT technology'}
          />
          <DetailsSection
            svgSource={<Date width={24} height={24} />}
            title={'Address'}
            value={
              '3766 Braxton Street Bourbonnais, near school road, IL 60914'
            }
            containerStyle={{marginBottom: 0}}
          />
        </View>
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
    fontSize: 14,
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
});

export default ProfileScreen;
