import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthFooterLink } from '../../components/AuthFooterLink';
import { AuthLayout } from '../../components/AuthLayout';
import { FormInput } from '../../components/FormInput';
import { supabase } from '../../lib/supabase';
import { SigInSchema } from '../../schemas/forms';
import { DEMO_ACCOUNT, signInAsGuest } from '../../services/auth';
import { colors, radius, spacing } from '../../theme';

export const SignInScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(SigInSchema),
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Could not sign in',
        text2: 'Check your email and password and try again.',
      });
      return;
    }

    // The root navigator switches to the main app once the session is set.
    reset();
  };

  const onGuest = async () => {
    setLoading(true);
    const { error } = await signInAsGuest();
    setLoading(false);
    if (error) {
      Toast.show({ type: 'error', text1: 'Could not sign in as guest', text2: error.message });
    }
  };

  return (
    <AuthLayout
      navigation={navigation}
      title="Welcome back"
      subtitle="Sign in to continue shopping."
      footer={
        <AuthFooterLink
          question="Don't have an account?"
          action="Create one"
          onPress={() => navigation.navigate('Register')}
        />
      }
    >
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
        placeholder="Your password"
        icon="lock-outline"
        secureTextEntry
        autoComplete="password"
        error={errors.password}
      />
      <Button compact style={styles.forgot} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot password?
      </Button>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Sign in
      </Button>

      {DEMO_ACCOUNT && (
        <>
          <View style={styles.dividerRow}>
            <Divider style={styles.divider} />
            <Text variant="labelMedium" style={styles.dividerText}>
              or
            </Text>
            <Divider style={styles.divider} />
          </View>
          <Button
            mode="outlined"
            icon="account-arrow-right-outline"
            onPress={onGuest}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Continue as guest
          </Button>
        </>
      )}
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  forgot: {
    alignSelf: 'flex-end',
    marginTop: -spacing.xs,
    marginBottom: spacing.lg,
  },
  button: {
    borderRadius: radius.pill,
  },
  buttonContent: {
    height: 50,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
    gap: spacing.md,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    color: colors.textSubtle,
  },
});
