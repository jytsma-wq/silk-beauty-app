export interface SalonHour {
  day: string;
  hours: string;
}

export interface BookingFormValues {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

export interface BookingValidation {
  valid: boolean;
  errors: Partial<Record<keyof BookingFormValues, string>>;
}

export type BookedSlot = string | { time: string };

const DAY_INDEX: Record<string, number> = {
  sun: 0,
  sunday: 0,
  mon: 1,
  monday: 1,
  tue: 2,
  tuesday: 2,
  wed: 3,
  wednesday: 3,
  thu: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
};

function normalizeDash(value: string) {
  return value.replace(/[–—]/g, '-');
}

function parseMinutes(value: string) {
  const [hour, minute] = value.trim().split(':').map(Number);
  return hour * 60 + minute;
}

function formatMinutes(value: number) {
  const hour = Math.floor(value / 60).toString().padStart(2, '0');
  const minute = (value % 60).toString().padStart(2, '0');
  return `${hour}:${minute}`;
}

function dayIndexes(label: string) {
  const normalized = normalizeDash(label).toLowerCase();
  const parts = normalized.split('-').map((part) => part.trim());
  const start = DAY_INDEX[parts[0]];
  const end = DAY_INDEX[parts[1] ?? parts[0]];

  if (start === undefined || end === undefined) {
    return [];
  }

  if (start <= end) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  return [...Array.from({ length: 7 - start }, (_, index) => start + index), ...Array.from({ length: end + 1 }, (_, index) => index)];
}

function dateDayIndex(date: string) {
  const parsed = new Date(`${date}T12:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? -1 : parsed.getUTCDay();
}

function isIsoDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

export function buildDailySlots(date: string, hours: SalonHour[]): string[] {
  const targetDay = dateDayIndex(date);
  const matchingHours = hours.find((entry) => dayIndexes(entry.day).includes(targetDay));

  if (!matchingHours) {
    return [];
  }

  const [startText, endText] = normalizeDash(matchingHours.hours).split('-');
  const start = parseMinutes(startText);
  const end = parseMinutes(endText);
  const slots: string[] = [];

  for (let cursor = start; cursor < end; cursor += 30) {
    slots.push(formatMinutes(cursor));
  }

  return slots;
}

export function filterBookedSlots(slots: string[], booked: BookedSlot[]): string[] {
  const bookedTimes = new Set(booked.map((slot) => (typeof slot === 'string' ? slot : slot.time)));
  return slots.filter((slot) => !bookedTimes.has(slot));
}

export function validateBookingForm(values: BookingFormValues): BookingValidation {
  const errors: BookingValidation['errors'] = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone is required';
  }

  if (!values.service.trim()) {
    errors.service = 'Select a service';
  }

  if (!isIsoDate(values.date)) {
    errors.date = 'Select a valid date';
  }

  if (!values.time.trim()) {
    errors.time = 'Select an available time';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildBookingPayload(values: BookingFormValues): BookingFormValues {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    service: values.service.trim(),
    date: values.date,
    time: values.time,
    message: values.message.trim(),
  };
}
