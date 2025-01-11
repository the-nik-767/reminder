import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, gu, hi } from './translations';

const resources = {
	en: {
		translation: en
	},
	hi: {
		translation: hi
	},
	gu: {
		translation: gu
	}
};

i18next.use(initReactI18next).init({
	debug: true, // Debug should work correctly, ensure you're using the right version
	lng: 'en',   // Change 'lan' to 'lng'
	compatibilityJSON: 'v3',
	fallbackLng: 'en',
	resources
});

export default i18next;
