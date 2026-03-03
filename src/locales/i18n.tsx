import i18n, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: {
        en,
    },
});

export const tr = (key: string, options?: any): string => {
  return i18n.exists(key) ? String(t(key, options)) : '❌❌❌';
};

export default i18n;
