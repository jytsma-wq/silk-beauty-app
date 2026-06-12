import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Clock, Mail, MapPin, Phone } from 'lucide-react-native';
import { Card, Screen, SectionTitle } from '../components/ui';
import { label } from '../data/labels';
import { salonInfo } from '../data/salon';
import { useLocale } from '../i18n/LocaleProvider';
import { colors, spacing } from '../theme';

export function ContactScreen() {
  const { locale } = useLocale();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title={label(locale, 'contact')} subtitle={salonInfo.description} />

        {[
          { icon: MapPin, title: label(locale, 'address'), value: salonInfo.address, action: undefined },
          { icon: Phone, title: label(locale, 'phone'), value: salonInfo.phone, action: `tel:${salonInfo.phone}` },
          { icon: Mail, title: label(locale, 'email'), value: salonInfo.email, action: `mailto:${salonInfo.email}` },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.value}>
              <View style={styles.row}>
                <View style={styles.iconBox}>
                  <Icon size={18} color={colors.tealDark} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  {item.action ? (
                    <Pressable onPress={() => Linking.openURL(item.action)}>
                      <Text style={styles.link}>{item.value}</Text>
                    </Pressable>
                  ) : (
                    <Text style={styles.body}>{item.value}</Text>
                  )}
                </View>
              </View>
            </Card>
          );
        })}

        <Card>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Clock size={18} color={colors.tealDark} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{label(locale, 'hours')}</Text>
              {salonInfo.hours.map((item) => (
                <View key={item.day} style={styles.hoursRow}>
                  <Text style={styles.body}>{item.day}</Text>
                  <Text style={styles.strong}>{item.hours}</Text>
                </View>
              ))}
            </View>
          </View>
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
  row: {
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
  cardTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  link: {
    color: colors.tealDark,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
    fontWeight: '800',
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  strong: {
    color: colors.ink,
    fontWeight: '800',
  },
});
