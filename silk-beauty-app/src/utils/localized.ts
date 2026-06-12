import type { Locale, LocalizedText } from '../types';

export function localized(value: LocalizedText | string | undefined, locale: Locale) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  return value[locale] || value.en;
}

export function formatGel(value: number) {
  return `GEL ${value}`;
}
