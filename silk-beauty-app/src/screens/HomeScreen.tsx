import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Award, CalendarCheck, Globe2, Languages, Sparkles } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Card, Pill, Screen, SectionTitle } from '../components/ui';
import { homeStats, localeNames, locales, salonInfo } from '../data/salon';
import { label } from '../data/labels';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, radius, spacing } from '../theme';
import type { Locale, RootTabParamList } from '../types';

interface Props {
  navigation: { navigate: (screen: keyof RootTabParamList) => void };
}

export function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=85' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Pill tone="gold">{t('hero.badge')}</Pill>
            <Text style={styles.heroTitle}>{t('hero.heading')}</Text>
            <Text style={styles.heroText}>{t('hero.sub')}</Text>
            <View style={styles.heroActions}>
              <Pressable style={styles.primaryAction} onPress={() => navigation.navigate('Booking')}>
                <CalendarCheck size={18} color={colors.paper} />
                <Text style={styles.primaryActionText}>{label(locale, 'bookNow')}</Text>
              </Pressable>
              <Pressable style={styles.secondaryAction} onPress={() => navigation.navigate('TreatmentsTab')}>
                <Sparkles size={18} color={colors.tealDark} />
                <Text style={styles.secondaryActionText}>{label(locale, 'treatments')}</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Card>
          <View style={styles.languageHeader}>
            <Languages size={18} color={colors.tealDark} />
            <Text style={styles.cardTitle}>{localeNames[locale]}</Text>
          </View>
          <View style={styles.localeGrid}>
            {locales.map((item) => (
              <Pressable
                key={item}
                style={[styles.localeButton, locale === item && styles.localeButtonActive]}
                onPress={() => setLocale(item)}
              >
                <Text style={[styles.localeText, locale === item && styles.localeTextActive]}>{localeNames[item]}</Text>
              </Pressable>
            ))}
          </View>
        </Card>

        <View style={styles.statsGrid}>
          {homeStats.map((stat) => (
            <Card key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <SectionTitle
          eyebrow={t('about.valuesTitle')}
          title={t('about.heading')}
          subtitle={t('about.intro1')}
        />

        {[
          { icon: Award, title: t('about.value1Title'), desc: t('about.value1Desc') },
          { icon: Sparkles, title: t('about.value2Title'), desc: t('about.value2Desc') },
          { icon: Globe2, title: t('about.value3Title'), desc: t('about.value3Desc') },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <View style={styles.valueRow}>
                <View style={styles.iconBox}>
                  <Icon size={18} color={colors.tealDark} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.body}>{item.desc}</Text>
                </View>
              </View>
            </Card>
          );
        })}

        <Card>
          <Text style={styles.cardTitle}>{salonInfo.name}</Text>
          <Text style={styles.body}>{salonInfo.address}</Text>
          <Text style={styles.body}>{salonInfo.phone}</Text>
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
  hero: {
    minHeight: 430,
    overflow: 'hidden',
    borderRadius: radius.sm,
    marginBottom: spacing.lg,
    backgroundColor: colors.ink,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(14, 17, 16, 0.48)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xl,
    gap: spacing.md,
  },
  heroTitle: {
    color: colors.paper,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '900',
    letterSpacing: 0,
  },
  heroText: {
    color: '#f5f0e8',
    fontSize: 16,
    lineHeight: 24,
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.teal,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
    borderRadius: radius.sm,
  },
  primaryActionText: {
    color: colors.paper,
    fontWeight: '800',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
    borderRadius: radius.sm,
  },
  secondaryActionText: {
    color: colors.tealDark,
    fontWeight: '800',
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  localeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  localeButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.ivory,
  },
  localeButtonActive: {
    borderColor: colors.teal,
    backgroundColor: colors.mist,
  },
  localeText: {
    color: colors.graphite,
    fontWeight: '700',
  },
  localeTextActive: {
    color: colors.tealDark,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    marginBottom: 0,
  },
  statValue: {
    color: colors.tealDark,
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  valueRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    backgroundColor: colors.mist,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '800',
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
});
