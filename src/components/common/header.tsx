import React from 'react';
import { StyleSheet, Text, TouchableOpacityProps, TextStyle, ViewStyle, View, Image, Platform, TouchableOpacity } from 'react-native';
import { color, fontSize, responsiveWidth } from '../../constant/theme';
import { icons } from '../../assets';
import { useNavigation } from '@react-navigation/native';

interface ButtonProps extends TouchableOpacityProps {
	title: string;
	onPress?: () => void;
	Customcontainer?: ViewStyle;
	titleStyle?: TextStyle;
}

const Header: React.FC<ButtonProps> = ({ title, Customcontainer, titleStyle }) => {
	const navigation = useNavigation();
// const proFileHandler = ()=>{

	
	
// } 

	return (
		<View style={[styles.container, Customcontainer]}>
			<Image source={icons.ic_logo} style={styles.ic_logo} />
			<Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
			<TouchableOpacity onPress={()=>{
navigation.navigate("EditProfile")
			}}>

			<Image source={icons.ic_user} style={styles.ic_logo_profile} />
			</TouchableOpacity>
		</View>
	);
};

export { Header };

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.white,
		marginTop: Platform.OS === 'ios' ? responsiveWidth('10%') : responsiveWidth('0%'),
		marginLeft: responsiveWidth('5'),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical:responsiveWidth("2")
	},
	titleStyle: {
		color: color.pink,
		fontSize: fontSize.regularx
	},
	ic_logo: {
		width: responsiveWidth('12%'),
		height: responsiveWidth('12%'),
		resizeMode: 'contain',
		tintColor: color.pink
	},
	ic_logo_profile: {
		width: responsiveWidth('6%'),
		height: responsiveWidth('6%'),
		resizeMode: 'contain',
		borderRadius: 50,
		marginRight: responsiveWidth('3')
	}
});
