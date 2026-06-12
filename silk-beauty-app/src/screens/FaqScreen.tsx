import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Card, Screen, SectionTitle } from '../components/ui';
import { colors, spacing } from '../theme';

const faqKeys = ['safety', 'advance', 'combine', 'language', 'payment', 'refund'];

export function FaqScreen() {
  const { t } = useTranslation();
  const [open, setOpen] = useState('safety');

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title={t('international.faq.title')} subtitle={t('international.faq.subtitle')} />
        {faqKeys.map((key) => {
          const isOpen = open === key;
          return (
            <Card key={key}>
              <Pressable style={styles.questionRow} onPress={() => setOpen(isOpen ? '' : key)}>
                <Text style={styles.question}>{t(`international.faq.${key}.question`)}</Text>
                {isOpen ? <ChevronUp size={20} color={colors.tealDark} /> : <ChevronDown size={20} color={colors.tealDark} />}
              </Pressable>
              {isOpen ? <Text style={styles.answer}>{t(`international.faq.${key}.answer`)}</Text> : null}
            </Card>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 110,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  question: {
    color: colors.ink,
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
  },
  answer: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.md,
  },
});
