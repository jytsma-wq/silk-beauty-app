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
  description:
    "Batumi's premier beauty salon on Zurab Gorgiladze Street. We bring together expert practitioners, cutting-edge treatments & luxury care to enhance your natural beauty with precision & confidence.",
  address: 'Zurab Gorgiladze 63, Batumi 6000, Georgia',
  phone: '+995 577 34 57 67',
  email: 'info@silkbeautysalon.online',
  instagram: 'https://www.instagram.com/silkbeauty_batumi/',
  instagramHandle: '@silkbeauty_batumi',
  facebook: 'https://www.facebook.com/silkbeautybatumi/',
  facebookHandle: '@silkbeautybatumi',
  tiktok: 'https://www.tiktok.com/@silkbeautybatumi',
  tiktokHandle: '@silkbeautybatumi',
  whatsapp: '+995 577 28 68 55',
  siteUrl: 'https://silkbeautysalon.online',
  coordinates: {
    lat: 41.6468,
    lng: 41.6367,
  },
  hours: [
    { day: 'Mon - Sat', hours: '10:00 - 22:00' },
    { day: 'Sunday', hours: '11:00 - 22:00' },
  ] satisfies SalonHour[],
};

export const homeStats = [
  { value: '200+', label: 'Happy Clients' },
  { value: '6', label: 'Service Categories' },
  { value: '70%', label: 'International Savings' },
];
