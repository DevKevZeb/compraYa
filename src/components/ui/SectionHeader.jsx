import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';

export const SectionHeader = ({ title, actionLabel, onAction, style }) => (
  <View style={[styles.row, style]}>
    <Text variant="titleMedium" style={styles.title}>
      {title}
    </Text>
    {actionLabel && onAction ? (
      <Button compact onPress={onAction} labelStyle={styles.action}>
        {actionLabel}
      </Button>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
  },
  action: {
    marginHorizontal: spacing.sm,
  },
});
