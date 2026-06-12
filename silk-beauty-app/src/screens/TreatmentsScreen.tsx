import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { Card, Pill, Screen, SectionTitle } from '../components/ui';
import { treatmentCategories, treatments } from '../data/treatments';
import { label } from '../data/labels';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, radius, spacing } from '../theme';
import { formatGel, localized } from '../utils/localized';
import type { LocalizedText, TreatmentsStackParamList } from '../types';

interface Props {
  navigation: { navigate: (screen: keyof TreatmentsStackParamList, params?: { treatmentId: string }) => void };
}

export function TreatmentsScreen({ navigation }: Props) {
  const { locale } = useLocale();
  const [category, setCategory] = useState('all');
  const filtered = useMemo(
    () => (category === 'all' ? treatments : treatments.filter((item) => item.category === category)),
    [category],
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          eyebrow={label(locale, 'treatments')}
          title="Premium Beauty Treatments"
          subtitle="Browse the full service catalog copied from the Silk website."
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          <Pressable style={[styles.filter, category === 'all' && styles.filterActive]} onPress={() => setCategory('all')}>
            <Text style={[styles.filterText, category === 'all' && styles.filterTextActive]}>All</Text>
          </Pressable>
          {treatmentCategories.map((item) => (
            <Pressable key={item.id} style={[styles.filter, category === item.id && styles.filterActive]} onPress={() => setCategory(item.id)}>
              <Text style={[styles.filterText, category === item.id && styles.filterTextActive]}>{localized(item.label as LocalizedText, locale)}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {filtered.map((item) => (
          <Pressable key={item.id} onPress={() => navigation.navigate('TreatmentDetail', { treatmentId: item.id })}>
            <Card>
              <View style={styles.cardHeader}>
                <View style={styles.flex}>
                  <Text style={styles.title}>{localized(item.name as LocalizedText, locale)}</Text>
                  <Text style={styles.description} numberOfLines={3}>
                    {localized(item.description as LocalizedText, locale)}
                  </Text>
                </View>
                <Text style={styles.price}>{formatGel(item.price)}</Text>
              </View>
              <View style={styles.metaRow}>
                <Pill tone="teal">{item.duration} min</Pill>
                {item.badge ? <Pill tone="gold">{item.badge}</Pill> : null}
                <View style={styles.detailsLink}>
                  <Search size={14} color={colors.tealDark} />
                  <Text style={styles.detailsText}>{label(locale, 'details')}</Text>
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 110,
  },
  filters: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  filter: {
    borderRadius: radius.sm,
    borderColor: colors.line,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.md,
    minHeight: 40,
    justifyContent: 'center',
  },
  filterActive: {
    backgroundColor: colors.teal,
    borderColor: colors.teal,
  },
  filterText: {
    color: colors.graphite,
    fontWeight: '800',
  },
  filterTextActive: {
    color: colors.paper,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '800',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  price: {
    color: colors.tealDark,
    fontSize: 16,
    fontWeight: '900',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  detailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginLeft: 'auto',
  },
  detailsText: {
    color: colors.tealDark,
    fontWeight: '800',
  },
});
