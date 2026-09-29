import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { colors, radius, spacing } from '../../theme';

// "-  2  +" control. Decrementing below `min` calls onChange(min - 1) only when
// allowZero is set (the cart uses it to remove a line).
export const QuantityStepper = ({
  value,
  onChange,
  min = 1,
  max = Infinity,
  allowZero = false,
  size = 'medium',
}) => {
  const lowest = allowZero ? min - 1 : min;
  const iconSize = size === 'small' ? 16 : 20;

  return (
    <View style={[styles.container, size === 'small' && styles.small]}>
      <IconButton
        icon={allowZero && value <= min ? 'trash-can-outline' : 'minus'}
        size={iconSize}
        disabled={value <= lowest}
        onPress={() => onChange(value - 1)}
        accessibilityLabel="Decrease quantity"
        style={styles.button}
      />
      <Text variant="titleSmall" style={styles.value} accessibilityLabel={`Quantity ${value}`}>
        {value}
      </Text>
      <IconButton
        icon="plus"
        size={iconSize}
        disabled={value >= max}
        onPress={() => onChange(value + 1)}
        accessibilityLabel="Increase quantity"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xxs,
  },
  small: {
    transform: [{ scale: 0.9 }],
  },
  button: {
    margin: 0,
  },
  value: {
    minWidth: 24,
    textAlign: 'center',
    color: colors.text,
  },
});
