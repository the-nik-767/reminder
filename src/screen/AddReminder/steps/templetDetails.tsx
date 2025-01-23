import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  color,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../constant/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons} from '../../../assets';

interface Template {
  id: number;
  name: string;
  content: string;
  variables: Array<{name: string}>;
}

interface TempletDetailsProps {
  template: Template;
  variables: Array<{name: string; value: string}>;
  onUpdateVariables: (variables: Array<{name: string; value: string}>) => void;
  onPressBack: () => void;
  onPressSave: () => void;
}

const TempletDetails: React.FC<TempletDetailsProps> = ({
  template,
  variables,
  onUpdateVariables,
  onPressBack,
  onPressSave,
}) => {
  const handleVariableChange = (name: string, value: string) => {
    const newVariables = variables.map(v =>
      v.name === name ? {...v, value} : v,
    );
    onUpdateVariables(newVariables);
  };

  const getPreviewContent = () => {
    let content = template.content;
    variables.forEach(v => {
      content = content.replace(
        new RegExp(`\\{${v.name}\\}`, 'g'),
        v.value || `{${v.name}}`,
      );
    });
    return content;
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.formCard}>
            <View style={styles.headerContainer}>
              <Text style={styles.formTitle}>Template Preview</Text>
              <TouchableOpacity onPress={onPressBack}>
                <Icon name="close" size={24} color={color.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.cardSubContainer}>
                <Text style={styles.previewText}>{getPreviewContent()}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>{template.name}</Text>
          </View>

          <View style={styles.variablesContainer}>
            {variables.map((variable, index) => (
              <View key={variable.name} style={styles.variableGroup}>
                <Text style={styles.inputTitle}>{variable.name}</Text>
                <TextInput
                  style={[
                    styles.inputStyle,
                    !variable.value.trim() && styles.inputError,
                  ]}
                  value={variable.value}
                  onChangeText={text => handleVariableChange(variable.name, text)}
                  placeholder={`Enter ${variable.name}`}
                  placeholderTextColor={color.grayText}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onPressBack}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <View style={{width: responsiveWidth(4)}} />
        <TouchableOpacity
          style={[
            styles.saveButton,
            variables.some(v => !v.value.trim()) && styles.buttonDisabled,
          ]}
          onPress={onPressSave}
          disabled={variables.some(v => !v.value.trim())}>
          <Text style={styles.saveButtonText}>Save & Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TempletDetails;

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: responsiveWidth(4),
    padding: responsiveWidth(4),
    marginBottom: responsiveWidth(5),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveWidth(4),
  },
  formTitle: {
    fontSize: fontSize.regular,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    color: color.grayText,
    marginTop: responsiveWidth(2),
  },
  cardContainer: {
    backgroundColor: '#e2ded7',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveWidth(4),
    paddingBottom: responsiveWidth(6),
  },
  cardSubContainer: {
    borderRadius: 8,
    backgroundColor: color.white,
    padding: responsiveWidth(4),
    minHeight: responsiveHeight(20),
  },
  previewText: {
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    color: color.black,
    lineHeight: fontSize.regularx * 1.5,
  },
  variablesContainer: {
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveWidth(4),
  },
  variableGroup: {
    marginBottom: responsiveWidth(4),
  },
  inputTitle: {
    fontSize: fontSize.regularx,
    fontFamily: fontFamily.regular,
    color: color.grayText,
    marginBottom: responsiveWidth(2),
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.white,
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: Platform.OS === 'ios' ? responsiveWidth(3) : responsiveWidth(2),
    fontSize: fontSize.regularx,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  bottomContainer: {
    padding: responsiveWidth(4),
    backgroundColor: color.primaryBackground,
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: color.white,
    borderRadius: 12,
    padding: responsiveWidth(4),
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
    borderWidth: 1,
    borderColor: color.primary,
  },
  cancelButtonText: {
    color: color.primary,
    fontSize: fontSize.regular,
    fontWeight: '600',
    fontFamily: fontFamily.regular,
  },
  saveButton: {
    flex: 1,
    backgroundColor: color.primary,
    borderRadius: 12,
    padding: responsiveWidth(4),
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
  },
  saveButtonText: {
    color: color.white,
    fontSize: fontSize.regular,
    fontWeight: '600',
    fontFamily: fontFamily.regular,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
