import i18n, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'fr',
  fallbackLng: 'fr',
  debug: false,
  resources: {
    fr,
  },
});

export const tr = (key: string, options?: any): string => {
  return i18n.exists(key) ? String(t(key, options)) : '❌❌❌';
};

export default i18n;
