import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Badge, Text } from 'react-native-paper';
import { colors, radius, spacing } from '../theme';

// Settings-style row with an icon, label, optional badge and chevron.
export const MenuItem = ({ icon, label, description, badge, onPress, danger, last }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.row, !last && styles.divider, pressed && styles.pressed]}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <View style={[styles.icon, danger && styles.iconDanger]}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={danger ? colors.error : colors.primary}
      />
    </View>
    <View style={styles.text}>
      <Text variant="titleSmall" style={{ color: danger ? colors.error : colors.text }}>
        {label}
      </Text>
      {description ? (
        <Text variant="bodySmall" style={styles.description}>
          {description}
        </Text>
      ) : null}
    </View>
    {badge ? (
      <Badge size={22} style={styles.badge}>
        {badge}
      </Badge>
    ) : null}
    {!danger ? (
      <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSubtle} />
    ) : null}
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.background,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDanger: {
    backgroundColor: colors.errorSoft,
  },
  text: {
    flex: 1,
  },
  description: {
    color: colors.textMuted,
  },
  badge: {
    backgroundColor: colors.primary,
  },
});
