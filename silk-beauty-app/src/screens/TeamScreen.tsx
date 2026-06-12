import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Award, Globe2 } from 'lucide-react-native';
import { Card, Pill, Screen, SectionTitle } from '../components/ui';
import { label } from '../data/labels';
import { specialists } from '../data/team';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, radius, spacing } from '../theme';

export function TeamScreen() {
  const { locale } = useLocale();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          eyebrow={label(locale, 'team')}
          title="Meet Our Specialists"
          subtitle="International experts, each certified in their field and passionate about outstanding results."
        />

        {specialists.map((specialist) => (
          <Card key={specialist.id}>
            <Image source={{ uri: specialist.photoUrl }} style={styles.photo} />
            <Text style={styles.name}>{specialist.name}</Text>
            <Text style={styles.role}>{specialist.role[locale] || specialist.role.en}</Text>
            <Text style={styles.bio}>{specialist.bio[locale] || specialist.bio.en}</Text>

            <View style={styles.metaRow}>
              <Pill tone="gold">{specialist.yearsExperience ?? 0} {label(locale, 'years')}</Pill>
              {specialist.specialties.map((specialty) => (
                <Pill key={specialty} tone="teal">{specialty}</Pill>
              ))}
            </View>

            <View style={styles.infoBlock}>
              <View style={styles.infoHeader}>
                <Award size={16} color={colors.tealDark} />
                <Text style={styles.infoTitle}>{label(locale, 'certifications')}</Text>
              </View>
              {specialist.certifications.map((cert) => (
                <Text key={`${cert.title}-${cert.year}`} style={styles.infoText}>
                  {cert.title}{cert.issuer ? `, ${cert.issuer}` : ''}{cert.year ? ` ${cert.year}` : ''}
                </Text>
              ))}
            </View>

            <View style={styles.infoBlock}>
              <View style={styles.infoHeader}>
                <Globe2 size={16} color={colors.tealDark} />
                <Text style={styles.infoTitle}>{label(locale, 'languages')}</Text>
              </View>
              <Text style={styles.infoText}>{specialist.languages.map((item) => item.toUpperCase()).join(', ')}</Text>
            </View>
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
  photo: {
    width: '100%',
    aspectRatio: 1.18,
    borderRadius: radius.sm,
    backgroundColor: colors.mist,
    marginBottom: spacing.md,
  },
  name: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
  },
  role: {
    color: colors.tealDark,
    fontSize: 15,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  bio: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  infoBlock: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  infoHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  infoTitle: {
    color: colors.ink,
    fontWeight: '900',
  },
  infoText: {
    color: colors.graphite,
    lineHeight: 20,
  },
});
