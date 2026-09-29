import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthFooterLink } from '../../components/AuthFooterLink';
import { AuthLayout } from '../../components/AuthLayout';
import { FormInput } from '../../components/FormInput';
import { supabase } from '../../lib/supabase';
import { RegisterSchema } from '../../schemas/forms';
import { colors, radius, spacing } from '../../theme';

export const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ name, email, password }) => {
    setLoading(true);

    // The profile row is created by the on_auth_user_created database trigger,
    // which reads the display name from the user metadata.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre_usuario: name } },
    });
    setLoading(false);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not create your account', text2: error.message });
      return;
    }

    reset();

    // With email confirmation disabled Supabase signs the user in right away
    // and the root navigator takes over.
    if (data.session) {
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Account created',
      text2: 'Check your inbox to confirm your email address.',
    });
    navigation.navigate('SignIn');
  };

  return (
    <AuthLayout
      navigation={navigation}
      title="Create account"
      subtitle="Join CompraYa in less than a minute."
      footer={
        <AuthFooterLink
          question="Already have an account?"
          action="Sign in"
          onPress={() => navigation.navigate('SignIn')}
        />
      }
    >
      <FormInput
        name="name"
        control={control}
        label="Full name"
        placeholder="Jane Doe"
        icon="account-outline"
        autoComplete="name"
        error={errors.name}
      />
      <FormInput
        name="email"
        control={control}
        label="Email"
        placeholder="you@example.com"
        type="email"
        icon="email-outline"
        autoComplete="email"
        error={errors.email}
      />
      <FormInput
        name="password"
        control={control}
        label="Password"
        placeholder="At least 6 characters"
        icon="lock-outline"
        secureTextEntry
        autoComplete="new-password"
        error={errors.password}
      />
      <FormInput
        name="confirmPassword"
        control={control}
        label="Confirm password"
        placeholder="Repeat your password"
        icon="lock-check-outline"
        secureTextEntry
        autoComplete="new-password"
        error={errors.confirmPassword}
      />

      <Text variant="bodySmall" style={styles.terms}>
        By creating an account you agree to our demo terms. No real purchases are made.
      </Text>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Create account
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  terms: {
    color: colors.textSubtle,
    marginBottom: spacing.lg,
  },
  button: {
    borderRadius: radius.pill,
  },
  buttonContent: {
    height: 50,
  },
});
