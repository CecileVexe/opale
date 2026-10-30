import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resolveLanguage, type Language } from './language';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const resources = {
  fr: { translation: fr },
  en: { translation: en },
} as const;

const i18n = createInstance();

export function initI18n(preference?: Language | null): Promise<unknown> {
  const language = resolveLanguage(
    preference,
    getLocales().map((locale) => locale.languageCode),
  );
  return i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export function setLanguage(language: Language): Promise<unknown> {
  return i18n.changeLanguage(language);
}

export { useTranslation } from 'react-i18next';
export {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  isLanguage,
  resolveLanguage,
  type Language,
} from './language';
export { formatDate, formatNumber, type DateStyle } from './format';
export default i18n;
