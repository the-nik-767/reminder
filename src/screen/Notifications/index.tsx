import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header} from '../../components';
import {icons} from '../../assets';
import {color, responsiveWidth} from '../../constant/theme';
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
  const [isSelectAll, setisSelectAll] = useState(false);
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

  const renderNotificationItem = ({item}: {item: NotificationItem}) => (
    <View style={styles.notificationItem}>
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          {item.type === 'template' ? (
            <Image source={icons.icTypeTemplate} style={styles.icon} />
          ) : (
            <Image source={icons.icTypeReminder} style={styles.icon} />
          )}
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
          <Image
            source={isSelectAll ? icons.icSelect : icons.icCloseThin}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Notifications"
        showBack
        rightIcon={icons.icSelectAll}
        onPress={() => setisSelectAll(!isSelectAll)}
        cutomReightContainer={
          <TouchableOpacity
            style={[styles.deleteIconContainer]}
            onPress={() => {}}>
            <Image source={icons.icDeleteLarge} style={[styles.iconStyle]} />
          </TouchableOpacity>
        }
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
    backgroundColor: color.primaryBackground,
  },
  listContainer: {
    padding: responsiveWidth(4),
    paddingTop: 0,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: responsiveWidth(3.5),
    // paddingTop: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    backgroundColor: color.white,
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
  deleteIconContainer: {
    backgroundColor: color.white,
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(3),
  },
  icon: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
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
    width: responsiveWidth(4),
    height: responsiveWidth(4),
  },
  iconStyle: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    resizeMode: 'contain',
  },
});

export default NotificationScreen;
