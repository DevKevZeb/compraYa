import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthLayout } from '../../components/AuthLayout';
import { FormInput } from '../../components/FormInput';
import { supabase } from '../../lib/supabase';
import { RecoverySchema } from '../../schemas/forms';
import { useUserStore } from '../../stores/user.store';
import { radius, spacing } from '../../theme';

// Shown after the user opens the password reset link, with a recovery session active.
export const ResetPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: '', confirmPassword: '' },
    resolver: zodResolver(RecoverySchema),
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);
  const setPasswordRecovery = useUserStore((state) => state.setPasswordRecovery);

  const onSubmit = async ({ password }) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not update your password', text2: error.message });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Password updated',
      text2: 'You can now use your new password.',
    });
    setPasswordRecovery(false);
  };

  const onCancel = async () => {
    setPasswordRecovery(false);
    await supabase.auth.signOut();
  };

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Make it at least 6 characters long."
      showBack={false}
    >
      <FormInput
        name="password"
        control={control}
        label="New password"
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
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Update password
      </Button>
      <Button onPress={onCancel} disabled={loading} style={styles.cancel}>
        Cancel
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.pill,
    marginTop: spacing.sm,
  },
  buttonContent: {
    height: 50,
  },
  cancel: {
    marginTop: spacing.md,
  },
});
