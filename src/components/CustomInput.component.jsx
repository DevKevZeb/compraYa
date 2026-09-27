import React from 'react';
import { Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

export const CustomInputComponent = ({
  name,
  control,
  label,
  type,
  error,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.input}>
          <TextInput
            mode="outlined"
            label={label}
            type={type}
            placeholder={placeholder}
            placeholderTextColor="gray"
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={type === 'email' || secureTextEntry ? 'none' : 'sentences'}
            onChangeText={onChange}
            value={value}
            error={!!error}
          />
          {error && <Text style={styles.text}>{error.message}.</Text>}
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    width: '80%',
    marginTop: 10,
  },
  text: {
    color: 'red',
  },
});
