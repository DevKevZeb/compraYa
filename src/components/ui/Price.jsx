import React from 'react';
import { Text } from 'react-native-paper';
import { colors } from '../../theme';
import { formatCurrency } from '../../utils/order';

export const Price = ({ value, variant = 'titleMedium', color = colors.text, style }) => (
  <Text variant={variant} style={[{ color }, style]}>
    {formatCurrency(value)}
  </Text>
);
