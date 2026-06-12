import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { CalendarDays, CheckCircle2, Clock, RefreshCw } from 'lucide-react-native';
import { createBooking, fetchBookedSlots } from '../api/bookings';
import { Card, Screen, SectionTitle } from '../components/ui';
import { label } from '../data/labels';
import { salonInfo } from '../data/salon';
import { treatments } from '../data/treatments';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, radius, spacing } from '../theme';
import { localized } from '../utils/localized';
import {
  buildDailySlots,
  filterBookedSlots,
  validateBookingForm,
  type BookedSlot,
  type BookingFormValues,
} from '../utils/booking';
import type { Locale, LocalizedText } from '../types';

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function tomorrow() {
  const value = new Date();
  value.setDate(value.getDate() + 1);
  value.setHours(12, 0, 0, 0);
  return value;
}

const initialDate = tomorrow();

const validationLabelKeys: Record<string, string> = {
  'Name is required': 'nameRequired',
  'Email is required': 'emailRequired',
  'Enter a valid email address': 'validEmailRequired',
  'Phone is required': 'phoneRequired',
  'Select a service': 'serviceRequired',
  'Select a valid date': 'dateRequired',
  'Select an available time': 'timeRequired',
};

function localizedError(locale: Locale, text?: string) {
  return text ? label(locale, validationLabelKeys[text] || text) : undefined;
}

export function BookingScreen() {
  const { locale } = useLocale();
  const [dateValue, setDateValue] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [slotStatus, setSlotStatus] = useState<'idle' | 'loading' | 'offline'>('idle');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [apiError, setApiError] = useState('');
  const [form, setForm] = useState<BookingFormValues>({
    name: '',
    email: '',
    phone: '',
    service: treatments[0].id,
    date: toIsoDate(initialDate),
    time: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormValues, string>>>({});

  const allSlots = useMemo(() => buildDailySlots(form.date, salonInfo.hours), [form.date]);
  const availableSlots = useMemo(() => filterBookedSlots(allSlots, bookedSlots), [allSlots, bookedSlots]);

  useEffect(() => {
    let isActive = true;
    setSlotStatus('loading');
    setApiError('');
    void fetchBookedSlots(form.date)
      .then((slots) => {
        if (isActive) {
          setBookedSlots(slots);
          setSlotStatus('idle');
        }
      })
      .catch(() => {
        if (isActive) {
          setBookedSlots([]);
          setSlotStatus('offline');
          setApiError(label(locale, 'offlineSlots'));
        }
      });

    return () => {
      isActive = false;
    };
  }, [form.date, locale]);

  useEffect(() => {
    if (form.time && !availableSlots.includes(form.time)) {
      setForm((current) => ({ ...current, time: '' }));
    }
  }, [availableSlots, form.time]);

  const update = (key: keyof BookingFormValues, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onDateChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selected) {
      selected.setHours(12, 0, 0, 0);
      setDateValue(selected);
      update('date', toIsoDate(selected));
      update('time', '');
    }
  };

  const submit = async () => {
    const validation = validateBookingForm(form);
    setErrors(validation.errors);
    setApiError('');

    if (!validation.valid) {
      return;
    }

    setSubmitStatus('loading');
    try {
      await createBooking(form);
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('idle');
      setApiError(label(locale, 'bookingFailed'));
    }
  };

  if (submitStatus === 'success') {
    return (
      <Screen>
        <View style={styles.successWrap}>
          <CheckCircle2 size={54} color={colors.success} />
          <Text style={styles.successTitle}>{label(locale, 'success')}</Text>
          <Text style={styles.successText}>{label(locale, 'successDetail')}</Text>
          <Pressable style={styles.primaryButton} onPress={() => setSubmitStatus('idle')}>
            <RefreshCw size={18} color={colors.paper} />
            <Text style={styles.primaryButtonText}>{label(locale, 'tryAgain')}</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SectionTitle
          eyebrow={label(locale, 'booking')}
          title={label(locale, 'bookingTitle')}
          subtitle={label(locale, 'bookingSubtitle')}
        />

        <Card>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={form.name}
            onChangeText={(value) => update('name', value)}
            placeholder={label(locale, 'fullName')}
            placeholderTextColor={colors.muted}
          />
          <FieldError text={localizedError(locale, errors.name)} />

          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={form.email}
            onChangeText={(value) => update('email', value)}
            placeholder={label(locale, 'email')}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.muted}
          />
          <FieldError text={localizedError(locale, errors.email)} />

          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={form.phone}
            onChangeText={(value) => update('phone', value)}
            placeholder={label(locale, 'phone')}
            keyboardType="phone-pad"
            placeholderTextColor={colors.muted}
          />
          <FieldError text={localizedError(locale, errors.phone)} />

          <View style={[styles.pickerWrap, errors.service && styles.inputError]}>
            <Picker selectedValue={form.service} onValueChange={(value) => update('service', String(value))}>
              {treatments.map((item) => (
                <Picker.Item key={item.id} label={localized(item.name as LocalizedText, locale)} value={item.id} />
              ))}
            </Picker>
          </View>
          <FieldError text={localizedError(locale, errors.service)} />

          <Pressable style={[styles.dateButton, errors.date && styles.inputError]} onPress={() => setShowDatePicker(true)}>
            <CalendarDays size={18} color={colors.tealDark} />
            <Text style={styles.dateText}>{form.date}</Text>
          </Pressable>
          <FieldError text={localizedError(locale, errors.date)} />

          {showDatePicker ? (
            <DateTimePicker
              mode="date"
              value={dateValue}
              minimumDate={new Date()}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={onDateChange}
            />
          ) : null}

          <Text style={styles.fieldLabel}>{label(locale, 'availableTimes')}</Text>
          {slotStatus === 'loading' ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={colors.teal} />
              <Text style={styles.loadingText}>{label(locale, 'loading')}</Text>
            </View>
          ) : (
            <View style={styles.slotGrid}>
              {availableSlots.map((slot) => (
                <Pressable key={slot} style={[styles.slot, form.time === slot && styles.slotActive]} onPress={() => update('time', slot)}>
                  <Clock size={13} color={form.time === slot ? colors.paper : colors.tealDark} />
                  <Text style={[styles.slotText, form.time === slot && styles.slotTextActive]}>{slot}</Text>
                </Pressable>
              ))}
            </View>
          )}
          {!availableSlots.length && slotStatus !== 'loading' ? <Text style={styles.warning}>{label(locale, 'noTimes')}</Text> : null}
          <FieldError text={localizedError(locale, errors.time)} />

          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.message}
            onChangeText={(value) => update('message', value)}
            placeholder={label(locale, 'message')}
            multiline
            placeholderTextColor={colors.muted}
          />

          {apiError ? <Text style={[styles.warning, slotStatus === 'offline' && styles.offline]}>{apiError}</Text> : null}

          <Pressable style={styles.primaryButton} onPress={submit} disabled={submitStatus === 'loading'}>
            {submitStatus === 'loading' ? <ActivityIndicator color={colors.paper} /> : <CalendarDays size={18} color={colors.paper} />}
            <Text style={styles.primaryButtonText}>{label(locale, 'submitBooking')}</Text>
          </Pressable>
        </Card>
      </ScrollView>
    </Screen>
  );
}

function FieldError({ text }: { text?: string }) {
  return text ? <Text style={styles.error}>{text}</Text> : null;
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 110,
  },
  input: {
    minHeight: 48,
    borderRadius: radius.sm,
    borderColor: colors.line,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.ivory,
    paddingHorizontal: spacing.md,
    color: colors.ink,
    marginTop: spacing.md,
  },
  inputError: {
    borderColor: colors.danger,
  },
  textArea: {
    minHeight: 96,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  pickerWrap: {
    minHeight: 52,
    borderRadius: radius.sm,
    borderColor: colors.line,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.ivory,
    marginTop: spacing.md,
    justifyContent: 'center',
  },
  dateButton: {
    minHeight: 48,
    borderRadius: radius.sm,
    borderColor: colors.line,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.ivory,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dateText: {
    color: colors.ink,
    fontWeight: '800',
  },
  fieldLabel: {
    color: colors.ink,
    fontWeight: '900',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slot: {
    minHeight: 38,
    borderRadius: radius.sm,
    borderColor: colors.line,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  slotActive: {
    borderColor: colors.teal,
    backgroundColor: colors.teal,
  },
  slotText: {
    color: colors.tealDark,
    fontWeight: '900',
  },
  slotTextActive: {
    color: colors.paper,
  },
  loadingRow: {
    minHeight: 46,
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  loadingText: {
    color: colors.muted,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: radius.sm,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  primaryButtonText: {
    color: colors.paper,
    fontWeight: '900',
    fontSize: 15,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  warning: {
    color: colors.warning,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.md,
  },
  offline: {
    color: colors.muted,
  },
  successWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  successTitle: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  successText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
