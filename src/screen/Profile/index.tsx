import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log('Error during logout:', error);
        }
    };

    const menuItems = [
        {
            icon: 'person-outline',
            title: 'Edit Profile',
            onPress: () => navigation.navigate('EditProfile'),
        },
        {
            icon: 'lock-outline',
            title: 'Change Password',
            onPress: () => navigation.navigate('ChangePassword'),
        },
        {
            icon: 'notifications-none',
            title: 'Notifications',
            onPress: () => navigation.navigate('Notifications'),
        },
        {
            icon: 'help-outline',
            title: 'Help & Support',
            onPress: () => navigation.navigate('Support'),
        },
        {
            icon: 'privacy-tip',
            title: 'Privacy Policy',
            onPress: () => navigation.navigate('PrivacyPolicy'),
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    {/* <Image 
                        source={userData?.profile_image 
                            ? { uri: userData.profile_image }
                            : require('../../assets/images/default-avatar.png')
                        }
                        style={styles.profileImage}
                    /> */}
                    <TouchableOpacity 
                        style={styles.editImageButton}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <MaterialIcons name="edit" size={20} color="#0047AF" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{userData?.name || 'User Name'}</Text>
                <Text style={styles.email}>{userData?.email || 'email@example.com'}</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={styles.menuItem}
                        onPress={item.onPress}
                    >
                        <View style={styles.menuItemLeft}>
                            <MaterialIcons name={item.icon} size={24} color="#333" />
                            <Text style={styles.menuItemText}>{item.title}</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#333" />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <MaterialIcons name="logout" size={24} color="#FF3B30" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editImageButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        borderWidth: 1,
        borderColor: '#E1E1E1',
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        fontFamily: 'Inter',
    },
    email: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Inter',
    },
    menuContainer: {
        backgroundColor: '#fff',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Inter',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#FF3B30',
        fontWeight: '600',
        fontFamily: 'Inter',
    },
});

export default ProfileScreen;
