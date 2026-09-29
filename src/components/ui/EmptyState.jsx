import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { colors, radius, spacing } from '../../theme';

export const EmptyState = ({ icon, title, description, actionLabel, onAction, style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.iconWrap}>
      <MaterialCommunityIcons name={icon} size={40} color={colors.primary} />
    </View>
    <Text variant="titleMedium" style={styles.title}>
      {title}
    </Text>
    {description ? (
      <Text variant="bodyMedium" style={styles.description}>
        {description}
      </Text>
    ) : null}
    {actionLabel && onAction ? (
      <Button mode="contained" onPress={onAction} style={styles.action}>
        {actionLabel}
      </Button>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xxl,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text,
    textAlign: 'center',
  },
  description: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  action: {
    marginTop: spacing.xl,
    borderRadius: radius.pill,
  },
});
