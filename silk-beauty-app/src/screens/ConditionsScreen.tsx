import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Droplets, HeartPulse } from 'lucide-react-native';
import { Card, Pill, Screen, SectionTitle } from '../components/ui';
import { skinConditions } from '../data/conditions';
import { label } from '../data/labels';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, spacing } from '../theme';
import { localized } from '../utils/localized';

export function ConditionsScreen() {
  const { locale } = useLocale();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          eyebrow="AI Skin Analysis"
          title={label(locale, 'conditions')}
          subtitle="Skin concerns and treatment recommendations derived from the website skin analysis flow."
        />

        {skinConditions.map((condition) => (
          <Card key={condition.id}>
            <View style={styles.header}>
              <View style={styles.iconBox}>
                <HeartPulse size={18} color={colors.tealDark} />
              </View>
              <View style={styles.flex}>
                <Text style={styles.title}>{localized(condition.title, locale)}</Text>
                <Text style={styles.body}>{localized(condition.description, locale)}</Text>
              </View>
            </View>

            <Text style={styles.label}>{label(locale, 'recommended')}</Text>
            <View style={styles.pillRow}>
              {condition.recommendedTreatments.map((item) => (
                <Pill key={item} tone="teal">{item}</Pill>
              ))}
            </View>

            <Text style={styles.label}>{label(locale, 'tips')}</Text>
            {condition.tips.map((tip) => (
              <View key={tip} style={styles.tipRow}>
                <Droplets size={14} color={colors.teal} />
                <Text style={styles.tip}>{tip}</Text>
              </View>
            ))}
          </Card>
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
  header: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    backgroundColor: colors.mist,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  label: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '900',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  tip: {
    color: colors.graphite,
    flex: 1,
  },
});
