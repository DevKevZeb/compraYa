import { StyleSheet, View } from 'react-native';
import { colors, radius, shadows, spacing } from '../theme';
import { Skeleton } from './ui';

export const ProductCardSkeleton = () => (
  <View style={styles.card}>
    <Skeleton height={130} radius={radius.md} />
    <Skeleton height={14} width="90%" style={styles.gap} />
    <Skeleton height={14} width="60%" style={styles.gapSmall} />
    <View style={styles.footer}>
      <Skeleton height={18} width={70} />
      <Skeleton height={34} width={34} radius={radius.pill} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.sm,
    ...shadows.card,
  },
  gap: {
    marginTop: spacing.md,
  },
  gapSmall: {
    marginTop: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});
