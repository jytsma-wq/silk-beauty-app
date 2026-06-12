import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View, type PressableProps, type ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../theme';

export function Screen({ children }: PropsWithChildren) {
  return <View style={styles.screen}>{children}</View>;
}

export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <View style={styles.sectionTitle}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function Pill({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: 'neutral' | 'teal' | 'gold' | 'rose' }>) {
  return (
    <View style={[styles.pill, tone === 'teal' && styles.tealPill, tone === 'gold' && styles.goldPill, tone === 'rose' && styles.rosePill]}>
      <Text style={[styles.pillText, tone === 'teal' && styles.tealPillText, tone === 'gold' && styles.goldPillText]}>{children}</Text>
    </View>
  );
}

export function ActionButton({ children, style, ...props }: PropsWithChildren<PressableProps & { style?: ViewStyle }>) {
  return (
    <Pressable {...props} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  sectionTitle: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    letterSpacing: 0,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.paper,
    borderColor: colors.line,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.sm,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#f0ece6',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  pillText: {
    color: colors.graphite,
    fontSize: 12,
    fontWeight: '700',
  },
  tealPill: {
    backgroundColor: colors.mist,
  },
  tealPillText: {
    color: colors.tealDark,
  },
  goldPill: {
    backgroundColor: '#f8edd4',
  },
  goldPillText: {
    color: '#8a6117',
  },
  rosePill: {
    backgroundColor: colors.rose,
  },
  button: {
    minHeight: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  buttonText: {
    color: colors.paper,
    fontWeight: '800',
    fontSize: 15,
  },
});
