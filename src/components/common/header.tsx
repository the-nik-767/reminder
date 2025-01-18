import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
  View,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {color, fontSize, responsiveWidth} from '../../constant/theme';
import {icons} from '../../assets';
import {useNavigation} from '@react-navigation/native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  Customcontainer?: ViewStyle;
  titleStyle?: TextStyle;
}

const Header: React.FC<ButtonProps> = ({
  title,
  rightIcon,
  rightIconContainerStyle,
  rightIconStyle,
  onPress,
  showBack,
  cutomReightContainer,
}: any) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.header}>
        {showBack ? (
          <TouchableOpacity
            style={[styles.iconContainer, {marginRight: responsiveWidth(2)}]}
            onPress={() => navigation.goBack()}>
            <Image source={icons.icBack} style={[styles.iconStyle]} />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.headerTitle}>{title}</Text>
        {rightIcon ? (
          <TouchableOpacity
            style={[styles.iconContainer, rightIconContainerStyle]}
            onPress={onPress}>
            <Image
              source={rightIcon}
              style={[styles.iconStyle, rightIconStyle]}
            />
          </TouchableOpacity>
        ) : null}
        {cutomReightContainer}
      </View>
    </SafeAreaView>
  );
};

export {Header};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveWidth(2),
    paddingBottom: responsiveWidth(4),
  },
  headerTitle: {
    fontSize: fontSize.mediumx,
    fontWeight: '700',
    color: color.black,
    flex: 1,
  },
  iconStyle: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    resizeMode: 'contain',
  },
  iconContainer: {
    backgroundColor: color.white,
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
