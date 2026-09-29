import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { colors, radius, spacing } from '../theme';

// Outlined text field bound to react-hook-form, with an optional leading icon,
// a show/hide toggle for passwords and an inline error message.
export const FormInput = ({
  name,
  control,
  label,
  type,
  error,
  placeholder,
  icon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoComplete,
  disabled = false,
}) => {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.field}>
          <TextInput
            mode="outlined"
            label={label}
            placeholder={placeholder}
            placeholderTextColor={colors.textSubtle}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={hidden}
            keyboardType={type === 'email' ? 'email-address' : keyboardType}
            autoCapitalize={type === 'email' || secureTextEntry ? 'none' : 'sentences'}
            autoComplete={autoComplete}
            disabled={disabled}
            error={!!error}
            outlineStyle={styles.outline}
            style={styles.input}
            left={icon ? <TextInput.Icon icon={icon} color={colors.textSubtle} /> : undefined}
            right={
              secureTextEntry ? (
                <TextInput.Icon
                  icon={hidden ? 'eye-outline' : 'eye-off-outline'}
                  onPress={() => setHidden((current) => !current)}
                  accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
                />
              ) : undefined
            }
          />
          {error ? (
            <View style={styles.errorRow}>
              <MaterialCommunityIcons name="alert-circle-outline" size={14} color={colors.error} />
              <Text variant="bodySmall" style={styles.errorText}>
                {error.message}
              </Text>
            </View>
          ) : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  field: {
    width: '100%',
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
  },
  outline: {
    borderRadius: radius.md,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  errorText: {
    color: colors.error,
  },
});
