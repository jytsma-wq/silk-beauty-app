import type { Locale } from '../types';
import type { SalonHour } from '../utils/booking';

export const locales: Locale[] = ['en', 'ka', 'ru', 'he', 'ar', 'tr'];
export const defaultLocale: Locale = 'en';
export const rtlLocales: Locale[] = ['he', 'ar'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ka: 'ქართული',
  ru: 'Русский',
  he: 'עברית',
  ar: 'العربية',
  tr: 'Türkçe',
};

export const salonInfo = {
  name: 'Silk Beauty Salon',
  description: 'World-class aesthetic medicine, lash extensions, microblading, hair, nails & skincare in Batumi, Georgia.',
  address: '28 Rustaveli Avenue, Batumi 6010, Georgia',
  phone: '+995 599 123 456',
  email: 'info@silkbeautybatumi.ge',
  instagram: 'https://instagram.com/silkbeautybatumi',
  instagramHandle: '@silkbeautybatumi',
  facebook: 'https://facebook.com/silkbeautybatumi',
  facebookHandle: '@silkbeautybatumi',
  tiktok: 'https://tiktok.com/@silkbeautybatumi',
  tiktokHandle: '@silkbeautybatumi',
  whatsapp: '+995599123456',
  siteUrl: 'https://silkbeautybatumi.ge',
  coordinates: {
    lat: 41.6468,
    lng: 41.6367,
  },
  hours: [
    { day: 'Mon - Thu', hours: '10:00 - 20:00' },
    { day: 'Fri - Sat', hours: '10:00 - 21:00' },
    { day: 'Sunday', hours: '11:00 - 19:00' },
  ] satisfies SalonHour[],
};

export const homeStats = [
  { value: '200+', label: 'Happy Clients' },
  { value: '6', label: 'Service Categories' },
  { value: '70%', label: 'International Savings' },
];
