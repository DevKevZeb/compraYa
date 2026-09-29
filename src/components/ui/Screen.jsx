import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

// Base container for every screen: brand background and consistent padding.
export const Screen = ({ children, scroll = false, padded = true, style, contentStyle }) => {
  if (scroll) {
    return (
      <ScrollView
        style={[styles.base, style]}
        contentContainerStyle={[padded && styles.padded, contentStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.base, padded && styles.padded, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    padding: spacing.lg,
  },
});
