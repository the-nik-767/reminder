import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer } from '../../components';

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

const customerData = [
  { id: '1', name: 'Aadhya Patel', phone: '+91 98855 89566' },
  { id: '2', name: 'Aadvika Patel', phone: '+91 98855 89566' },
  { id: '3', name: 'Aaron Patel', phone: '+91 98855 89566' },
  { id: '4', name: 'Alexander Patel', phone: '+91 98855 89566' },
  { id: '5', name: 'Andrew Patel', phone: '+91 98855 89566' },
  { id: '6', name: 'Adam Patel', phone: '+91 98855 89566' },
  { id: '7', name: 'Bhavya Patel', phone: '+91 98855 89566' },
  { id: '8', name: 'Chetan Patel', phone: '+91 98855 89566' },
  { id: '9', name: 'Dhruv Patel', phone: '+91 98855 89566' },
  // Add more customers with different starting letters
];

const CustomerScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  // Filter customers based on search query and selected letter
  const filteredCustomers = useCallback(() => {
    let filtered = [...customerData];
    
    if (searchQuery) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
      );
    }
    
    if (selectedLetter) {
      filtered = filtered.filter(customer => 
        customer.name.toUpperCase().startsWith(selectedLetter)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedLetter]);

  const getAvatarColor = (name: string) => {
    const firstLetter = name[0].toUpperCase();
    return AVATAR_COLORS[firstLetter] || '#E8EAF6';
  };

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity style={styles.customerItem}>
      <View style={styles.customerInfo}>
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.name) }]}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View style={styles.customerDetails}>
          <Text style={styles.customerName}>{item.name}</Text>
          <View style={styles.phoneContainer}>
            <Icon name="call-outline" size={14} color="#8E8E93" />
            <Text style={styles.phoneNumber}>{item.phone}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <Icon name="notifications-outline" size={22} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderAlphabetItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.alphabetItem,
        selectedLetter === item && styles.selectedAlphabetItem
      ]}
      onPress={() => {
        setSelectedLetter(selectedLetter === item ? '' : item);
      }}
    >
      <Text style={[
        styles.alphabetText,
        selectedLetter === item && styles.selectedAlphabetText
      ]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <MainContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Customers</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Customers"
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="search" size={20} color="#007AFF" />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Customer List */}
          <View style={styles.customerListContainer}>
            <FlatList
              data={filteredCustomers()}
              renderItem={renderCustomerItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.customerList}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 44,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    marginRight: 8,
    color: '#000000',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  customerListContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 4,
    color: '#000000',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#8E8E93',
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
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '500',
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
    color: '#FFFFFF',
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
    backgroundColor: '#007AFF',
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
});

export default CustomerScreen;
