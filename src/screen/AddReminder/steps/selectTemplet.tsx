import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../../constant/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import TempletDetails from './templetDetails';
import {SearchBar} from 'react-native-screens';
import Searchbox from '../../../components/common/searchbox';
import http from '../../../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Template {
  id: number;
  name: string;
  content: string;
  variables: Array<{name: string}>;
}

interface SelectTempletProps {
  onPressBack: () => void;
  onPressSave: (templateId: number, variables: Array<{name: string; value: string}>) => void;
  selectedTemplateId: number | null;
}

const SelectTemplet: React.FC<SelectTempletProps> = ({
  onPressBack,
  onPressSave,
  selectedTemplateId,
}) => {
  const [currentMode, setCurrentMode] = useState('select_mode');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState<Array<{name: string; value: string}>>([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('USER_TOKEN');
      const response = await http.get('whatsapp_template/get-template', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('response', response.data.response.templates);
      // Transform the API response to match our Template interface
      const transformedTemplates: Template[] = response.data.response.templates.map((template: any) => ({
        id: template.id,
        name: template.templateDisplayName || template.templateName,
        content: template.message || '',
        variables: template.variables.map((v: any) => ({
          name: typeof v === 'object' ? v.name : v
        })),
      }));
      
      setTemplates(transformedTemplates);
      
      if (selectedTemplateId) {
        const template = transformedTemplates.find(t => t.id === selectedTemplateId);
        if (template) {
          setSelectedTemplate(template);
          setVariables(template.variables.map(v => ({name: v.name, value: ''})));
        }
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      Alert.alert('Error', 'Failed to load templates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setVariables(template.variables.map(v => ({name: v.name, value: ''})));
    setCurrentMode('edit_mode');
  };

  const handleSave = () => {
    if (!selectedTemplate) {
      Alert.alert('Error', 'Please select a template first');
      return;
    }

    const emptyVariables = variables.filter(v => !v.value.trim());
    if (emptyVariables.length > 0) {
      Alert.alert('Error', `Please fill in all variables: ${emptyVariables.map(v => v.name).join(', ')}`);
      return;
    }

    onPressSave(selectedTemplate.id, variables);
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={{flex: 1}}>
      {currentMode === 'select_mode' ? (
        <>
          <View style={{flex: 1}}>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Select Template</Text>
              <Searchbox
                placeholder="Search Template by Name"
                searchContainerStyle={{
                  marginHorizontal: 0,
                  marginBottom: responsiveWidth(4),
                }}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={color.primary} />
                </View>
              ) : (
                <FlatList
                  data={filteredTemplates}
                  keyExtractor={item => item.id.toString()}
                  numColumns={3}
                  ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No templates found</Text>
                    </View>
                  )}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.itemContainer,
                        selectedTemplate?.id === item.id && styles.selectedItem,
                      ]}
                      onPress={() => handleTemplateSelect(item)}>
                      <View style={styles.cardContainer}>
                        <View style={styles.messageContainer}>
                          <Text style={styles.messageTextStyle}>
                            {item.content}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.titleStyle}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={onPressBack}>
              <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TempletDetails
          template={selectedTemplate!}
          variables={variables}
          onUpdateVariables={setVariables}
          onPressSave={handleSave}
          onPressBack={() => setCurrentMode('select_mode')}
        />
      )}
    </View>
  );
};

export default SelectTemplet;

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: responsiveWidth(4),
    padding: responsiveWidth(4),
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
  formTitle: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginBottom: responsiveWidth(4),
  },
  inputGroup: {
    marginBottom: responsiveWidth(5),
  },
  inputLabel: {
    fontSize: fontSize.regularx,
    color: color.grayText,
    marginBottom: responsiveWidth(2),
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: responsiveWidth(4),
    fontSize: fontSize.regularx,
  },
  bottomContainer: {
    padding: responsiveWidth(4),
    backgroundColor: color.primaryBackground,
  },
  nextButton: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: responsiveWidth(4),
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
    borderWidth: 1,
    borderColor: color.primary,
  },
  nextButtonText: {
    color: color.primary,
    fontSize: fontSize.regular,
    fontWeight: '600',
    fontFamily: fontFamily.regular,
  },
  itemContainer: {
    width: responsiveWidth(26),
    height: responsiveWidth(26),
    marginRight: responsiveWidth(3),
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 8,
    marginBottom: responsiveWidth(3),
  },
  selectedItem: {
    borderColor: color.primary,
    borderWidth: 2,
  },
  cardContainer: {
    backgroundColor: '#e2ded7',
    padding: '8%',
    paddingBottom: '12%',
    flex: 1,
  },
  messageContainer: {
    backgroundColor: color.white,
    borderRadius: 6,
    padding: '5%',
    flex: 1,
  },
  messageTextStyle: {
    fontSize: fontSize.xxxxsmall,
    fontFamily: fontFamily.regular,
    color: color.black,
  },
  titleStyle: {
    fontSize: fontSize.xxxxsmall,
    fontFamily: fontFamily.regular,
    color: color.grayText,
    padding: '4%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(4),
  },
  emptyText: {
    fontSize: fontSize.regular,
    color: color.grayText,
    textAlign: 'center',
  },
});
