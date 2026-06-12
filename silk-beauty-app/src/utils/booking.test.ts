import { describe, expect, it } from 'vitest';
import {
  buildBookingPayload,
  buildDailySlots,
  filterBookedSlots,
  validateBookingForm,
  type BookingFormValues,
  type SalonHour,
} from './booking';

const hours: SalonHour[] = [
  { day: 'Mon - Thu', hours: '10:00 - 20:00' },
  { day: 'Fri - Sat', hours: '10:00 - 21:00' },
  { day: 'Sunday', hours: '11:00 - 19:00' },
];

const validForm: BookingFormValues = {
  name: 'Mariam Test',
  email: 'mariam@example.com',
  phone: '+995 599 123 456',
  service: 'HydraFacial',
  date: '2026-06-15',
  time: '10:30',
  message: 'Sensitive skin',
};

describe('booking utilities', () => {
  it('generates half-hour slots for weekday business hours', () => {
    const slots = buildDailySlots('2026-06-15', hours);

    expect(slots.at(0)).toBe('10:00');
    expect(slots.at(-1)).toBe('19:30');
    expect(slots).toHaveLength(20);
  });

  it('uses extended Friday and Saturday hours', () => {
    const slots = buildDailySlots('2026-06-19', hours);

    expect(slots.at(0)).toBe('10:00');
    expect(slots.at(-1)).toBe('20:30');
    expect(slots).toHaveLength(22);
  });

  it('filters booked slots returned as strings or booking objects', () => {
    const available = filterBookedSlots(
      ['10:00', '10:30', '11:00', '11:30'],
      ['10:30', { time: '11:30' }],
    );

    expect(available).toEqual(['10:00', '11:00']);
  });

  it('validates required fields, email format, and ISO date', () => {
    const result = validateBookingForm({
      ...validForm,
      name: '',
      email: 'not-an-email',
      date: '15/06/2026',
      time: '',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toMatchObject({
      name: 'Name is required',
      email: 'Enter a valid email address',
      date: 'Select a valid date',
      time: 'Select an available time',
    });
  });

  it('accepts a valid booking form', () => {
    const result = validateBookingForm(validForm);

    expect(result).toEqual({ valid: true, errors: {} });
  });

  it('builds the API booking payload schema', () => {
    expect(buildBookingPayload(validForm)).toEqual({
      name: 'Mariam Test',
      email: 'mariam@example.com',
      phone: '+995 599 123 456',
      service: 'HydraFacial',
      date: '2026-06-15',
      time: '10:30',
      message: 'Sensitive skin',
    });
  });
});
