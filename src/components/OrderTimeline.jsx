import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, spacing } from '../theme';
import { formatOrderDate, getOrderTimeline } from '../utils/orderStatus';

// Vertical status timeline for an order.
export const OrderTimeline = ({ order }) => {
  const steps = getOrderTimeline(order.estado);
  const cancelled = order.estado === 'cancelado';

  return (
    <View>
      {steps.map((step, index) => {
        const done = step.state === 'done';
        const current = step.state === 'current';
        const last = index === steps.length - 1;
        return (
          <View key={step.key} style={styles.row}>
            <View style={styles.rail}>
              <View style={[styles.dot, done && styles.dotDone, current && styles.dotCurrent]}>
                <MaterialCommunityIcons
                  name={done ? 'check' : step.icon}
                  size={16}
                  color={done || current ? colors.onPrimary : colors.textSubtle}
                />
              </View>
              {!last ? <View style={[styles.line, done && styles.lineDone]} /> : null}
            </View>
            <View style={styles.text}>
              <Text
                variant="titleSmall"
                style={[styles.label, !done && !current && styles.labelUpcoming]}
              >
                {step.label}
              </Text>
              <Text variant="bodySmall" style={styles.caption}>
                {index === 0
                  ? formatOrderDate(order.fecha)
                  : current
                    ? 'In progress'
                    : done
                      ? 'Completed'
                      : cancelled
                        ? '—'
                        : 'Pending'}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  rail: {
    alignItems: 'center',
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  dotDone: {
    backgroundColor: colors.success,
  },
  dotCurrent: {
    backgroundColor: colors.primary,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 18,
    backgroundColor: colors.border,
  },
  lineDone: {
    backgroundColor: colors.success,
  },
  text: {
    flex: 1,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  label: {
    color: colors.text,
  },
  labelUpcoming: {
    color: colors.textSubtle,
  },
  caption: {
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
});
