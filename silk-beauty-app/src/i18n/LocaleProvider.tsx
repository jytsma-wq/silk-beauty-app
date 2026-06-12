import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getInitialLocale, i18n, isRtlLocale, persistLocale } from './index';
import { colors } from '../theme';
import type { Locale } from '../types';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRtl: boolean;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<Locale | null>(null);

  useEffect(() => {
    void getInitialLocale().then((initialLocale) => {
      setLocaleState(initialLocale);
      void i18n.changeLanguage(initialLocale);
    });
  }, []);

  const value = useMemo<LocaleContextValue | null>(() => {
    if (!locale) {
      return null;
    }

    return {
      locale,
      isRtl: isRtlLocale(locale),
      setLocale: (nextLocale) => {
        setLocaleState(nextLocale);
        void i18n.changeLanguage(nextLocale);
        void persistLocale(nextLocale);
      },
    };
  }, [locale]);

  if (!value) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.ivory }}>
        <ActivityIndicator color={colors.teal} />
      </View>
    );
  }

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }
  return value;
}
