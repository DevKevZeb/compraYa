import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';
import { BrandMark } from './ui/BrandMark';

// Shared frame for the auth screens: back button, logo, title, form and footer.
export const AuthLayout = ({ navigation, title, subtitle, children, footer, showBack = true }) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.sm, paddingBottom: insets.bottom + spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.top}>
          {showBack && navigation?.canGoBack() ? (
            <IconButton
              icon="chevron-left"
              size={26}
              onPress={navigation.goBack}
              accessibilityLabel="Go back"
              style={styles.back}
            />
          ) : (
            <View />
          )}
        </View>

        <BrandMark size={40} style={styles.brand} />
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="bodyLarge" style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}

        <View style={styles.form}>{children}</View>

        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xxl,
  },
  top: {
    height: 48,
    marginLeft: -spacing.md,
    justifyContent: 'center',
  },
  back: {
    margin: 0,
  },
  brand: {
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  title: {
    color: colors.text,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  form: {
    marginTop: spacing.xxl,
  },
  footer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
});
