import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ContactScreen } from './ContactScreen';
import { FaqScreen } from './FaqScreen';
import { label } from '../data/labels';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, radius, spacing } from '../theme';

export function MoreScreen() {
  const { locale } = useLocale();
  const [tab, setTab] = useState<'faq' | 'contact'>('faq');

  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        {(['faq', 'contact'] as const).map((item) => (
          <Pressable key={item} onPress={() => setTab(item)} style={[styles.segmentButton, tab === item && styles.segmentButtonActive]}>
            <Text style={[styles.segmentText, tab === item && styles.segmentTextActive]}>{label(locale, item)}</Text>
          </Pressable>
        ))}
      </View>
      {tab === 'faq' ? <FaqScreen /> : <ContactScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  segment: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.ivory,
  },
  segmentButton: {
    flex: 1,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    backgroundColor: colors.paper,
    borderColor: colors.line,
    borderWidth: StyleSheet.hairlineWidth,
  },
  segmentButtonActive: {
    backgroundColor: colors.teal,
    borderColor: colors.teal,
  },
  segmentText: {
    color: colors.graphite,
    fontWeight: '900',
  },
  segmentTextActive: {
    color: colors.paper,
  },
});
