import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, shadows, spacing } from '../theme';

const VARIANTS = {
  success: { icon: 'check-circle', color: colors.success, background: colors.successSoft },
  error: { icon: 'alert-circle', color: colors.error, background: colors.errorSoft },
  info: { icon: 'information', color: colors.primary, background: colors.primarySoft },
};

const AppToast = ({ type, text1, text2 }) => {
  const variant = VARIANTS[type] ?? VARIANTS.info;
  return (
    <View style={styles.toast} accessibilityRole="alert">
      <View style={[styles.icon, { backgroundColor: variant.background }]}>
        <MaterialCommunityIcons name={variant.icon} size={22} color={variant.color} />
      </View>
      <View style={styles.text}>
        {text1 ? (
          <Text variant="titleSmall" style={styles.title}>
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text variant="bodySmall" style={styles.message}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

// react-native-toast-message renderers for each toast type.
export const toastConfig = {
  success: (props) => <AppToast type="success" {...props} />,
  error: (props) => <AppToast type="error" {...props} />,
  info: (props) => <AppToast type="info" {...props} />,
};

const styles = StyleSheet.create({
  toast: {
    width: '92%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.raised,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
  },
  title: {
    color: colors.text,
  },
  message: {
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
});
