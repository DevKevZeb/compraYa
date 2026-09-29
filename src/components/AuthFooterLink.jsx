import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { colors } from '../theme';

// "Don't have an account? Create one" style footer used by the auth screens.
export const AuthFooterLink = ({ question, action, onPress }) => (
  <View style={styles.row}>
    <Text variant="bodyMedium" style={styles.question}>
      {question}
    </Text>
    <Button compact onPress={onPress}>
      {action}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    color: colors.textMuted,
  },
});
