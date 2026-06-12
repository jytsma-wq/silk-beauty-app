import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Clock, ShieldCheck, Sparkles } from 'lucide-react-native';
import { Card, Pill, Screen, SectionTitle } from '../components/ui';
import { treatments } from '../data/treatments';
import { label } from '../data/labels';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, spacing } from '../theme';
import { formatGel, localized } from '../utils/localized';
import type { LocalizedText } from '../types';

interface Props {
  route: { params: { treatmentId: string } };
}

export function TreatmentDetailScreen({ route }: Props) {
  const { locale } = useLocale();
  const treatment = treatments.find((item) => item.id === route.params.treatmentId) ?? treatments[0];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          eyebrow={formatGel(treatment.price)}
          title={localized(treatment.name as LocalizedText, locale)}
          subtitle={localized(treatment.description as LocalizedText, locale)}
        />

        <View style={styles.metaGrid}>
          <Card style={styles.metaCard}>
            <Clock size={20} color={colors.tealDark} />
            <Text style={styles.metaLabel}>{label(locale, 'duration')}</Text>
            <Text style={styles.metaValue}>{treatment.duration} min</Text>
          </Card>
          <Card style={styles.metaCard}>
            <ShieldCheck size={20} color={colors.tealDark} />
            <Text style={styles.metaLabel}>{label(locale, 'recovery')}</Text>
            <Text style={styles.metaValue}>{treatment.recovery}</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.cardTitle}>{label(locale, 'products')}</Text>
          <View style={styles.pillRow}>
            {treatment.products.map((product) => (
              <Pill key={product} tone="teal">{product}</Pill>
            ))}
          </View>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Longevity</Text>
          <Text style={styles.body}>{treatment.longevity}</Text>
        </Card>

        <Card>
          <View style={styles.noticeHeader}>
            <Sparkles size={18} color={colors.warning} />
            <Text style={styles.cardTitle}>Before booking</Text>
          </View>
          <Text style={styles.body}>{treatment.contraIndications}</Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 110,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaCard: {
    flex: 1,
    minHeight: 118,
  },
  metaLabel: {
    color: colors.muted,
    marginTop: spacing.sm,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  metaValue: {
    color: colors.ink,
    marginTop: spacing.xs,
    fontSize: 15,
    fontWeight: '800',
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '800',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
