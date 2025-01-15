import {StyleSheet, Text, View, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import {color, responsiveWidth} from '../../constant/theme';

interface MainContainerProps extends ViewProps {
  containerStyle?: ViewStyle;
  subContainerStyle?: ViewStyle;
  childern?: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({
  containerStyle,
  subContainerStyle,
  children,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.subContainer, subContainerStyle]}>{children}</View>
    </View>
  );
};

export {MainContainer};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  subContainer: {
    flex: 1,
    backgroundColor: color.primaryBackground,
    marginBottom: responsiveWidth(2),
    borderBottomLeftRadius: responsiveWidth(4),
    borderBottomRightRadius: responsiveWidth(4),
    overflow: 'hidden',
  },
});
