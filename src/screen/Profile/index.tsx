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
import {responsiveWidth} from '../../constant/theme';

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

  return (
    <MainContainer>
      <Header
        title="My Profile"
        rightIcon={icons.icEdit}
        rightIconStyle={styles.editIconStyle}
      />
      <ScrollView style={styles.container}>
        {/* Logout Button */}
        {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}
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
});

export default ProfileScreen;
