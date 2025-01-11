import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { color, responsiveWidth } from '../../constant/theme';

// Add interface for props
interface DropdownComponentProps {
	languageList: Array<{
		languageName: string;
		languageCode: string;
	}>;
	selectedValue: string;
	onSelectLanguage: (languageCode: string) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ 
	languageList, 
	selectedValue, 
	onSelectLanguage 
}) => {
	const [isFocus, setIsFocus] = useState(false);

	const changeLanguageHandler = (itemValue) => {
		onSelectLanguage(itemValue);
	};

	return (
		<View style={styles.container}>
			{/* {renderLabel()} */}
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: color.pink }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={languageList}
				search
				maxHeight={300}
				labelField="languageName"
				valueField="languageCode"
				placeholder={!isFocus ? 'Select item' : '...'}
				searchPlaceholder="Search..."
				value={selectedValue}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					changeLanguageHandler(item.languageCode);
					setIsFocus(false);
				}}
				// renderLeftIcon={() => (
				//   <AntDesign
				// 	style={styles.icon}
				// 	color={isFocus ? 'blue' : 'black'}
				// 	name="Safety"
				// 	size={20}
				//   />
				// )}
			/>
		</View>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.white,
		margin: responsiveWidth('0'),
		marginTop:responsiveWidth("5")
	},
	dropdown: {
		height: 50,
		borderColor: color.gray,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8
	},
	icon: {
		marginRight: 5
	},
	label: {
		position: 'absolute',
		backgroundColor: color.white,
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14
	},
	placeholderStyle: {
		fontSize: 16
	},
	selectedTextStyle: {
		fontSize: 16
	},
	iconStyle: {
		width: 20,
		height: 20
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16
	}
});
