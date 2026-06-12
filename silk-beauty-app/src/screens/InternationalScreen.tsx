import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Check, Plane, ShieldCheck, Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Card, Pill, Screen, SectionTitle } from '../components/ui';
import { beautyTourismTreatments, internationalStories, logistics, whyGeorgia } from '../data/international';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, spacing } from '../theme';

function gelToEur(gel: number) {
  return Math.round(gel * 0.35);
}

export function InternationalScreen() {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          eyebrow={t('international.hero.badge')}
          title={t('international.hero.title')}
          subtitle={t('international.hero.subtitle')}
        />

        <Card>
          <Text style={styles.savings}>{t('international.hero.savings')}</Text>
          <View style={styles.whyList}>
            {whyGeorgia.map((item) => (
              <View key={item} style={styles.row}>
                <Check size={16} color={colors.success} />
                <Text style={styles.body}>{item}</Text>
              </View>
            ))}
          </View>
        </Card>

        <SectionTitle title={t('international.calculator.title')} subtitle={t('international.calculator.subtitle')} />
        {beautyTourismTreatments.map((item) => {
          const georgiaEur = gelToEur(item.georgiaGel);
          const savePercent = Math.round(((item.comparisonEur - georgiaEur) / item.comparisonEur) * 100);
          return (
            <Card key={item.id}>
              <View style={styles.priceRow}>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.body}>{item.duration} min</Text>
                </View>
                <View style={styles.priceBox}>
                  <Text style={styles.gel}>GEL {item.georgiaGel}</Text>
                  <Text style={styles.body}>EUR {georgiaEur}</Text>
                </View>
              </View>
              <Pill tone="gold">Save about {Math.max(savePercent, 0)}%</Pill>
            </Card>
          );
        })}

        <SectionTitle title={t('international.logistics.title')} subtitle={t('international.logistics.subtitle')} />
        <Card>
          <View style={styles.infoHeader}>
            <ShieldCheck size={18} color={colors.tealDark} />
            <Text style={styles.cardTitle}>{t('international.logistics.visa.title')}</Text>
          </View>
          {logistics.visa.map((item) => (
            <View key={item.region} style={styles.spreadRow}>
              <Text style={styles.body}>{item.region}</Text>
              <Text style={styles.strong}>{item.duration}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <View style={styles.infoHeader}>
            <Plane size={18} color={colors.tealDark} />
            <Text style={styles.cardTitle}>{t('international.logistics.airports.title')}</Text>
          </View>
          {logistics.airports.map((item) => (
            <View key={item.code} style={styles.spreadRow}>
              <Text style={styles.body}>{item.name}</Text>
              <Text style={styles.strong}>{item.distance}</Text>
            </View>
          ))}
        </Card>

        <SectionTitle title={t('international.testimonials.title')} subtitle={t('international.testimonials.subtitle')} />
        {internationalStories.map((story) => (
          <Card key={`${story.author}-${story.countryName}`}>
            <View style={styles.storyHeader}>
              <View>
                <Text style={styles.cardTitle}>{story.author}</Text>
                <Text style={styles.body}>{story.countryName} - {story.treatment}</Text>
              </View>
              <View style={styles.stars}>
                {Array.from({ length: story.rating }).map((_, index) => (
                  <Star key={`${story.author}-${index}`} size={14} color={colors.gold} fill={colors.gold} />
                ))}
              </View>
            </View>
            <Text style={styles.quote}>{story.text}</Text>
          </Card>
        ))}

        <Text style={styles.localeNote}>Locale: {locale.toUpperCase()}</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 110,
  },
  savings: {
    color: colors.tealDark,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
  },
  whyList: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    flexShrink: 1,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  priceRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  flex: {
    flex: 1,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  gel: {
    color: colors.tealDark,
    fontSize: 16,
    fontWeight: '900',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  spreadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderTopColor: colors.line,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  strong: {
    color: colors.ink,
    fontWeight: '900',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  quote: {
    color: colors.graphite,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  localeNote: {
    color: colors.muted,
    textAlign: 'center',
  },
});
