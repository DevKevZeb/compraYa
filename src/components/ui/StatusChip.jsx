import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, spacing } from '../../theme';

const TONES = {
  neutral: { background: colors.surfaceMuted, color: colors.textMuted },
  primary: { background: colors.primarySoft, color: colors.primary },
  success: { background: colors.successSoft, color: colors.success },
  warning: { background: colors.warningSoft, color: colors.warning },
  error: { background: colors.errorSoft, color: colors.error },
};

export const StatusChip = ({ label, tone = 'neutral', style }) => {
  const palette = TONES[tone] ?? TONES.neutral;
  return (
    <View style={[styles.chip, { backgroundColor: palette.background }, style]}>
      <Text variant="labelMedium" style={{ color: palette.color }}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radius.pill,
  },
});
