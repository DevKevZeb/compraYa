import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, spacing } from '../theme';

// Progress indicator: completed steps show a check, the current one is highlighted.
export const CheckoutSteps = ({ steps, current }) => (
  <View style={styles.row} accessibilityLabel={`Step ${current + 1} of ${steps.length}`}>
    {steps.map((label, index) => {
      const done = index < current;
      const active = index === current;
      return (
        <Fragment key={label}>
          {index > 0 ? <View style={[styles.line, index <= current && styles.lineDone]} /> : null}
          <View style={styles.step}>
            <View style={[styles.circle, (done || active) && styles.circleActive]}>
              {done ? (
                <MaterialCommunityIcons name="check" size={16} color={colors.onPrimary} />
              ) : (
                <Text variant="labelMedium" style={[styles.number, active && styles.numberActive]}>
                  {index + 1}
                </Text>
              )}
            </View>
            <Text variant="labelMedium" style={[styles.label, active && styles.labelActive]}>
              {label}
            </Text>
          </View>
        </Fragment>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
  },
  step: {
    alignItems: 'center',
    gap: spacing.xs,
    width: 64,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  circleActive: {
    backgroundColor: colors.primary,
  },
  number: {
    color: colors.textMuted,
  },
  numberActive: {
    color: colors.onPrimary,
  },
  label: {
    color: colors.textSubtle,
  },
  labelActive: {
    color: colors.text,
  },
  line: {
    flex: 1,
    height: 2,
    marginTop: 14,
    backgroundColor: colors.border,
  },
  lineDone: {
    backgroundColor: colors.primary,
  },
});
