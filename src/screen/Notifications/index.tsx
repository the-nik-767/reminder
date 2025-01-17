import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from '../../components';
import { icons } from '../../assets';
// import Header from '../../components/common/header';

interface NotificationItem {
  id: string;
  type: 'template' | 'reminder';
  title: string;
  actionText: string;
  time: string;
}

const NotificationScreen = () => {
  const navigation = useNavigation();
  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'template',
      title: 'Added New Birthday Templet',
      actionText: 'View Templet',
      time: '10m',
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Reminder ABC Sent to Mahi Patel',
      actionText: 'View Reminder',
      time: '2h',
    },
    // Add more notifications as needed
  ];

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <View style={styles.notificationItem}>
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          {/* {item.type === 'template' ? (
            <Image 
              source={require('../../assets/template-icon.png')} 
              style={styles.icon}
            />
          ) : (
            <Image 
              source={require('../../assets/reminder-icon.png')} 
              style={styles.icon}
            />
          )} */}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity>
            <Text style={styles.actionText}>{item.actionText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.time}>{item.time}</Text>
        <TouchableOpacity>
          {/* <Image 
            source={require('../../assets/close-icon.png')}
            style={styles.closeIcon}
          /> */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Header title="Notifications" showBackButton /> */}
      <Header
        title="My Profile"
        rightIcon={icons.icEdit}
        rightIconStyle={styles.editIconStyle}
        onPress={() => navigation.navigate('ProfileEdit')}
      />
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#007AFF',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
});

export default NotificationScreen;
