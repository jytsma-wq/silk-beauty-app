import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import ar from '../messages/ar.json';
import en from '../messages/en.json';
import he from '../messages/he.json';
import ka from '../messages/ka.json';
import ru from '../messages/ru.json';
import tr from '../messages/tr.json';
import { defaultLocale, localeNames, locales, rtlLocales } from '../data/salon';
import type { Locale } from '../types';

const resources = {
  en: { translation: en },
  ka: { translation: ka },
  ru: { translation: ru },
  he: { translation: he },
  ar: { translation: ar },
  tr: { translation: tr },
};

const localeKey = 'silk.locale';

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export async function getInitialLocale(): Promise<Locale> {
  const saved = await AsyncStorage.getItem(localeKey);
  if (isLocale(saved ?? undefined)) {
    return saved as Locale;
  }

  const detected = RNLocalize.findBestLanguageTag(locales);
  return isLocale(detected?.languageTag) ? detected.languageTag : defaultLocale;
}

export async function persistLocale(locale: Locale) {
  await AsyncStorage.setItem(localeKey, locale);
}

export function isRtlLocale(locale: Locale) {
  return rtlLocales.includes(locale);
}

export { i18n, localeNames, locales };

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false,
    },
  });
}
