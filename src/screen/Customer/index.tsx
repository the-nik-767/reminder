import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MainContainer} from '../../components';
import {Header} from '../../components/common/header';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../constant/theme';
import {icons} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {customerService, Customer} from '../../services/customer/customer.service';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  CustomerDetails: {
    customerData: CustomerData;
  };
  AddNewCustomer: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Color palette for avatars
const AVATAR_COLORS = {
  A: '#E8EAF6',
  B: '#E3F2FD',
  C: '#E0F7FA',
  D: '#E0F2F1',
  E: '#E8F5E9',
  F: '#F1F8E9',
  G: '#F9FBE7',
  H: '#FFFDE7',
  I: '#FFF8E1',
  J: '#FFF3E0',
  K: '#FBE9E7',
  L: '#FFEBEE',
  M: '#FCE4EC',
  N: '#F3E5F5',
  O: '#EDE7F6',
  P: '#E8EAF6',
  Q: '#E3F2FD',
  R: '#E1F5FE',
  S: '#E0F7FA',
  T: '#E0F2F1',
  U: '#E8F5E9',
  V: '#F1F8E9',
  W: '#F9FBE7',
  X: '#FFFDE7',
  Y: '#FFF8E1',
  Z: '#FFF3E0',
};

// Add this type definition at the top with other types
type CustomerData = {
  customer_name: string;
  date_of_birth: string;
  email: string;
  id: number;
  phone: string;
  user_id: number;
};

const CustomerScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  // Filter customers based on search query and selected letter
  const filteredCustomers = useCallback(() => {
    let filtered = [...customers];

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        customer =>
          customer.customer_name.toLowerCase().includes(searchLower) ||
          customer.phone.includes(searchQuery) ||
          customer.email.toLowerCase().includes(searchLower)
      );
    }

    if (selectedLetter) {
      filtered = filtered.filter(customer =>
        customer.customer_name.toUpperCase().startsWith(selectedLetter)
      );
    }

    return filtered;
  }, [searchQuery, selectedLetter, customers]);

  const getAvatarColor = (name: string) => {
    const firstLetter = name[0].toUpperCase();
    return AVATAR_COLORS[firstLetter] || '#E8EAF6';
  };

  const renderCustomerItem = ({item}: {item: CustomerData}) => (
    <TouchableOpacity
      style={styles.customerItem}
      onPress={() => navigation.navigate('CustomerDetails', {
        customerData: item
      })}>
      <View style={styles.customerInfo}>
        <View
          style={[styles.avatar, {backgroundColor: getAvatarColor(item.customer_name)}]}>
          <Text style={styles.avatarText}>{item.customer_name[0]}</Text>
        </View>
        <View style={styles.customerDetails}>
          <Text style={styles.customerName}>{item.customer_name}</Text>
          <View style={styles.phoneContainer}>
            <Image source={icons.icCall} style={styles.callIconStyle} />
            <Text style={styles.phoneNumber}>{item.phone}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <Image source={icons.icPlusBell} style={styles.bellIconStyle} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderAlphabetItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={[
        styles.alphabetItem,
        selectedLetter === item && styles.selectedAlphabetItem,
      ]}
      onPress={() => {
        setSelectedLetter(selectedLetter === item ? '' : item);
      }}>
      <Text
        style={[
          styles.alphabetText,
          selectedLetter === item && styles.selectedAlphabetText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <MainContainer>
      <Header title={'Customers'} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Customers"
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image source={icons.icSearch} style={styles.searchIconStyle} />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Customer List */}
        <View style={{flex: 1}}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={color.primary} />
            </View>
          ) : (
            <View style={styles.customerListContainer}>
              <FlatList
                data={filteredCustomers()}
                renderItem={renderCustomerItem}
                bounces={false}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.customerList}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          )}
        </View>

        {/* Alphabet List */}
        <View style={styles.alphabetList}>
          <FlatList
            data={ALPHABET}
            renderItem={renderAlphabetItem}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('AddNewCustomer');
          }}>
          <Icon name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: responsiveWidth(4),
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    // height: 44,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: color.lightgray,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    marginRight: 8,
    color: color.black,
    paddingVertical: responsiveWidth(3.5),
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  customerListContainer: {
    marginLeft: responsiveWidth(4),
    borderRadius: responsiveWidth(4),
    overflow: 'hidden',
  },
  customerList: {
    paddingTop: 8,
  },
  customerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.semiBold,
    fontWeight: '500',
    marginBottom: 4,
    color: color.black,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumber: {
    fontSize: fontSize.minix,
    color: color.grayText,
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginLeft: 64,
  },
  alphabetList: {
    width: 28,
    backgroundColor: 'transparent',
    paddingVertical: 8,
    alignItems: 'center',
  },
  alphabetItem: {
    paddingVertical: 2,
  },
  alphabetText: {
    fontSize: fontSize.mini,
    color: color.grayText,
    fontWeight: '700',
    fontFamily: fontFamily.bold,
  },
  selectedAlphabetItem: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAlphabetText: {
    color: color.primary,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  searchIconStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
  bellIconStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
  callIconStyle: {
    height: responsiveWidth(3),
    width: responsiveWidth(3),
    resizeMode: 'contain',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomerScreen;
